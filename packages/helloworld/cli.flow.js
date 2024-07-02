/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @oncall react_native
 */

import type {Task} from '@react-native/core-cli-utils';
import type {ExecaPromise, Result} from 'execa';
import type {TaskSpec} from 'listr';

import {apple} from '@react-native/core-cli-utils';
import {program} from 'commander';
import execa from 'execa';
import Listr from 'listr';
import path from 'path';
import {Observable} from 'rxjs';

const bootstrap = program.command('bootstrap');

const cwd = {
  ios: path.join(__dirname, 'ios'),
  android: path.join(__dirname, 'android'),
};

type IOSDevice = {
  lastBootedAt: Date,
  dataPath: string,
  dataPathSize: number,
  logPath: string,
  udid: string,
  isAvailable: boolean,
  availabilityError: string,
  logPathSize: number,
  deviceTypeIdentifier: string,
  state: 'Shutdown' | 'Booted' | 'Creating',
  name: string,
};

type ExecaPromiseMetaized = Promise<Result> & child_process$ChildProcess;

function observe(result: ExecaPromiseMetaized): Observable<string> {
  return new Observable(observer => {
    result.stderr.on('data', data =>
      data
        .toString('utf8')
        .split('\n')
        .filter(line => line.length > 0)
        .forEach(line => observer.next('🟢 ' + line.trim())),
    );
    result.stdout.on('data', data =>
      data
        .toString('utf8')
        .split('\n')
        .filter(line => line.length > 0)
        .forEach(line => observer.next('🟠 ' + line.trim())),
    );
    for (const event of ['close', 'end']) {
      result.stdout.on(event, () => observer.complete());
    }
    result.stdout.on('error', error => observer.error(error));
    return () => {
      for (const out of [result.stderr, result.stdout]) {
        out.destroy();
        out.removeAllListeners();
      }
    };
  });
}

function getXcodeBuildSettings(iosProjectFolder: string) {
  const {stdout} = execa.sync(
    'xcodebuild',
    [
      '-workspace',
      'HelloWorld.xcworkspace',
      '-scheme',
      'HelloWorld',
      '-configuration',
      'Debug',
      '-sdk',
      'iphonesimulator',
      '-showBuildSettings',
      '-json',
    ],
    {cwd: iosProjectFolder},
  );
  return JSON.parse(stdout);
}

async function getSimulatorDetails(nameOrUDID: string): Promise<IOSDevice> {
  const {stdout} = execa.sync('xcrun', [
    'simctl',
    'list',
    'devices',
    'iPhone',
    'available',
    '--json',
  ]);
  const json = JSON.parse(stdout);

  const allAvailableDevices: IOSDevice[] = Object.values(json.devices)
    .flatMap(devices => devices)
    .filter(device => device.isAvailable)
    .map(device => ({
      ...device,
      lastBootedAt: new Date(device.lastBootedAt),
    }));

  if (nameOrUDID.length > 0 && nameOrUDID.toLowerCase() !== 'simulator') {
    const namedDevice = allAvailableDevices.find(
      device => device.udid === nameOrUDID || device.name === nameOrUDID,
    );
    if (namedDevice == null) {
      const devices = allAvailableDevices
        .map(device => `- ${device.name}: ${device.udid}`)
        .join('\n - ');
      throw new Error(
        `Unable to find device with name or UDID: '${nameOrUDID}', found:\n\n${devices}`,
      );
    }
    return namedDevice;
  }

  const allSimIPhones: IOSDevice[] = allAvailableDevices.filter(device =>
    /SimDeviceType\.iPhone/.test(device.deviceTypeIdentifier),
  );

  // Pick anything that is booted, otherwise get your user to help out
  const available = allSimIPhones.sort(
    (a, b) => a.lastBootedAt.getTime() - b.lastBootedAt.getTime(),
  );

  if (available.length === 0) {
    throw new Error(
      'No simulator is available, please create on using the Simulator',
    );
  }

  const booted = allSimIPhones
    .filter(device => device.state === 'Booted')
    .pop();

  if (booted != null) {
    return booted;
  }

  return allSimIPhones[0];
}

async function launchSimulator(udid: string): Promise<Result> {
  // Boot something that's new
  return execa('open', [
    '-a',
    'Simulator',
    '--args',
    '-CurrentDeviceUDID',
    udid,
  ]);
}

type MixedTasks = Task<ExecaPromise> | Task<void>;
type Tasks = {
  +[label: string]: MixedTasks,
};

function run(
  tasks: Tasks,
  exclude: {[label: string]: boolean} = {},
): Promise<void> {
  let ordered: MixedTasks[] = [];
  for (const [label, task] of Object.entries(tasks)) {
    if (label in exclude) {
      continue;
    }
    ordered.push(task);
  }
  ordered = ordered.sort((a, b) => a.order - b.order);

  const spec: TaskSpec<void, Observable<string> | Promise<void> | void>[] =
    ordered.map(task => ({
      title: task.label,
      task: () => {
        const action = task.action();
        if (action != null) {
          return observe(action);
        }
      },
    }));
  return new Listr(spec).run();
}

bootstrap
  .command('ios')
  .description('Bootstrap iOS')
  .option('--hermes', 'Enable Hermes', true)
  .option('--new-architecture', 'Enable new architecture', true)
  .action(async (_, options: {newArchitecture: boolean, hermes: boolean}) => {
    await run(
      apple.bootstrap({
        cwd: cwd.ios,
        hermes: options.hermes,
        newArchitecture: options.newArchitecture,
      }),
    );
  });

const build = program.command('build');

build
  .command('ios')
  .description('Builds & run your app for iOS')
  .option('--new-architecture', 'Enable new architecture')
  .option('--only-build', 'Build but do not run', false)
  .option('--device', 'Any simulator or a specific device', 'simulator')
  .action(async options => {
    const device = await getSimulatorDetails(options.device);

    if (!options.onlyBuild) {
      await launchSimulator(device.udid);
    }

    await run(
      apple.build({
        isWorkspace: true,
        name: 'HelloWorld.xcworkspace',
        mode: 'Debug',
        scheme: 'HelloWorld',
        cwd: cwd.ios,
        destination: `id=${device.udid}`,
      }),
    );

    const settings = {
      appPath: '',
      bundleId: '',
    };

    await run({
      buildSettings: {
        order: 1,
        label: 'Getting your build settings',
        action: (): void => {
          const xcode = getXcodeBuildSettings(cwd.ios)[0].buildSettings;
          settings.appPath = path.join(
            xcode.TARGET_BUILD_DIR,
            xcode.EXECUTABLE_FOLDER_PATH,
          );
          settings.bundleId = xcode.PRODUCT_BUNDLE_IDENTIFIER;
        },
      },
    });

    await run(
      apple.ios.install({
        cwd: cwd.ios,
        device: device.udid,
        appPath: settings.appPath,
        bundleId: settings.bundleId,
      }),
    );
  });

if (require.main === module) {
  program.parse();
}

export default program;
