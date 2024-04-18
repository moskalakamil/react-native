/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include "JsiIntegrationTest.h"

#include "engines/JsiIntegrationTestHermesEngineAdapter.h"
#include "prelude.js.h"

#include <utility>

using namespace ::testing;

namespace facebook::react::jsinspector_modern {

namespace {

struct Params {
  /**
   * Whether to evaluate the prelude.js script (containing RN's console
   * polyfill) after setting up the Runtime.
   */
  bool withConsolePolyfill{false};

  /**
   * Whether to install the global nativeLoggingHook function after setting up
   * the Runtime (before the prelude if any).
   */
  bool withNativeLoggingHook{false};

  /**
   * Whether to enable the Runtime domain at the start of the test (and expect
   * live consoleAPICalled notifications), or enable it at the *end* of the test
   * (and expect buffered notifications at that point).
   */
  bool runtimeEnabledAtStart{false};
};

} // namespace

/**
 * A test fixture for the Console API.
 */
class ConsoleApiTest
    : public JsiIntegrationPortableTest<JsiIntegrationTestHermesEngineAdapter>,
      public WithParamInterface<Params> {
 protected:
  void SetUp() override {
    JsiIntegrationPortableTest::SetUp();
    connect();
    if (GetParam().runtimeEnabledAtStart) {
      enableRuntimeDomain();
    }
  }

  void TearDown() override {
    if (!GetParam().runtimeEnabledAtStart) {
      enableRuntimeDomain();
    }
    JsiIntegrationPortableTest::TearDown();
  }

  void expectConsoleApiCall(Matcher<folly::dynamic> paramsMatcher) {
    if (runtimeEnabled_) {
      expectConsoleApiCallImpl(std::move(paramsMatcher));
    } else {
      expectedConsoleApiCalls_.emplace_back(paramsMatcher);
    }
  }

  bool isRuntimeDomainEnabled() const {
    return runtimeEnabled_;
  }

  void clearExpectedConsoleApiCalls() {
    expectedConsoleApiCalls_.clear();
  }

 private:
  void expectConsoleApiCallImpl(Matcher<folly::dynamic> paramsMatcher) {
    this->expectMessageFromPage(JsonParsed(AllOf(
        AtJsonPtr("/method", "Runtime.consoleAPICalled"),
        AtJsonPtr("/params", std::move(paramsMatcher)))));
  }

  void enableRuntimeDomain() {
    InSequence s;
    auto executionContextInfo = this->expectMessageFromPage(JsonParsed(
        AllOf(AtJsonPtr("/method", "Runtime.executionContextCreated"))));
    if (!runtimeEnabled_) {
      for (auto& call : expectedConsoleApiCalls_) {
        expectConsoleApiCallImpl(call);
      }
      expectedConsoleApiCalls_.clear();
    }
    this->expectMessageFromPage(JsonEq(R"({
                                            "id": 1,
                                            "result": {}
                                        })"));
    this->toPage_->sendMessage(R"({
                                    "id": 1,
                                    "method": "Runtime.enable"
                                })");

    ASSERT_TRUE(executionContextInfo->has_value());

    runtimeEnabled_ = true;
  }

  void loadMainBundle() override {
    auto params = GetParam();
    if (params.withNativeLoggingHook) {
      // The presence or absence of nativeLoggingHook affects the console
      // polyfill's behaviour.
      eval(
          R"(
            if (!globalThis.nativeLoggingHook) {
              globalThis.nativeLoggingHook = function(level, message) {
                print(level + ': ' + message);
              };
            }
          )");
    } else {
      // Ensure that we run without nativeLoggingHook even if it was installed
      // elsewhere.
      eval(R"(
        delete globalThis.nativeLoggingHook;
      )");
    }
    if (params.withConsolePolyfill) {
      eval(preludeJsCode);
    }
  }

  std::vector<Matcher<folly::dynamic>> expectedConsoleApiCalls_;
  bool runtimeEnabled_{false};
};

class ConsoleApiTestWithPreExistingConsole : public ConsoleApiTest {
  void setupRuntimeBeforeRegistration(jsi::Runtime& /*unused*/) override {
    eval(R"(
      globalThis.__console_messages__ = [];
      globalThis.console = {
        log: function(...args) {
          globalThis.__console_messages__.push({
            type: 'log',
            args,
          });
        },
        warn: function(...args) {
          globalThis.__console_messages__.push({
            type: 'warn',
            args,
          });
        },
      };
    )");
  }
};

TEST_P(ConsoleApiTest, testConsoleLog) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "log"),
      AtJsonPtr(
          "/args",
          R"([{
                   "type": "string",
                   "value": "hello"
                 }, {
                   "type": "string",
                   "value": "world"
                 }])"_json)));
  eval("console.log('hello', 'world');");
}

