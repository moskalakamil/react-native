/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<f2a88e318efcf92bf7cd2b07e3ed5faf>>
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

#include "JReactNativeFeatureFlagsCxxInterop.h"
#include <react/featureflags/ReactNativeFeatureFlags.h>

namespace facebook::react {

static jni::alias_ref<jni::JClass> getReactNativeFeatureFlagsProviderJavaClass() {
  static const auto jClass = facebook::jni::findClassStatic(
      "com/facebook/react/internal/featureflags/ReactNativeFeatureFlagsProvider");
  return jClass;
}

/**
 * Implementation of ReactNativeFeatureFlagsProvider that wraps a
 * ReactNativeFeatureFlagsProvider Java object.
 */
class ReactNativeFeatureFlagsProviderHolder
    : public ReactNativeFeatureFlagsProvider {
 public:
  explicit ReactNativeFeatureFlagsProviderHolder(
      jni::alias_ref<jobject> javaProvider)
      : javaProvider_(make_global(javaProvider)){};

  bool commonTestFlag() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("commonTestFlag");
    return method(javaProvider_);
  }

  bool allowCollapsableChildren() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("allowCollapsableChildren");
    return method(javaProvider_);
  }

  bool androidEnablePendingFabricTransactions() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("androidEnablePendingFabricTransactions");
    return method(javaProvider_);
  }

  bool batchRenderingUpdatesInEventLoop() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("batchRenderingUpdatesInEventLoop");
    return method(javaProvider_);
  }

  bool destroyFabricSurfacesInReactInstanceManager() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("destroyFabricSurfacesInReactInstanceManager");
    return method(javaProvider_);
  }

  bool enableBackgroundExecutor() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("enableBackgroundExecutor");
    return method(javaProvider_);
  }

  bool enableCleanTextInputYogaNode() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("enableCleanTextInputYogaNode");
    return method(javaProvider_);
  }

  bool enableGranularShadowTreeStateReconciliation() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("enableGranularShadowTreeStateReconciliation");
    return method(javaProvider_);
  }

  bool enableMicrotasks() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("enableMicrotasks");
    return method(javaProvider_);
  }

  bool enableSynchronousStateUpdates() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("enableSynchronousStateUpdates");
    return method(javaProvider_);
  }

  bool enableUIConsistency() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("enableUIConsistency");
    return method(javaProvider_);
  }

  bool fixStoppedSurfaceRemoveDeleteTreeUIFrameCallbackLeak() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("fixStoppedSurfaceRemoveDeleteTreeUIFrameCallbackLeak");
    return method(javaProvider_);
  }

  bool forceBatchingMountItemsOnAndroid() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("forceBatchingMountItemsOnAndroid");
    return method(javaProvider_);
  }

  bool inspectorEnableModernCDPRegistry() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("inspectorEnableModernCDPRegistry");
    return method(javaProvider_);
  }

  bool lazyAnimationCallbacks() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("lazyAnimationCallbacks");
    return method(javaProvider_);
  }

  bool preventDoubleTextMeasure() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("preventDoubleTextMeasure");
    return method(javaProvider_);
  }

  bool setAndroidLayoutDirection() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("setAndroidLayoutDirection");
    return method(javaProvider_);
  }

  bool useModernRuntimeScheduler() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("useModernRuntimeScheduler");
    return method(javaProvider_);
  }

  bool useNativeViewConfigsInBridgelessMode() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("useNativeViewConfigsInBridgelessMode");
    return method(javaProvider_);
  }

  bool useStateAlignmentMechanism() override {
    static const auto method =
        getReactNativeFeatureFlagsProviderJavaClass()->getMethod<jboolean()>("useStateAlignmentMechanism");
    return method(javaProvider_);
  }

 private:
  jni::global_ref<jobject> javaProvider_;
};

bool JReactNativeFeatureFlagsCxxInterop::commonTestFlag(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::commonTestFlag();
}

bool JReactNativeFeatureFlagsCxxInterop::allowCollapsableChildren(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::allowCollapsableChildren();
}

bool JReactNativeFeatureFlagsCxxInterop::androidEnablePendingFabricTransactions(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::androidEnablePendingFabricTransactions();
}

bool JReactNativeFeatureFlagsCxxInterop::batchRenderingUpdatesInEventLoop(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::batchRenderingUpdatesInEventLoop();
}

bool JReactNativeFeatureFlagsCxxInterop::destroyFabricSurfacesInReactInstanceManager(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::destroyFabricSurfacesInReactInstanceManager();
}

bool JReactNativeFeatureFlagsCxxInterop::enableBackgroundExecutor(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::enableBackgroundExecutor();
}

bool JReactNativeFeatureFlagsCxxInterop::enableCleanTextInputYogaNode(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::enableCleanTextInputYogaNode();
}

bool JReactNativeFeatureFlagsCxxInterop::enableGranularShadowTreeStateReconciliation(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::enableGranularShadowTreeStateReconciliation();
}

bool JReactNativeFeatureFlagsCxxInterop::enableMicrotasks(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::enableMicrotasks();
}

bool JReactNativeFeatureFlagsCxxInterop::enableSynchronousStateUpdates(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::enableSynchronousStateUpdates();
}

bool JReactNativeFeatureFlagsCxxInterop::enableUIConsistency(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::enableUIConsistency();
}

bool JReactNativeFeatureFlagsCxxInterop::fixStoppedSurfaceRemoveDeleteTreeUIFrameCallbackLeak(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::fixStoppedSurfaceRemoveDeleteTreeUIFrameCallbackLeak();
}

