"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/router/page",{

/***/ "(app-pages-browser)/./components/router/ejection/PresetSettings.tsx":
/*!*******************************************************!*\
  !*** ./components/router/ejection/PresetSettings.tsx ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PresetSettings; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.tsx\");\n/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/label */ \"(app-pages-browser)/./components/ui/label.tsx\");\n/* harmony import */ var _barrel_optimize_names_PlusCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=PlusCircle!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/circle-plus.js\");\n/* harmony import */ var _components_ui_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/tabs */ \"(app-pages-browser)/./components/ui/tabs.tsx\");\n\n\n\n\n\n\nconst presets = [\n    {\n        id: \"highSensitivity\",\n        name: \"High Sensitivity\",\n        description: \"Detects smaller defects with higher confidence thresholds\",\n        icon: \"\\uD83D\\uDD0D\"\n    },\n    {\n        id: \"balancedDetection\",\n        name: \"Balanced Detection\",\n        description: \"Moderate thresholds suitable for most use cases\",\n        icon: \"⚖️\"\n    },\n    {\n        id: \"lowSensitivity\",\n        name: \"Low Sensitivity\",\n        description: \"Only detects significant defects, reduces false positives\",\n        icon: \"\\uD83C\\uDFAF\"\n    }\n];\nfunction PresetSettings(param) {\n    let { onLoadPreset, onSavePreset } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_4__.TabsContent, {\n        value: \"presets\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"space-y-6\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_label__WEBPACK_IMPORTED_MODULE_3__.Label, {\n                            className: \"mb-4 block text-lg\",\n                            children: \"Ejection Presets\"\n                        }, void 0, false, {\n                            fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                            lineNumber: 41,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"grid grid-cols-1 md:grid-cols-3 gap-4\",\n                            children: presets.map((preset)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n                                    className: \"relative overflow-hidden group cursor-pointer hover:border-primary transition-colors dark:bg-gray-800\",\n                                    onClick: ()=>onLoadPreset(preset.id),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"p-6\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"text-2xl mb-2\",\n                                                children: preset.icon\n                                            }, void 0, false, {\n                                                fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                                                lineNumber: 50,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                className: \"font-semibold mb-2\",\n                                                children: preset.name\n                                            }, void 0, false, {\n                                                fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                                                lineNumber: 51,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"text-sm text-muted-foreground\",\n                                                children: preset.description\n                                            }, void 0, false, {\n                                                fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                                                lineNumber: 52,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                                                lineNumber: 55,\n                                                columnNumber: 19\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                                        lineNumber: 49,\n                                        columnNumber: 17\n                                    }, this)\n                                }, preset.id, false, {\n                                    fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                                    lineNumber: 44,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                    lineNumber: 40,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex justify-end\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_1__.Button, {\n                        onClick: ()=>{\n                            const presetName = prompt(\"Enter a name for the new preset:\");\n                            if (presetName) {\n                                onSavePreset(presetName);\n                            }\n                        },\n                        variant: \"outline\",\n                        className: \"w-full md:w-auto\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_PlusCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                className: \"mr-2 h-4 w-4\"\n                            }, void 0, false, {\n                                fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                                lineNumber: 73,\n                                columnNumber: 13\n                            }, this),\n                            \" Save Current as Preset\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                        lineNumber: 63,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n                    lineNumber: 62,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n            lineNumber: 39,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ejection/PresetSettings.tsx\",\n        lineNumber: 38,\n        columnNumber: 5\n    }, this);\n}\n_c = PresetSettings;\nvar _c;\n$RefreshReg$(_c, \"PresetSettings\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvcm91dGVyL2VqZWN0aW9uL1ByZXNldFNldHRpbmdzLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFnRDtBQUNKO0FBQ0U7QUFDSjtBQUNTO0FBT25ELE1BQU1LLFVBQVU7SUFDZDtRQUNFQyxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsYUFBYTtRQUNiQyxNQUFNO0lBQ1I7SUFDQTtRQUNFSCxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsYUFBYTtRQUNiQyxNQUFNO0lBQ1I7SUFDQTtRQUNFSCxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsYUFBYTtRQUNiQyxNQUFNO0lBQ1I7Q0FDRDtBQUVjLFNBQVNDLGVBQWUsS0FHakI7UUFIaUIsRUFDckNDLFlBQVksRUFDWkMsWUFBWSxFQUNRLEdBSGlCO0lBSXJDLHFCQUNFLDhEQUFDUiw0REFBV0E7UUFBQ1MsT0FBTTtrQkFDakIsNEVBQUNDO1lBQUlDLFdBQVU7OzhCQUNiLDhEQUFDRDs7c0NBQ0MsOERBQUNaLHVEQUFLQTs0QkFBQ2EsV0FBVTtzQ0FBcUI7Ozs7OztzQ0FDdEMsOERBQUNEOzRCQUFJQyxXQUFVO3NDQUNaVixRQUFRVyxHQUFHLENBQUMsQ0FBQ0MsdUJBQ1osOERBQUNoQixxREFBSUE7b0NBRUhjLFdBQVU7b0NBQ1ZHLFNBQVMsSUFBTVAsYUFBYU0sT0FBT1gsRUFBRTs4Q0FFckMsNEVBQUNRO3dDQUFJQyxXQUFVOzswREFDYiw4REFBQ0Q7Z0RBQUlDLFdBQVU7MERBQWlCRSxPQUFPUixJQUFJOzs7Ozs7MERBQzNDLDhEQUFDVTtnREFBR0osV0FBVTswREFBc0JFLE9BQU9WLElBQUk7Ozs7OzswREFDL0MsOERBQUNhO2dEQUFFTCxXQUFVOzBEQUNWRSxPQUFPVCxXQUFXOzs7Ozs7MERBRXJCLDhEQUFDTTtnREFBSUMsV0FBVTs7Ozs7Ozs7Ozs7O21DQVZaRSxPQUFPWCxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OzhCQWlCdEIsOERBQUNRO29CQUFJQyxXQUFVOzhCQUNiLDRFQUFDZix5REFBTUE7d0JBQ0xrQixTQUFTOzRCQUNQLE1BQU1HLGFBQWFDLE9BQU87NEJBQzFCLElBQUlELFlBQVk7Z0NBQ2RULGFBQWFTOzRCQUNmO3dCQUNGO3dCQUNBRSxTQUFRO3dCQUNSUixXQUFVOzswQ0FFViw4REFBQ1osc0ZBQVVBO2dDQUFDWSxXQUFVOzs7Ozs7NEJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1uRDtLQTlDd0JMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvcm91dGVyL2VqZWN0aW9uL1ByZXNldFNldHRpbmdzLnRzeD85MTBmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9jYXJkXCI7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvbGFiZWxcIjtcbmltcG9ydCB7IFBsdXNDaXJjbGUgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBUYWJzQ29udGVudCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvdGFic1wiO1xuXG5pbnRlcmZhY2UgUHJlc2V0U2V0dGluZ3NQcm9wcyB7XG4gIG9uTG9hZFByZXNldDogKHByZXNldDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblNhdmVQcmVzZXQ6IChuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmNvbnN0IHByZXNldHMgPSBbXG4gIHtcbiAgICBpZDogXCJoaWdoU2Vuc2l0aXZpdHlcIixcbiAgICBuYW1lOiBcIkhpZ2ggU2Vuc2l0aXZpdHlcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEZXRlY3RzIHNtYWxsZXIgZGVmZWN0cyB3aXRoIGhpZ2hlciBjb25maWRlbmNlIHRocmVzaG9sZHNcIixcbiAgICBpY29uOiBcIvCflI1cIixcbiAgfSxcbiAge1xuICAgIGlkOiBcImJhbGFuY2VkRGV0ZWN0aW9uXCIsXG4gICAgbmFtZTogXCJCYWxhbmNlZCBEZXRlY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJNb2RlcmF0ZSB0aHJlc2hvbGRzIHN1aXRhYmxlIGZvciBtb3N0IHVzZSBjYXNlc1wiLFxuICAgIGljb246IFwi4pqW77iPXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogXCJsb3dTZW5zaXRpdml0eVwiLFxuICAgIG5hbWU6IFwiTG93IFNlbnNpdGl2aXR5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiT25seSBkZXRlY3RzIHNpZ25pZmljYW50IGRlZmVjdHMsIHJlZHVjZXMgZmFsc2UgcG9zaXRpdmVzXCIsXG4gICAgaWNvbjogXCLwn46vXCIsXG4gIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcmVzZXRTZXR0aW5ncyh7XG4gIG9uTG9hZFByZXNldCxcbiAgb25TYXZlUHJlc2V0LFxufTogUHJlc2V0U2V0dGluZ3NQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxUYWJzQ29udGVudCB2YWx1ZT1cInByZXNldHNcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPExhYmVsIGNsYXNzTmFtZT1cIm1iLTQgYmxvY2sgdGV4dC1sZ1wiPkVqZWN0aW9uIFByZXNldHM8L0xhYmVsPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICAgICAge3ByZXNldHMubWFwKChwcmVzZXQpID0+IChcbiAgICAgICAgICAgICAgPENhcmRcbiAgICAgICAgICAgICAgICBrZXk9e3ByZXNldC5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gZ3JvdXAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6Ym9yZGVyLXByaW1hcnkgdHJhbnNpdGlvbi1jb2xvcnMgZGFyazpiZy1ncmF5LTgwMFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25Mb2FkUHJlc2V0KHByZXNldC5pZCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBtYi0yXCI+e3ByZXNldC5pY29ufTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgbWItMlwiPntwcmVzZXQubmFtZX08L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIj5cbiAgICAgICAgICAgICAgICAgICAge3ByZXNldC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1wcmltYXJ5LzUgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHByZXNldE5hbWUgPSBwcm9tcHQoXCJFbnRlciBhIG5hbWUgZm9yIHRoZSBuZXcgcHJlc2V0OlwiKTtcbiAgICAgICAgICAgICAgaWYgKHByZXNldE5hbWUpIHtcbiAgICAgICAgICAgICAgICBvblNhdmVQcmVzZXQocHJlc2V0TmFtZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy1hdXRvXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGx1c0NpcmNsZSBjbGFzc05hbWU9XCJtci0yIGgtNCB3LTRcIiAvPiBTYXZlIEN1cnJlbnQgYXMgUHJlc2V0XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9UYWJzQ29udGVudD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJCdXR0b24iLCJDYXJkIiwiTGFiZWwiLCJQbHVzQ2lyY2xlIiwiVGFic0NvbnRlbnQiLCJwcmVzZXRzIiwiaWQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiUHJlc2V0U2V0dGluZ3MiLCJvbkxvYWRQcmVzZXQiLCJvblNhdmVQcmVzZXQiLCJ2YWx1ZSIsImRpdiIsImNsYXNzTmFtZSIsIm1hcCIsInByZXNldCIsIm9uQ2xpY2siLCJoMyIsInAiLCJwcmVzZXROYW1lIiwicHJvbXB0IiwidmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/router/ejection/PresetSettings.tsx\n"));

/***/ })

});