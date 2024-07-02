/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 * @oncall react_native
 */

'use strict';

/*::
import type {BuildType} from '../releases/utils/version-utils';
*/

const {getNpmInfo, publishPackage} = require('../npm-utils');
const {removeNewArchFlags} = require('../releases/remove-new-arch-flags');
const {setReactNativeVersion} = require('../releases/set-rn-version');
const setVersion = require('../releases/set-version');
const {
  generateAndroidArtifacts,
  publishAndroidArtifactsToMaven,
} = require('../releases/utils/release-utils');
const path = require('path');
const {echo, exit} = require('shelljs');
const yargs = require('yargs');

const REPO_ROOT = path.resolve(__dirname, '../..');

/**
 * This script prepares a release version of react-native and may publish to NPM.
 * It is supposed to run in CI environment, not on a developer's machine.
 *
 * For a dry run (commitly), this script will:
 *  * Version the commitly of the form `1000.0.0-<commitSha>`
 *  * Create Android artifacts
 *  * It will not publish to npm
 *
 * For a nightly run, this script will:
 *  * Version the nightly release of the form `0.0.0-<dateIdentifier>-<commitSha>`
 *  * Create Android artifacts
 *  * Publish to npm using `nightly` tag
 *
 * For a release run, this script will:
 *  * Version the release by the tag version that triggered CI
 *  * Create Android artifacts
 *  * Publish to npm
 *     * using `latest` tag if commit is currently tagged `latest`
 *     * or otherwise `{major}.{minor}-stable`
 */

async function main() {
  const argv = yargs
    .option('t', {
      alias: 'builtType',
      describe: 'The type of build you want to perform.',
      choices: ['dry-run', 'nightly', 'release', 'prealpha'],
      default: 'dry-run',
    })
    .strict().argv;

  // $FlowFixMe[prop-missing]
  const buildType = argv.builtType;

  await publishNpm(buildType);
}

async function publishNpm(buildType /*: BuildType */) /*: Promise<void> */ {
  const {version, tag} = getNpmInfo(buildType);

  if (buildType === 'prealpha') {
    removeNewArchFlags();
  }

  // For stable releases, CircleCI job `prepare_package_for_release` handles this
  if (['dry-run', 'nightly', 'prealpha'].includes(buildType)) {
    try {
      if (buildType === 'nightly') {
        // Set same version for all monorepo packages
        await setVersion(version);
      } else {
        await setReactNativeVersion(version, null, buildType);
      }
    } catch (e) {
      console.error(`Failed to set version number to ${version}`);
      console.error(e);
      return exit(1);
    }
  }

  generateAndroidArtifacts(version);

  if (buildType === 'dry-run') {
    echo('Skipping `npm publish` because --dry-run is set.');
    return exit(0);
  }

  // We first publish on Maven Central all the necessary artifacts.
  // NPM publishing is done just after.
  publishAndroidArtifactsToMaven(version, buildType);

  const packagePath = path.join(REPO_ROOT, 'packages', 'react-native');
  const result = publishPackage(packagePath, {
    // $FlowFixMe[incompatible-call]
    tags: [tag],
    otp: process.env.NPM_CONFIG_OTP,
  });

  if (result.code) {
    echo('Failed to publish package to npm');
    return exit(1);
  } else {
    echo(`Published to npm ${version}`);
    return exit(0);
  }
}

module.exports = {
  publishNpm,
};

if (require.main === module) {
  // eslint-disable-next-line no-void
  void main();
}