bool JReactNativeFeatureFlagsCxxInterop::forceBatchingMountItemsOnAndroid(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::forceBatchingMountItemsOnAndroid();
}

bool JReactNativeFeatureFlagsCxxInterop::inspectorEnableModernCDPRegistry(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::inspectorEnableModernCDPRegistry();
}

bool JReactNativeFeatureFlagsCxxInterop::lazyAnimationCallbacks(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::lazyAnimationCallbacks();
}

bool JReactNativeFeatureFlagsCxxInterop::preventDoubleTextMeasure(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::preventDoubleTextMeasure();
}

bool JReactNativeFeatureFlagsCxxInterop::setAndroidLayoutDirection(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::setAndroidLayoutDirection();
}

bool JReactNativeFeatureFlagsCxxInterop::useModernRuntimeScheduler(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::useModernRuntimeScheduler();
}

bool JReactNativeFeatureFlagsCxxInterop::useNativeViewConfigsInBridgelessMode(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::useNativeViewConfigsInBridgelessMode();
}

bool JReactNativeFeatureFlagsCxxInterop::useStateAlignmentMechanism(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  return ReactNativeFeatureFlags::useStateAlignmentMechanism();
}

void JReactNativeFeatureFlagsCxxInterop::override(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/,
    jni::alias_ref<jobject> provider) {
  ReactNativeFeatureFlags::override(
      std::make_unique<ReactNativeFeatureFlagsProviderHolder>(provider));
}

void JReactNativeFeatureFlagsCxxInterop::dangerouslyReset(
    facebook::jni::alias_ref<JReactNativeFeatureFlagsCxxInterop> /*unused*/) {
  ReactNativeFeatureFlags::dangerouslyReset();
}

void JReactNativeFeatureFlagsCxxInterop::registerNatives() {
  javaClassLocal()->registerNatives({
      makeNativeMethod(
          "override", JReactNativeFeatureFlagsCxxInterop::override),
      makeNativeMethod("dangerouslyReset", JReactNativeFeatureFlagsCxxInterop::dangerouslyReset),
      makeNativeMethod(
        "commonTestFlag",
        JReactNativeFeatureFlagsCxxInterop::commonTestFlag),
      makeNativeMethod(
        "allowCollapsableChildren",
        JReactNativeFeatureFlagsCxxInterop::allowCollapsableChildren),
      makeNativeMethod(
        "androidEnablePendingFabricTransactions",
        JReactNativeFeatureFlagsCxxInterop::androidEnablePendingFabricTransactions),
      makeNativeMethod(
        "batchRenderingUpdatesInEventLoop",
        JReactNativeFeatureFlagsCxxInterop::batchRenderingUpdatesInEventLoop),
      makeNativeMethod(
        "destroyFabricSurfacesInReactInstanceManager",
        JReactNativeFeatureFlagsCxxInterop::destroyFabricSurfacesInReactInstanceManager),
      makeNativeMethod(
        "enableBackgroundExecutor",
        JReactNativeFeatureFlagsCxxInterop::enableBackgroundExecutor),
      makeNativeMethod(
        "enableCleanTextInputYogaNode",
        JReactNativeFeatureFlagsCxxInterop::enableCleanTextInputYogaNode),
      makeNativeMethod(
        "enableGranularShadowTreeStateReconciliation",
        JReactNativeFeatureFlagsCxxInterop::enableGranularShadowTreeStateReconciliation),
      makeNativeMethod(
        "enableMicrotasks",
        JReactNativeFeatureFlagsCxxInterop::enableMicrotasks),
      makeNativeMethod(
        "enableSynchronousStateUpdates",
        JReactNativeFeatureFlagsCxxInterop::enableSynchronousStateUpdates),
      makeNativeMethod(
        "enableUIConsistency",
        JReactNativeFeatureFlagsCxxInterop::enableUIConsistency),
      makeNativeMethod(
        "fixStoppedSurfaceRemoveDeleteTreeUIFrameCallbackLeak",
        JReactNativeFeatureFlagsCxxInterop::fixStoppedSurfaceRemoveDeleteTreeUIFrameCallbackLeak),
      makeNativeMethod(
        "forceBatchingMountItemsOnAndroid",
        JReactNativeFeatureFlagsCxxInterop::forceBatchingMountItemsOnAndroid),
      makeNativeMethod(
        "inspectorEnableModernCDPRegistry",
        JReactNativeFeatureFlagsCxxInterop::inspectorEnableModernCDPRegistry),
      makeNativeMethod(
        "lazyAnimationCallbacks",
        JReactNativeFeatureFlagsCxxInterop::lazyAnimationCallbacks),
      makeNativeMethod(
        "preventDoubleTextMeasure",
        JReactNativeFeatureFlagsCxxInterop::preventDoubleTextMeasure),
      makeNativeMethod(
        "setAndroidLayoutDirection",
        JReactNativeFeatureFlagsCxxInterop::setAndroidLayoutDirection),
      makeNativeMethod(
        "useModernRuntimeScheduler",
        JReactNativeFeatureFlagsCxxInterop::useModernRuntimeScheduler),
      makeNativeMethod(
        "useNativeViewConfigsInBridgelessMode",
        JReactNativeFeatureFlagsCxxInterop::useNativeViewConfigsInBridgelessMode),
      makeNativeMethod(
        "useStateAlignmentMechanism",
        JReactNativeFeatureFlagsCxxInterop::useStateAlignmentMechanism),
  });
}

} // namespace facebook::react