TEST_P(ConsoleApiTest, testConsoleDebug) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "debug"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "hello fusebox"
              }])"_json)));
  eval("console.debug('hello fusebox');");
}

TEST_P(ConsoleApiTest, testConsoleInfo) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "info"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "you should know this"
              }])"_json)));
  eval("console.info('you should know this');");
}

TEST_P(ConsoleApiTest, testConsoleError) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "error"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "uh oh"
              }])"_json)));
  eval("console.error('uh oh');");
}

TEST_P(ConsoleApiTest, testConsoleWarn) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "careful"
              }])"_json)));
  eval("console.warn('careful');");
}

TEST_P(ConsoleApiTest, testConsoleDir) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "dir"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "something"
              }])"_json)));
  eval("console.dir('something');");
}

TEST_P(ConsoleApiTest, testConsoleDirxml) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "dirxml"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "pretend this is a DOM element"
              }])"_json)));
  eval("console.dirxml('pretend this is a DOM element');");
}

TEST_P(ConsoleApiTest, testConsoleTable) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "table"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "pretend this is a complex object"
              }])"_json)));
  eval("console.table('pretend this is a complex object');");
}

TEST_P(ConsoleApiTest, testConsoleTrace) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "trace"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "trace trace"
              }])"_json)));
  eval("console.trace('trace trace');");
}

TEST_P(ConsoleApiTest, testConsoleClear) {
  InSequence s;
  expectConsoleApiCall(
      AllOf(AtJsonPtr("/type", "clear"), AtJsonPtr("/args", "[]"_json)));
  eval("console.clear();");
}

TEST_P(ConsoleApiTest, testConsoleClearAfterOtherCall) {
  InSequence s;
  if (isRuntimeDomainEnabled()) {
    // This should only be delivered if console notifications are enabled, not
    // when they're being cached for later.
    expectConsoleApiCall(AllOf(
        AtJsonPtr("/type", "log"),
        AtJsonPtr(
            "/args",
            R"([{
                  "type": "string",
                  "value": "hello"
                }])"_json)));
  }
  expectConsoleApiCall(
      AllOf(AtJsonPtr("/type", "clear"), AtJsonPtr("/args", "[]"_json)));
  eval("console.log('hello');");
  eval("console.clear();");
}

TEST_P(ConsoleApiTest, testConsoleGroup) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "startGroup"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "group title"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "log"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "in group"
              }])"_json)));
  expectConsoleApiCall(
      AllOf(AtJsonPtr("/type", "endGroup"), AtJsonPtr("/args", "[]"_json)));
  eval("console.group('group title');");
  eval("console.log('in group');");
  eval("console.groupEnd();");
}

TEST_P(ConsoleApiTest, testConsoleGroupCollapsed) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "startGroupCollapsed"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "group collapsed title"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "log"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "in group collapsed"
              }])"_json)));
  expectConsoleApiCall(
      AllOf(AtJsonPtr("/type", "endGroup"), AtJsonPtr("/args", "[]"_json)));
  eval("console.groupCollapsed('group collapsed title');");
  eval("console.log('in group collapsed');");
  eval("console.groupEnd();");
}

TEST_P(ConsoleApiTest, testConsoleAssert) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "assert"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Assertion failed: something is bad"
              }])"_json)));
  eval("console.assert(true, 'everything is good');");
  eval("console.assert(false, 'something is bad');");

  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "assert"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Assertion failed"
              }])"_json)));
  eval("console.assert();");
}

TEST_P(ConsoleApiTest, testConsoleCount) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "default: 1"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "default: 2"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "default: 3"
              }])"_json)));
  eval("console.count();");
  eval("console.count('default');");
  eval("console.count();");
  eval("console.countReset();");

  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "default: 1"
              }])"_json)));
  eval("console.count();");
  eval("console.countReset('default');");

  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "default: 1"
              }])"_json)));
  eval("console.count();");
}

TEST_P(ConsoleApiTest, testConsoleCountLabel) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "foo: 1"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "foo: 2"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "foo: 3"
              }])"_json)));
  eval("console.count('foo');");
  eval("console.count('foo');");
  eval("console.count('foo');");
  eval("console.countReset('foo');");

  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "count"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "foo: 1"
              }])"_json)));
  eval("console.count('foo');");
}

TEST_P(ConsoleApiTest, testConsoleCountResetInvalidLabel) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Count for 'default' does not exist"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Count for 'default' does not exist"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Count for 'foo' does not exist"
              }])"_json)));
  eval("console.countReset();");
  eval("console.countReset('default');");
  eval("console.countReset('foo');");
}

