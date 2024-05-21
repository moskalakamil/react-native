import"../shell/shell.js";import*as e from"../../core/common/common.js";import*as t from"../../core/i18n/i18n.js";import*as o from"../../core/root/root.js";import*as i from"../../ui/legacy/legacy.js";import*as n from"../../models/issues_manager/issues_manager.js";import*as a from"../../core/sdk/sdk.js";import*as r from"../../models/workspace/workspace.js";import*as s from"../../panels/network/forward/forward.js";import*as l from"../../core/host/host.js";import*as c from"../main/main.js";import*as d from"../../core/rn_experiments/rn_experiments.js";const g={toggleDeviceToolbar:"Toggle device toolbar",captureScreenshot:"Capture screenshot",captureFullSizeScreenshot:"Capture full size screenshot",captureNodeScreenshot:"Capture node screenshot",showMediaQueries:"Show media queries",device:"device",hideMediaQueries:"Hide media queries",showRulers:"Show rulers in the Device Mode toolbar",hideRulers:"Hide rulers in the Device Mode toolbar",showDeviceFrame:"Show device frame",hideDeviceFrame:"Hide device frame"},m=t.i18n.registerUIStrings("panels/emulation/emulation-meta.ts",g),w=t.i18n.getLazilyComputedLocalizedString.bind(void 0,m);let u;async function p(){return u||(u=await import("../../panels/emulation/emulation.js")),u}i.ActionRegistration.registerActionExtension({category:"MOBILE",actionId:"emulation.toggle-device-mode",toggleable:!0,loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.toggleDeviceToolbar),iconClass:"devices",bindings:[{platform:"windows,linux",shortcut:"Shift+Ctrl+M"},{platform:"mac",shortcut:"Shift+Meta+M"}]}),i.ActionRegistration.registerActionExtension({actionId:"emulation.capture-screenshot",category:"SCREENSHOT",loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.captureScreenshot)}),i.ActionRegistration.registerActionExtension({actionId:"emulation.capture-full-height-screenshot",category:"SCREENSHOT",loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.captureFullSizeScreenshot)}),i.ActionRegistration.registerActionExtension({actionId:"emulation.capture-node-screenshot",category:"SCREENSHOT",loadActionDelegate:async()=>new((await p()).DeviceModeWrapper.ActionDelegate),condition:o.Runtime.conditions.canDock,title:w(g.captureNodeScreenshot)}),e.Settings.registerSettingExtension({category:"MOBILE",settingName:"show-media-query-inspector",settingType:"boolean",defaultValue:!1,options:[{value:!0,title:w(g.showMediaQueries)},{value:!1,title:w(g.hideMediaQueries)}],tags:[w(g.device)]}),e.Settings.registerSettingExtension({category:"MOBILE",settingName:"emulation.show-rulers",settingType:"boolean",defaultValue:!1,options:[{value:!0,title:w(g.showRulers)},{value:!1,title:w(g.hideRulers)}],tags:[w(g.device)]}),e.Settings.registerSettingExtension({category:"MOBILE",settingName:"emulation.show-device-outline",settingType:"boolean",defaultValue:!1,options:[{value:!0,title:w(g.showDeviceFrame)},{value:!1,title:w(g.hideDeviceFrame)}],tags:[w(g.device)]}),i.Toolbar.registerToolbarItem({actionId:"emulation.toggle-device-mode",condition:o.Runtime.conditions.canDock,location:"main-toolbar-left",order:1,showLabel:void 0,loadItem:void 0,separator:void 0}),e.AppProvider.registerAppProvider({loadAppProvider:async()=>(await p()).AdvancedApp.AdvancedAppProvider.instance(),condition:o.Runtime.conditions.canDock,order:0}),i.ContextMenu.registerItem({location:"deviceModeMenu/save",order:12,actionId:"emulation.capture-screenshot"}),i.ContextMenu.registerItem({location:"deviceModeMenu/save",order:13,actionId:"emulation.capture-full-height-screenshot"});const v={sensors:"Sensors",geolocation:"geolocation",timezones:"timezones",locale:"locale",locales:"locales",accelerometer:"accelerometer",deviceOrientation:"device orientation",locations:"Locations",touch:"Touch",devicebased:"Device-based",forceEnabled:"Force enabled",emulateIdleDetectorState:"Emulate Idle Detector state",noIdleEmulation:"No idle emulation",userActiveScreenUnlocked:"User active, screen unlocked",userActiveScreenLocked:"User active, screen locked",userIdleScreenUnlocked:"User idle, screen unlocked",userIdleScreenLocked:"User idle, screen locked",showSensors:"Show Sensors",showLocations:"Show Locations"},y=t.i18n.registerUIStrings("panels/sensors/sensors-meta.ts",v),R=t.i18n.getLazilyComputedLocalizedString.bind(void 0,y);let h;async function f(){return h||(h=await import("../../panels/sensors/sensors.js")),h}i.ViewManager.registerViewExtension({location:"drawer-view",commandPrompt:R(v.showSensors),title:R(v.sensors),id:"sensors",persistence:"closeable",order:100,loadView:async()=>new((await f()).SensorsView.SensorsView),tags:[R(v.geolocation),R(v.timezones),R(v.locale),R(v.locales),R(v.accelerometer),R(v.deviceOrientation)]}),i.ViewManager.registerViewExtension({location:"settings-view",id:"emulation-locations",commandPrompt:R(v.showLocations),title:R(v.locations),order:40,loadView:async()=>new((await f()).LocationsSettingsTab.LocationsSettingsTab),settings:["emulation.locations"]}),e.Settings.registerSettingExtension({storageType:"Synced",settingName:"emulation.locations",settingType:"array",defaultValue:[{title:"Berlin",lat:52.520007,long:13.404954,timezoneId:"Europe/Berlin",locale:"de-DE"},{title:"London",lat:51.507351,long:-.127758,timezoneId:"Europe/London",locale:"en-GB"},{title:"Moscow",lat:55.755826,long:37.6173,timezoneId:"Europe/Moscow",locale:"ru-RU"},{title:"Mountain View",lat:37.386052,long:-122.083851,timezoneId:"America/Los_Angeles",locale:"en-US"},{title:"Mumbai",lat:19.075984,long:72.877656,timezoneId:"Asia/Kolkata",locale:"mr-IN"},{title:"San Francisco",lat:37.774929,long:-122.419416,timezoneId:"America/Los_Angeles",locale:"en-US"},{title:"Shanghai",lat:31.230416,long:121.473701,timezoneId:"Asia/Shanghai",locale:"zh-Hans-CN"},{title:"São Paulo",lat:-23.55052,long:-46.633309,timezoneId:"America/Sao_Paulo",locale:"pt-BR"},{title:"Tokyo",lat:35.689487,long:139.691706,timezoneId:"Asia/Tokyo",locale:"ja-JP"}]}),e.Settings.registerSettingExtension({title:R(v.touch),reloadRequired:!0,settingName:"emulation.touch",settingType:"enum",defaultValue:"none",options:[{value:"none",title:R(v.devicebased),text:R(v.devicebased)},{value:"force",title:R(v.forceEnabled),text:R(v.forceEnabled)}]}),e.Settings.registerSettingExtension({title:R(v.emulateIdleDetectorState),settingName:"emulation.idle-detection",settingType:"enum",defaultValue:"none",options:[{value:"none",title:R(v.noIdleEmulation),text:R(v.noIdleEmulation)},{value:'{"isUserActive":true,"isScreenUnlocked":true}',title:R(v.userActiveScreenUnlocked),text:R(v.userActiveScreenUnlocked)},{value:'{"isUserActive":true,"isScreenUnlocked":false}',title:R(v.userActiveScreenLocked),text:R(v.userActiveScreenLocked)},{value:'{"isUserActive":false,"isScreenUnlocked":true}',title:R(v.userIdleScreenUnlocked),text:R(v.userIdleScreenUnlocked)},{value:'{"isUserActive":false,"isScreenUnlocked":false}',title:R(v.userIdleScreenLocked),text:R(v.userIdleScreenLocked)}]});const k={developerResources:"Developer resources",showDeveloperResources:"Show Developer resources"},S=t.i18n.registerUIStrings("panels/developer_resources/developer_resources-meta.ts",k),A=t.i18n.getLazilyComputedLocalizedString.bind(void 0,S);let T;i.ViewManager.registerViewExtension({location:"drawer-view",id:"developer-resources",title:A(k.developerResources),commandPrompt:A(k.showDeveloperResources),order:100,persistence:"closeable",loadView:async()=>new((await async function(){return T||(T=await import("../../panels/developer_resources/developer_resources.js")),T}()).DeveloperResourcesView.DeveloperResourcesView)});const b={rendering:"Rendering",showRendering:"Show Rendering",paint:"paint",layout:"layout",fps:"fps",cssMediaType:"CSS media type",cssMediaFeature:"CSS media feature",visionDeficiency:"vision deficiency",colorVisionDeficiency:"color vision deficiency",reloadPage:"Reload page",hardReloadPage:"Hard reload page",forceAdBlocking:"Force ad blocking on this site",blockAds:"Block ads on this site",showAds:"Show ads on this site, if allowed",autoOpenDevTools:"Auto-open DevTools for popups",doNotAutoOpen:"Do not auto-open DevTools for popups",disablePaused:"Disable paused state overlay",toggleCssPrefersColorSchemeMedia:"Toggle CSS media feature prefers-color-scheme"},P=t.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts",b),N=t.i18n.getLazilyComputedLocalizedString.bind(void 0,P);let E;async function I(){return E||(E=await import("../inspector_main/inspector_main.js")),E}i.ViewManager.registerViewExtension({location:"drawer-view",id:"rendering",title:N(b.rendering),commandPrompt:N(b.showRendering),persistence:"closeable",order:50,loadView:async()=>new((await I()).RenderingOptions.RenderingOptionsView),tags:[N(b.paint),N(b.layout),N(b.fps),N(b.cssMediaType),N(b.cssMediaFeature),N(b.visionDeficiency),N(b.colorVisionDeficiency)]}),i.ActionRegistration.registerActionExtension({category:"NAVIGATION",actionId:"inspector-main.reload",loadActionDelegate:async()=>new((await I()).InspectorMain.ReloadActionDelegate),iconClass:"refresh",title:N(b.reloadPage),bindings:[{platform:"windows,linux",shortcut:"Ctrl+R"},{platform:"windows,linux",shortcut:"F5"},{platform:"mac",shortcut:"Meta+R"}]}),i.ActionRegistration.registerActionExtension({category:"NAVIGATION",actionId:"inspector-main.hard-reload",loadActionDelegate:async()=>new((await I()).InspectorMain.ReloadActionDelegate),title:N(b.hardReloadPage),bindings:[{platform:"windows,linux",shortcut:"Shift+Ctrl+R"},{platform:"windows,linux",shortcut:"Shift+F5"},{platform:"windows,linux",shortcut:"Ctrl+F5"},{platform:"windows,linux",shortcut:"Ctrl+Shift+F5"},{platform:"mac",shortcut:"Shift+Meta+R"}]}),i.ActionRegistration.registerActionExtension({actionId:"rendering.toggle-prefers-color-scheme",category:"RENDERING",title:N(b.toggleCssPrefersColorSchemeMedia),loadActionDelegate:async()=>new((await I()).RenderingOptions.ReloadActionDelegate)}),e.Settings.registerSettingExtension({category:"NETWORK",title:N(b.forceAdBlocking),settingName:"network.ad-blocking-enabled",settingType:"boolean",storageType:"Session",defaultValue:!1,options:[{value:!0,title:N(b.blockAds)},{value:!1,title:N(b.showAds)}]}),e.Settings.registerSettingExtension({category:"GLOBAL",storageType:"Synced",title:N(b.autoOpenDevTools),settingName:"auto-attach-to-created-pages",settingType:"boolean",order:2,defaultValue:!1,options:[{value:!0,title:N(b.autoOpenDevTools)},{value:!1,title:N(b.doNotAutoOpen)}]}),e.Settings.registerSettingExtension({category:"APPEARANCE",storageType:"Synced",title:N(b.disablePaused),settingName:"disable-paused-state-overlay",settingType:"boolean",defaultValue:!1}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await I()).InspectorMain.NodeIndicator.instance(),order:2,location:"main-toolbar-left"}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await I()).OutermostTargetSelector.OutermostTargetSelector.instance(),order:98,location:"main-toolbar-right",experiment:"outermost-target-selector"}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await I()).OutermostTargetSelector.OutermostTargetSelector.instance(),order:98,location:"main-toolbar-right",showLabel:void 0,condition:void 0,separator:void 0,actionId:void 0,experiment:"outermost-target-selector"});const x={issues:"Issues",showIssues:"Show Issues"},D=t.i18n.registerUIStrings("panels/issues/issues-meta.ts",x),M=t.i18n.getLazilyComputedLocalizedString.bind(void 0,D);let L;async function C(){return L||(L=await import("../../panels/issues/issues.js")),L}i.ViewManager.registerViewExtension({location:"drawer-view",id:"issues-pane",title:M(x.issues),commandPrompt:M(x.showIssues),order:100,persistence:"closeable",loadView:async()=>new((await C()).IssuesPane.IssuesPane)}),e.Revealer.registerRevealer({contextTypes:()=>[n.Issue.Issue],destination:e.Revealer.RevealerDestination.ISSUES_VIEW,loadRevealer:async()=>new((await C()).IssueRevealer.IssueRevealer)});const V={throttling:"Throttling",showThrottling:"Show Throttling",goOffline:"Go offline",device:"device",throttlingTag:"throttling",enableSlowGThrottling:"Enable slow `3G` throttling",enableFastGThrottling:"Enable fast `3G` throttling",goOnline:"Go online"},O=t.i18n.registerUIStrings("panels/mobile_throttling/mobile_throttling-meta.ts",V),F=t.i18n.getLazilyComputedLocalizedString.bind(void 0,O);let U;async function B(){return U||(U=await import("../../panels/mobile_throttling/mobile_throttling.js")),U}i.ViewManager.registerViewExtension({location:"settings-view",id:"throttling-conditions",title:F(V.throttling),commandPrompt:F(V.showThrottling),order:35,loadView:async()=>new((await B()).ThrottlingSettingsTab.ThrottlingSettingsTab),settings:["custom-network-conditions"]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-offline",category:"NETWORK",title:F(V.goOffline),loadActionDelegate:async()=>new((await B()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-low-end-mobile",category:"NETWORK",title:F(V.enableSlowGThrottling),loadActionDelegate:async()=>new((await B()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-mid-tier-mobile",category:"NETWORK",title:F(V.enableFastGThrottling),loadActionDelegate:async()=>new((await B()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),i.ActionRegistration.registerActionExtension({actionId:"network-conditions.network-online",category:"NETWORK",title:F(V.goOnline),loadActionDelegate:async()=>new((await B()).ThrottlingManager.ActionDelegate),tags:[F(V.device),F(V.throttlingTag)]}),e.Settings.registerSettingExtension({storageType:"Synced",settingName:"custom-network-conditions",settingType:"array",defaultValue:[]});const _={showNetwork:"Show Network",network:"Network",showNetworkRequestBlocking:"Show Network request blocking",networkRequestBlocking:"Network request blocking",showNetworkConditions:"Show Network conditions",networkConditions:"Network conditions",diskCache:"disk cache",networkThrottling:"network throttling",showSearch:"Show Search",search:"Search",recordNetworkLog:"Record network log",stopRecordingNetworkLog:"Stop recording network log",hideRequestDetails:"Hide request details",colorcodeResourceTypes:"Color-code resource types",colorCode:"color code",resourceType:"resource type",colorCodeByResourceType:"Color code by resource type",useDefaultColors:"Use default colors",groupNetworkLogByFrame:"Group network log by frame",netWork:"network",frame:"frame",group:"group",groupNetworkLogItemsByFrame:"Group network log items by frame",dontGroupNetworkLogItemsByFrame:"Don't group network log items by frame",clear:"Clear network log",addNetworkRequestBlockingPattern:"Add network request blocking pattern",removeAllNetworkRequestBlockingPatterns:"Remove all network request blocking patterns"},z=t.i18n.registerUIStrings("panels/network/network-meta.ts",_),q=t.i18n.getLazilyComputedLocalizedString.bind(void 0,z);let W;async function j(){return W||(W=await import("../../panels/network/network.js")),W}function K(e){return void 0===W?[]:e(W)}i.ViewManager.registerViewExtension({location:"panel",id:"network",commandPrompt:q(_.showNetwork),title:q(_.network),order:40,condition:o.Runtime.conditions.reactNativeUnstableNetworkPanel,loadView:async()=>(await j()).NetworkPanel.NetworkPanel.instance()}),i.ViewManager.registerViewExtension({location:"drawer-view",id:"network.blocked-urls",commandPrompt:q(_.showNetworkRequestBlocking),title:q(_.networkRequestBlocking),persistence:"closeable",order:60,loadView:async()=>new((await j()).BlockedURLsPane.BlockedURLsPane)}),i.ViewManager.registerViewExtension({location:"drawer-view",id:"network.config",commandPrompt:q(_.showNetworkConditions),title:q(_.networkConditions),persistence:"closeable",order:40,tags:[q(_.diskCache),q(_.networkThrottling),t.i18n.lockedLazyString("useragent"),t.i18n.lockedLazyString("user agent"),t.i18n.lockedLazyString("user-agent")],loadView:async()=>(await j()).NetworkConfigView.NetworkConfigView.instance()}),i.ViewManager.registerViewExtension({location:"network-sidebar",id:"network.search-network-tab",commandPrompt:q(_.showSearch),title:q(_.search),persistence:"permanent",loadView:async()=>(await j()).NetworkPanel.SearchNetworkView.instance()}),i.ActionRegistration.registerActionExtension({actionId:"network.toggle-recording",category:"NETWORK",iconClass:"record-start",toggleable:!0,toggledIconClass:"record-stop",toggleWithRedColor:!0,contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),options:[{value:!0,title:q(_.recordNetworkLog)},{value:!1,title:q(_.stopRecordingNetworkLog)}],bindings:[{shortcut:"Ctrl+E",platform:"windows,linux"},{shortcut:"Meta+E",platform:"mac"}]}),i.ActionRegistration.registerActionExtension({actionId:"network.clear",category:"NETWORK",title:q(_.clear),iconClass:"clear",loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),bindings:[{shortcut:"Ctrl+L"},{shortcut:"Meta+K",platform:"mac"}]}),i.ActionRegistration.registerActionExtension({actionId:"network.hide-request-details",category:"NETWORK",title:q(_.hideRequestDetails),contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),bindings:[{shortcut:"Esc"}]}),i.ActionRegistration.registerActionExtension({actionId:"network.search",category:"NETWORK",title:q(_.search),contextTypes:()=>K((e=>[e.NetworkPanel.NetworkPanel])),loadActionDelegate:async()=>new((await j()).NetworkPanel.ActionDelegate),bindings:[{platform:"mac",shortcut:"Meta+F",keybindSets:["devToolsDefault","vsCode"]},{platform:"windows,linux",shortcut:"Ctrl+F",keybindSets:["devToolsDefault","vsCode"]}]}),i.ActionRegistration.registerActionExtension({actionId:"network.add-network-request-blocking-pattern",category:"NETWORK",title:q(_.addNetworkRequestBlockingPattern),iconClass:"plus",contextTypes:()=>K((e=>[e.BlockedURLsPane.BlockedURLsPane])),loadActionDelegate:async()=>new((await j()).BlockedURLsPane.ActionDelegate)}),i.ActionRegistration.registerActionExtension({actionId:"network.remove-all-network-request-blocking-patterns",category:"NETWORK",title:q(_.removeAllNetworkRequestBlockingPatterns),iconClass:"clear",contextTypes:()=>K((e=>[e.BlockedURLsPane.BlockedURLsPane])),loadActionDelegate:async()=>new((await j()).BlockedURLsPane.ActionDelegate)}),e.Settings.registerSettingExtension({category:"NETWORK",storageType:"Synced",title:q(_.colorcodeResourceTypes),settingName:"network-color-code-resource-types",settingType:"boolean",defaultValue:!1,tags:[q(_.colorCode),q(_.resourceType)],options:[{value:!0,title:q(_.colorCodeByResourceType)},{value:!1,title:q(_.useDefaultColors)}]}),e.Settings.registerSettingExtension({category:"NETWORK",storageType:"Synced",title:q(_.groupNetworkLogByFrame),settingName:"network.group-by-frame",settingType:"boolean",defaultValue:!1,tags:[q(_.netWork),q(_.frame),q(_.group)],options:[{value:!0,title:q(_.groupNetworkLogItemsByFrame)},{value:!1,title:q(_.dontGroupNetworkLogItemsByFrame)}]}),i.ViewManager.registerLocationResolver({name:"network-sidebar",category:"NETWORK",loadResolver:async()=>(await j()).NetworkPanel.NetworkPanel.instance()}),i.ContextMenu.registerProvider({contextTypes:()=>[a.NetworkRequest.NetworkRequest,a.Resource.Resource,r.UISourceCode.UISourceCode],loadProvider:async()=>(await j()).NetworkPanel.NetworkPanel.instance(),experiment:void 0}),e.Revealer.registerRevealer({contextTypes:()=>[a.NetworkRequest.NetworkRequest],destination:e.Revealer.RevealerDestination.NETWORK_PANEL,loadRevealer:async()=>new((await j()).NetworkPanel.RequestRevealer)}),e.Revealer.registerRevealer({contextTypes:()=>[s.UIRequestLocation.UIRequestLocation],destination:void 0,loadRevealer:async()=>new((await j()).NetworkPanel.RequestLocationRevealer)}),e.Revealer.registerRevealer({contextTypes:()=>[s.NetworkRequestId.NetworkRequestId],destination:e.Revealer.RevealerDestination.NETWORK_PANEL,loadRevealer:async()=>new((await j()).NetworkPanel.RequestIdRevealer)}),e.Revealer.registerRevealer({contextTypes:()=>[s.UIFilter.UIRequestFilter],destination:e.Revealer.RevealerDestination.NETWORK_PANEL,loadRevealer:async()=>new((await j()).NetworkPanel.NetworkLogWithFilterRevealer)});const G={title:"⚛️ React DevTools",command:"Show React DevTools panel"},H=t.i18n.registerUIStrings("panels/react_devtools/react_devtools-meta.ts",G),J=t.i18n.getLazilyComputedLocalizedString.bind(void 0,H);let Q;i.ViewManager.registerViewExtension({location:"panel",id:"react-devtools",title:J(G.title),commandPrompt:J(G.command),persistence:"permanent",order:1e3,loadView:async()=>new((await async function(){return Q||(Q=await import("../../panels/react_devtools/react_devtools.js")),Q}()).ReactDevToolsView.ReactDevToolsViewImpl)});const Y={rnWelcome:"Welcome",showRnWelcome:"Show React Native Welcome panel",debuggerBrandName:"React Native DevTools",debuggerBrandNameInternal:"React Native DevTools (Fusebox ⚡)"},X=t.i18n.registerUIStrings("panels/rn_welcome/rn_welcome-meta.ts",Y),Z=t.i18n.getLazilyComputedLocalizedString.bind(void 0,X);let $;i.ViewManager.registerViewExtension({location:"panel",id:"rn-welcome",title:Z(Y.rnWelcome),commandPrompt:Z(Y.showRnWelcome),order:-10,persistence:"permanent",loadView:async()=>(await async function(){return $||($=await import("../../panels/rn_welcome/rn_welcome.js")),$}()).RNWelcome.RNWelcomeImpl.instance({debuggerBrandName:Z(Boolean(o.Runtime.Runtime.queryParam(o.Runtime.ConditionName.REACT_NATIVE_USE_INTERNAL_BRANDING))?Y.debuggerBrandNameInternal:Y.debuggerBrandName)}),experiment:"react-native-specific-ui"});const ee={performance:"Performance",showPerformance:"Show Performance",javascriptProfiler:"JavaScript Profiler",showJavascriptProfiler:"Show JavaScript Profiler",record:"Record",stop:"Stop",startProfilingAndReloadPage:"Start profiling and reload page",saveProfile:"Save profile…",loadProfile:"Load profile…",previousFrame:"Previous frame",nextFrame:"Next frame",showRecentTimelineSessions:"Show recent timeline sessions",previousRecording:"Previous recording",nextRecording:"Next recording",hideChromeFrameInLayersView:"Hide `chrome` frame in Layers view",startStopRecording:"Start/stop recording"},te=t.i18n.registerUIStrings("panels/timeline/timeline-meta.ts",ee),oe=t.i18n.getLazilyComputedLocalizedString.bind(void 0,te);let ie,ne;async function ae(){return ie||(ie=await import("../../panels/timeline/timeline.js")),ie}async function re(){return ne||(ne=await import("../../panels/profiler/profiler.js")),ne}function se(e){return void 0===ie?[]:e(ie)}i.ViewManager.registerViewExtension({location:"panel",id:"timeline",title:oe(ee.performance),commandPrompt:oe(ee.showPerformance),order:50,experiment:"enable-performance-panel",loadView:async()=>(await ae()).TimelinePanel.TimelinePanel.instance()}),i.ViewManager.registerViewExtension({location:"panel",id:"js-profiler",title:oe(ee.javascriptProfiler),commandPrompt:oe(ee.showJavascriptProfiler),persistence:"permanent",order:65,experiment:"js-profiler-temporarily-enable",loadView:async()=>(await re()).ProfilesPanel.JSProfilerPanel.instance()}),i.ActionRegistration.registerActionExtension({actionId:"timeline.toggle-recording",category:"PERFORMANCE",iconClass:"record-start",toggleable:!0,toggledIconClass:"record-stop",toggleWithRedColor:!0,contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),options:[{value:!0,title:oe(ee.record)},{value:!1,title:oe(ee.stop)}],bindings:[{platform:"windows,linux",shortcut:"Ctrl+E"},{platform:"mac",shortcut:"Meta+E"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.record-reload",iconClass:"refresh",contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),category:"PERFORMANCE",title:oe(ee.startProfilingAndReloadPage),loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),bindings:[{platform:"windows,linux",shortcut:"Ctrl+Shift+E"},{platform:"mac",shortcut:"Meta+Shift+E"}]}),i.ActionRegistration.registerActionExtension({category:"PERFORMANCE",actionId:"timeline.save-to-file",contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),title:oe(ee.saveProfile),bindings:[{platform:"windows,linux",shortcut:"Ctrl+S"},{platform:"mac",shortcut:"Meta+S"}]}),i.ActionRegistration.registerActionExtension({category:"PERFORMANCE",actionId:"timeline.load-from-file",contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),title:oe(ee.loadProfile),bindings:[{platform:"windows,linux",shortcut:"Ctrl+O"},{platform:"mac",shortcut:"Meta+O"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.jump-to-previous-frame",category:"PERFORMANCE",title:oe(ee.previousFrame),contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),bindings:[{shortcut:"["}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.jump-to-next-frame",category:"PERFORMANCE",title:oe(ee.nextFrame),contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),bindings:[{shortcut:"]"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.show-history",loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),category:"PERFORMANCE",title:oe(ee.showRecentTimelineSessions),contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),bindings:[{platform:"windows,linux",shortcut:"Ctrl+H"},{platform:"mac",shortcut:"Meta+Y"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.previous-recording",category:"PERFORMANCE",loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),title:oe(ee.previousRecording),contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),bindings:[{platform:"windows,linux",shortcut:"Alt+Left"},{platform:"mac",shortcut:"Meta+Left"}]}),i.ActionRegistration.registerActionExtension({actionId:"timeline.next-recording",category:"PERFORMANCE",loadActionDelegate:async()=>new((await ae()).TimelinePanel.ActionDelegate),title:oe(ee.nextRecording),contextTypes:()=>se((e=>[e.TimelinePanel.TimelinePanel])),bindings:[{platform:"windows,linux",shortcut:"Alt+Right"},{platform:"mac",shortcut:"Meta+Right"}]}),i.ActionRegistration.registerActionExtension({actionId:"profiler.js-toggle-recording",category:"JAVASCRIPT_PROFILER",title:oe(ee.startStopRecording),iconClass:"record-start",toggleable:!0,toggledIconClass:"record-stop",toggleWithRedColor:!0,contextTypes:()=>void 0===ne?[]:(e=>[e.ProfilesPanel.JSProfilerPanel])(ne),loadActionDelegate:async()=>(await re()).ProfilesPanel.JSProfilerPanel.instance(),bindings:[{platform:"windows,linux",shortcut:"Ctrl+E"},{platform:"mac",shortcut:"Meta+E"}]}),e.Settings.registerSettingExtension({category:"PERFORMANCE",storageType:"Synced",title:oe(ee.hideChromeFrameInLayersView),settingName:"frame-viewer-hide-chrome-window",settingType:"boolean",defaultValue:!1}),e.Linkifier.registerLinkifier({contextTypes:()=>se((e=>[e.CLSLinkifier.CLSRect])),loadLinkifier:async()=>(await ae()).CLSLinkifier.Linkifier.instance()}),i.ContextMenu.registerItem({location:"timelineMenu/open",actionId:"timeline.load-from-file",order:10}),i.ContextMenu.registerItem({location:"timelineMenu/open",actionId:"timeline.save-to-file",order:15}),l.rnPerfMetrics.registerPerfMetricsGlobalPostMessageHandler(),l.rnPerfMetrics.setLaunchId(o.Runtime.Runtime.queryParam("launchId")),l.rnPerfMetrics.entryPointLoadingStarted("rn_fusebox");const le={networkTitle:"React Native",showReactNative:"Show React Native",sendFeedback:"[FB-only] Send feedback"},ce=t.i18n.registerUIStrings("entrypoints/rn_fusebox/rn_fusebox.ts",le),de=t.i18n.getLazilyComputedLocalizedString.bind(void 0,ce);i.ViewManager.maybeRemoveViewExtension("network.blocked-urls"),i.ViewManager.maybeRemoveViewExtension("network.config"),i.ViewManager.maybeRemoveViewExtension("coverage"),i.ViewManager.maybeRemoveViewExtension("linear-memory-inspector"),i.ViewManager.maybeRemoveViewExtension("rendering"),i.ViewManager.maybeRemoveViewExtension("issues-pane"),i.ViewManager.maybeRemoveViewExtension("sensors"),i.ViewManager.maybeRemoveViewExtension("devices"),i.ViewManager.maybeRemoveViewExtension("emulation-locations"),i.ViewManager.maybeRemoveViewExtension("throttling-conditions"),d.RNExperimentsImpl.setIsReactNativeEntryPoint(!0),d.RNExperimentsImpl.Instance.enableExperimentsByDefault(["react-native-specific-ui"]);class ge extends a.SDKModel.SDKModel{constructor(e){super(e),e.fuseboxClientAgent().invoke_setClientMetadata()}}let me;if(a.SDKModel.SDKModel.register(ge,{capabilities:0,autostart:!0,early:!0}),i.ViewManager.registerViewExtension({location:"navigator-view",id:"navigator-network",title:de(le.networkTitle),commandPrompt:de(le.showReactNative),order:2,persistence:"permanent",loadView:async()=>(await async function(){return me||(me=await import("../../panels/sources/sources.js")),me}()).SourcesNavigator.NetworkNavigatorView.instance()}),self.runtime=o.Runtime.Runtime.instance({forceNew:!0}),new c.MainImpl.MainImpl,globalThis.FB_ONLY__reactNativeFeedbackLink){const e=globalThis.FB_ONLY__reactNativeFeedbackLink,t="react-native-send-feedback",o={handleAction:(o,i)=>i===t&&(l.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(e),!0)};i.ActionRegistration.registerActionExtension({category:"GLOBAL",actionId:t,title:de(le.sendFeedback),loadActionDelegate:async()=>o,iconClass:"bug"}),i.Toolbar.registerToolbarItem({location:"main-toolbar-right",actionId:t,showLabel:!0})}l.rnPerfMetrics.entryPointLoadingFinished("rn_fusebox");
