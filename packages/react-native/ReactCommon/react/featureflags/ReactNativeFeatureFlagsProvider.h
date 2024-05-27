/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<fe06fc281a85c7f2addc043cfc8ba0cc>>
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

namespace facebook::react {

class ReactNativeFeatureFlagsProvider {
 public:
  virtual ~ReactNativeFeatureFlagsProvider() = default;

  virtual bool commonTestFlag() = 0;
  virtual bool allowCollapsableChildren() = 0;
  virtual bool androidEnablePendingFabricTransactions() = 0;
  virtual bool batchRenderingUpdatesInEventLoop() = 0;
  virtual bool destroyFabricSurfacesInReactInstanceManager() = 0;
  virtual bool enableBackgroundExecutor() = 0;
  virtual bool enableCleanTextInputYogaNode() = 0;
  virtual bool enableGranularShadowTreeStateReconciliation() = 0;
  virtual bool enableMicrotasks() = 0;
  virtual bool enableSynchronousStateUpdates() = 0;
  virtual bool enableUIConsistency() = 0;
  virtual bool fixStoppedSurfaceRemoveDeleteTreeUIFrameCallbackLeak() = 0;
  virtual bool forceBatchingMountItemsOnAndroid() = 0;
  virtual bool fuseboxEnabled() = 0;
  virtual bool lazyAnimationCallbacks() = 0;
  virtual bool preventDoubleTextMeasure() = 0;
  virtual bool setAndroidLayoutDirection() = 0;
  virtual bool useModernRuntimeScheduler() = 0;
  virtual bool useNativeViewConfigsInBridgelessMode() = 0;
  virtual bool useStateAlignmentMechanism() = 0;
};

} // namespace facebook::react