// TODO(moti): Tests for console.timeEnd() and timeLog() that actually check the
// output (with mocked system clock?)

TEST_P(ConsoleApiTest, testConsoleTimeExistingLabel) {
  eval("console.time();");
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'default' already exists"
              }])"_json)));
  eval("console.time('default');");

  eval("console.time('foo');");
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'foo' already exists"
              }])"_json)));
  eval("console.time('foo');");
}

TEST_P(ConsoleApiTest, testConsoleTimeInvalidLabel) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'default' does not exist"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'default' does not exist"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'foo' does not exist"
              }])"_json)));
  eval("console.timeEnd();");
  eval("console.timeEnd('default');");
  eval("console.timeEnd('foo');");

  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'default' does not exist"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'default' does not exist"
              }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "Timer 'foo' does not exist"
              }])"_json)));
  eval("console.timeLog();");
  eval("console.timeLog('default');");
  eval("console.timeLog('foo');");
}

TEST_P(ConsoleApiTest, testConsoleSilentlyClearedOnReload) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "log"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "hello"
              }])"_json)));
  eval("console.log('hello');");

  // If there are any expectations we haven't checked yet, clear them
  clearExpectedConsoleApiCalls();
  // Reloading generates some Runtime events
  if (isRuntimeDomainEnabled()) {
    expectMessageFromPage(JsonParsed(
        AllOf(AtJsonPtr("/method", "Runtime.executionContextDestroyed"))));
    expectMessageFromPage(JsonParsed(
        AllOf(AtJsonPtr("/method", "Runtime.executionContextsCleared"))));
    expectMessageFromPage(JsonParsed(
        AllOf(AtJsonPtr("/method", "Runtime.executionContextCreated"))));
  }
  reload();

  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "log"),
      AtJsonPtr(
          "/args",
          R"([{
                "type": "string",
                "value": "world"
              }])"_json)));
  eval("console.log('world');");
}

TEST_P(ConsoleApiTestWithPreExistingConsole, testPreExistingConsoleObject) {
  InSequence s;
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "log"),
      AtJsonPtr(
          "/args",
          R"([{
              "type": "string",
              "value": "hello"
            }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "warning"),
      AtJsonPtr(
          "/args",
          R"([{
              "type": "string",
              "value": "world"
            }])"_json)));
  expectConsoleApiCall(AllOf(
      AtJsonPtr("/type", "table"),
      AtJsonPtr(
          "/args",
          R"([{
              "type": "number",
              "value": 42
            }])"_json)));
  eval("console.log('hello');");
  eval("console.warn('world');");
  // NOTE: not present in the pre-existing console object
  eval("console.table(42);");
  auto& runtime = engineAdapter_->getRuntime();
  EXPECT_THAT(
      eval("JSON.stringify(globalThis.__console_messages__)")
          .asString(runtime)
          .utf8(runtime),
      JsonEq(
          R"([{
            "type": "log",
            "args": [
              "hello"
            ]
          }, {
            "type": "warn",
            "args": [
              "world"
            ]
          }])"));
}

static const auto paramValues = testing::Values(
    Params{
        .withConsolePolyfill = true,
        .withNativeLoggingHook = false,
        .runtimeEnabledAtStart = false,
    },
    Params{
        .withConsolePolyfill = false,
        .withNativeLoggingHook = false,
        .runtimeEnabledAtStart = false,
    },
    Params{
        .withConsolePolyfill = true,
        .withNativeLoggingHook = false,
        .runtimeEnabledAtStart = true,
    },
    Params{
        .withConsolePolyfill = false,
        .withNativeLoggingHook = false,
        .runtimeEnabledAtStart = true,
    },
    Params{
        .withConsolePolyfill = true,
        .withNativeLoggingHook = true,
        .runtimeEnabledAtStart = false,
    },
    Params{
        .withConsolePolyfill = false,
        .withNativeLoggingHook = true,
        .runtimeEnabledAtStart = false,
    },
    Params{
        .withConsolePolyfill = true,
        .withNativeLoggingHook = true,
        .runtimeEnabledAtStart = true,
    },
    Params{
        .withConsolePolyfill = false,
        .withNativeLoggingHook = true,
        .runtimeEnabledAtStart = true,
    });

INSTANTIATE_TEST_SUITE_P(ConsoleApiTest, ConsoleApiTest, paramValues);

INSTANTIATE_TEST_SUITE_P(
    ConsoleApiTestWithPreExistingConsole,
    ConsoleApiTestWithPreExistingConsole,
    paramValues);

} // namespace facebook::react::jsinspector_modern
