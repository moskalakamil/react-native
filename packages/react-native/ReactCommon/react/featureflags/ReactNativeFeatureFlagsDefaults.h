/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<db008ef815b13a6d72acc099dd0ff704>>
 */

/**
 * IMPORTANT: Do NOT modify this file directly.
 *
 * To change the definition of the flags, edit
 *   packages/react-native/scripts/featureflags/ReactNativeFeatureFlags.config.js.
 *
 * To regenerate this code, run the following script from the repo root:
 *   yarn featureflags-update
 */

#pragma once

#include <react/featureflags/ReactNativeFeatureFlagsProvider.h>

namespace facebook::react {

class ReactNativeFeatureFlagsDefaults : public ReactNativeFeatureFlagsProvider {
 public:
  ReactNativeFeatureFlagsDefaults() = default;

  bool commonTestFlag() override {
    return false;
  }

  bool allowCollapsableChildren() override {
    return true;
  }

  bool androidEnablePendingFabricTransactions() override {
    return false;
  }

  bool batchRenderingUpdatesInEventLoop() override {
    return false;
  }

  bool destroyFabricSurfacesInReactInstanceManager() override {
    return false;
  }

  bool enableBackgroundExecutor() override {
    return false;
  }

  bool enableCleanTextInputYogaNode() override {
    return false;
  }

  bool enableGranularShadowTreeStateReconciliation() override {
    return false;
  }

  bool enableMicrotasks() override {
    return false;
  }

  bool enableSynchronousStateUpdates() override {
    return false;
  }

  bool enableUIConsistency() override {
    return false;
  }

  bool forceBatchingMountItemsOnAndroid() override {
    return false;
  }

  bool inspectorEnableCxxInspectorPackagerConnection() override {
    return false;
  }

  bool inspectorEnableModernCDPRegistry() override {
    return false;
  }

  bool lazyAnimationCallbacks() override {
    return false;
  }

  bool preventDoubleTextMeasure() override {
    return false;
  }

  bool useModernRuntimeScheduler() override {
    return false;
  }

  bool useNativeViewConfigsInBridgelessMode() override {
    return false;
  }

  bool useStateAlignmentMechanism() override {
    return false;
  }
};

} // namespace facebook::react
