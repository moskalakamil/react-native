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

/*::
import type {BuildType, Version} from './version-utils';
*/

const {getNpmInfo} = require('../npm-utils');
const updateTemplatePackage = require('./update-template-package');
const {parseVersion, validateBuildType} = require('./version-utils');
const {parseArgs} = require('@pkgjs/parseargs');
const {promises: fs} = require('fs');

const GRADLE_FILE_PATH = 'packages/react-native/ReactAndroid/gradle.properties';

const config = {
  options: {
    'build-type': {
      type: 'string',
      short: 'b',
    },
    'to-version': {
      type: 'string',
      short: 'v',
    },
    help: {type: 'boolean'},
  },
};

async function main() {
  const {
    values: {help, 'build-type': buildType, 'to-version': toVersion},
  } = parseArgs(config);

  if (help) {
    console.log(`
  Usage: node ./scripts/releases/set-rn-version.js [OPTIONS]

  Updates relevant files in the react-native package and template to
  materialize the given release version.

  Options:
    --build-type       One of ['dry-run', 'nightly', 'release', 'prealpha'].
    --to-version       The new version string.
    `);
    return;
  }

  if (!validateBuildType(buildType)) {
    throw new Error(`Unsupported build type: ${buildType}`);
  }

  await setReactNativeVersion(
    toVersion ?? getNpmInfo(buildType).version,
    {},
    buildType,
  );
}

async function setReactNativeVersion(
  version /*: string */,
  dependencyVersions /*: ?Record<string, string> */,
  buildType /*: BuildType */,
) {
  const versionInfo = parseVersion(version, buildType);

  updateTemplatePackage({
    ...(dependencyVersions ?? {}),
    'react-native': versionInfo.version,
  });
  await updateSourceFiles(versionInfo);
  await updateGradleFile(versionInfo.version);
}

function updateSourceFiles(versionInfo /*: Version */) {
  const templateData = {version: versionInfo};

  return Promise.all([
    fs.writeFile(
      'packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/systeminfo/ReactNativeVersion.java',
      require('./templates/ReactNativeVersion.java-template')(templateData),
    ),
    fs.writeFile(
      'packages/react-native/React/Base/RCTVersion.m',
      require('./templates/RCTVersion.m-template')(templateData),
    ),
    fs.writeFile(
      'packages/react-native/ReactCommon/cxxreact/ReactNativeVersion.h',
      require('./templates/ReactNativeVersion.h-template')(templateData),
    ),
    fs.writeFile(
      'packages/react-native/Libraries/Core/ReactNativeVersion.js',
      require('./templates/ReactNativeVersion.js-template')(templateData),
    ),
  ]);
}

async function updateGradleFile(version /*: string */) {
  const contents = await fs.readFile(GRADLE_FILE_PATH, 'utf-8');

  return fs.writeFile(
    GRADLE_FILE_PATH,
    contents.replace(/^VERSION_NAME=.*/, `VERSION_NAME=${version}`),
  );
}

module.exports = {
  setReactNativeVersion,
};

if (require.main === module) {
  // eslint-disable-next-line no-void
  void main();
}
