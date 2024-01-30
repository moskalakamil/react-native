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
import type {Version} from '../version-utils';
*/

module.exports = ({version} /*: {version: Version} */) /*: string */ => `/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * ${'@'}generated by scripts/releases/set-rn-version.js
 */

package com.facebook.react.modules.systeminfo;

import com.facebook.react.common.MapBuilder;

import java.util.Map;

public class ReactNativeVersion {
  public static final Map<String, Object> VERSION = MapBuilder.<String, Object>of(
      "major", ${version.major},
      "minor", ${version.minor},
      "patch", ${version.patch},
      "prerelease", ${
        version.prerelease != null ? `"${version.prerelease}"` : 'null'
      });
}
`;
