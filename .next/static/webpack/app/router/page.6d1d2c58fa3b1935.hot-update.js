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

/***/ "(app-pages-browser)/./components/router/ImageWithOverlay.tsx":
/*!************************************************!*\
  !*** ./components/router/ImageWithOverlay.tsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ImageWithOverlay: function() { return /* binding */ ImageWithOverlay; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nconst ImageWithOverlay = (param)=>{\n    let { imageUrl, predictions, onClick } = param;\n    _s();\n    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const [dimensions, setDimensions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        width: 0,\n        height: 0\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const updateDimensions = ()=>{\n            const img = new Image();\n            img.onload = ()=>{\n                if (!containerRef.current) return;\n                const maxWidth = Math.min(800, window.innerWidth - 32); // Max width with padding\n                const maxHeight = window.innerHeight * 0.8; // 80% of viewport height\n                // Calculate scaling ratio while maintaining aspect ratio\n                const scale = Math.min(maxWidth / img.width, maxHeight / img.height);\n                setDimensions({\n                    width: Math.floor(img.width * scale),\n                    height: Math.floor(img.height * scale)\n                });\n            };\n            img.src = imageUrl;\n        };\n        updateDimensions();\n        window.addEventListener(\"resize\", updateDimensions);\n        return ()=>window.removeEventListener(\"resize\", updateDimensions);\n    }, [\n        imageUrl\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const drawOverlay = ()=>{\n            const canvas = canvasRef.current;\n            if (!canvas || dimensions.width === 0) return;\n            const ctx = canvas.getContext(\"2d\");\n            if (!ctx) return;\n            // Update canvas dimensions\n            canvas.width = dimensions.width;\n            canvas.height = dimensions.height;\n            // Clear previous drawings\n            ctx.clearRect(0, 0, canvas.width, canvas.height);\n            // Draw bounding boxes\n            predictions === null || predictions === void 0 ? void 0 : predictions.forEach((prediction)=>{\n                const { bbox, confidence, class_name } = prediction;\n                // Convert normalized coordinates to pixel values\n                const x = bbox[0] * canvas.width;\n                const y = bbox[1] * canvas.height;\n                const width = (bbox[2] - bbox[0]) * canvas.width;\n                const height = (bbox[3] - bbox[1]) * canvas.height;\n                // Draw box\n                ctx.strokeStyle = \"#00ff00\";\n                ctx.lineWidth = 2;\n                ctx.strokeRect(x, y, width, height);\n                // Draw label with background\n                const label = \"\".concat(class_name, \" \").concat((confidence * 100).toFixed(1), \"%\");\n                ctx.font = \"14px Arial\";\n                const labelWidth = ctx.measureText(label).width;\n                const labelHeight = 20;\n                // Draw label background\n                ctx.fillStyle = \"rgba(0, 0, 0, 0.5)\";\n                ctx.fillRect(x, y - labelHeight, labelWidth + 6, labelHeight);\n                // Draw label text\n                ctx.fillStyle = \"#ffffff\";\n                ctx.fillText(label, x + 3, y - 5);\n            });\n        };\n        drawOverlay();\n    }, [\n        predictions,\n        dimensions\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center p-4\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            ref: containerRef,\n            className: \"relative rounded-lg overflow-hidden\",\n            onClick: onClick,\n            role: \"button\",\n            tabIndex: 0,\n            style: {\n                width: dimensions.width,\n                height: dimensions.height\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                    src: imageUrl,\n                    alt: \"Captured image\",\n                    className: \"w-full h-full object-contain\",\n                    style: {\n                        width: dimensions.width,\n                        height: dimensions.height\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ImageWithOverlay.tsx\",\n                    lineNumber: 109,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                    ref: canvasRef,\n                    className: \"absolute top-0 left-0 pointer-events-none\",\n                    style: {\n                        width: dimensions.width,\n                        height: dimensions.height\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ImageWithOverlay.tsx\",\n                    lineNumber: 118,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ImageWithOverlay.tsx\",\n            lineNumber: 98,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/steelebenjamin/Documents/Everwood/Code/shadcn-panel/components/router/ImageWithOverlay.tsx\",\n        lineNumber: 97,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ImageWithOverlay, \"/gPTVonYeWv5CEmYxqWAgJq3ABQ=\");\n_c = ImageWithOverlay;\nvar _c;\n$RefreshReg$(_c, \"ImageWithOverlay\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvcm91dGVyL0ltYWdlV2l0aE92ZXJsYXkudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyRDtBQVlwRCxNQUFNSSxtQkFBb0Q7UUFBQyxFQUNoRUMsUUFBUSxFQUNSQyxXQUFXLEVBQ1hDLE9BQU8sRUFDUjs7SUFDQyxNQUFNQyxZQUFZUCw2Q0FBTUEsQ0FBb0I7SUFDNUMsTUFBTVEsZUFBZVIsNkNBQU1BLENBQWlCO0lBQzVDLE1BQU0sQ0FBQ1MsWUFBWUMsY0FBYyxHQUFHUiwrQ0FBUUEsQ0FBQztRQUFFUyxPQUFPO1FBQUdDLFFBQVE7SUFBRTtJQUVuRVgsZ0RBQVNBLENBQUM7UUFDUixNQUFNWSxtQkFBbUI7WUFDdkIsTUFBTUMsTUFBTSxJQUFJQztZQUNoQkQsSUFBSUUsTUFBTSxHQUFHO2dCQUNYLElBQUksQ0FBQ1IsYUFBYVMsT0FBTyxFQUFFO2dCQUUzQixNQUFNQyxXQUFXQyxLQUFLQyxHQUFHLENBQUMsS0FBS0MsT0FBT0MsVUFBVSxHQUFHLEtBQUsseUJBQXlCO2dCQUNqRixNQUFNQyxZQUFZRixPQUFPRyxXQUFXLEdBQUcsS0FBSyx5QkFBeUI7Z0JBRXJFLHlEQUF5RDtnQkFDekQsTUFBTUMsUUFBUU4sS0FBS0MsR0FBRyxDQUFDRixXQUFXSixJQUFJSCxLQUFLLEVBQUVZLFlBQVlULElBQUlGLE1BQU07Z0JBRW5FRixjQUFjO29CQUNaQyxPQUFPUSxLQUFLTyxLQUFLLENBQUNaLElBQUlILEtBQUssR0FBR2M7b0JBQzlCYixRQUFRTyxLQUFLTyxLQUFLLENBQUNaLElBQUlGLE1BQU0sR0FBR2E7Z0JBQ2xDO1lBQ0Y7WUFDQVgsSUFBSWEsR0FBRyxHQUFHdkI7UUFDWjtRQUVBUztRQUNBUSxPQUFPTyxnQkFBZ0IsQ0FBQyxVQUFVZjtRQUNsQyxPQUFPLElBQU1RLE9BQU9RLG1CQUFtQixDQUFDLFVBQVVoQjtJQUNwRCxHQUFHO1FBQUNUO0tBQVM7SUFFYkgsZ0RBQVNBLENBQUM7UUFDUixNQUFNNkIsY0FBYztZQUNsQixNQUFNQyxTQUFTeEIsVUFBVVUsT0FBTztZQUNoQyxJQUFJLENBQUNjLFVBQVV0QixXQUFXRSxLQUFLLEtBQUssR0FBRztZQUV2QyxNQUFNcUIsTUFBTUQsT0FBT0UsVUFBVSxDQUFDO1lBQzlCLElBQUksQ0FBQ0QsS0FBSztZQUVWLDJCQUEyQjtZQUMzQkQsT0FBT3BCLEtBQUssR0FBR0YsV0FBV0UsS0FBSztZQUMvQm9CLE9BQU9uQixNQUFNLEdBQUdILFdBQVdHLE1BQU07WUFFakMsMEJBQTBCO1lBQzFCb0IsSUFBSUUsU0FBUyxDQUFDLEdBQUcsR0FBR0gsT0FBT3BCLEtBQUssRUFBRW9CLE9BQU9uQixNQUFNO1lBRS9DLHNCQUFzQjtZQUN0QlAsd0JBQUFBLGtDQUFBQSxZQUFhOEIsT0FBTyxDQUFDLENBQUNDO2dCQUNwQixNQUFNLEVBQUVDLElBQUksRUFBRUMsVUFBVSxFQUFFQyxVQUFVLEVBQUUsR0FBR0g7Z0JBRXpDLGlEQUFpRDtnQkFDakQsTUFBTUksSUFBSUgsSUFBSSxDQUFDLEVBQUUsR0FBR04sT0FBT3BCLEtBQUs7Z0JBQ2hDLE1BQU04QixJQUFJSixJQUFJLENBQUMsRUFBRSxHQUFHTixPQUFPbkIsTUFBTTtnQkFDakMsTUFBTUQsUUFBUSxDQUFDMEIsSUFBSSxDQUFDLEVBQUUsR0FBR0EsSUFBSSxDQUFDLEVBQUUsSUFBSU4sT0FBT3BCLEtBQUs7Z0JBQ2hELE1BQU1DLFNBQVMsQ0FBQ3lCLElBQUksQ0FBQyxFQUFFLEdBQUdBLElBQUksQ0FBQyxFQUFFLElBQUlOLE9BQU9uQixNQUFNO2dCQUVsRCxXQUFXO2dCQUNYb0IsSUFBSVUsV0FBVyxHQUFHO2dCQUNsQlYsSUFBSVcsU0FBUyxHQUFHO2dCQUNoQlgsSUFBSVksVUFBVSxDQUFDSixHQUFHQyxHQUFHOUIsT0FBT0M7Z0JBRTVCLDZCQUE2QjtnQkFDN0IsTUFBTWlDLFFBQVEsR0FBaUIsT0FBZE4sWUFBVyxLQUFpQyxPQUE5QixDQUFDRCxhQUFhLEdBQUUsRUFBR1EsT0FBTyxDQUFDLElBQUc7Z0JBQzdEZCxJQUFJZSxJQUFJLEdBQUc7Z0JBQ1gsTUFBTUMsYUFBYWhCLElBQUlpQixXQUFXLENBQUNKLE9BQU9sQyxLQUFLO2dCQUMvQyxNQUFNdUMsY0FBYztnQkFFcEIsd0JBQXdCO2dCQUN4QmxCLElBQUltQixTQUFTLEdBQUc7Z0JBQ2hCbkIsSUFBSW9CLFFBQVEsQ0FBQ1osR0FBR0MsSUFBSVMsYUFBYUYsYUFBYSxHQUFHRTtnQkFFakQsa0JBQWtCO2dCQUNsQmxCLElBQUltQixTQUFTLEdBQUc7Z0JBQ2hCbkIsSUFBSXFCLFFBQVEsQ0FBQ1IsT0FBT0wsSUFBSSxHQUFHQyxJQUFJO1lBQ2pDO1FBQ0Y7UUFFQVg7SUFDRixHQUFHO1FBQUN6QjtRQUFhSTtLQUFXO0lBRTVCLHFCQUNFLDhEQUFDNkM7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ0Q7WUFDQ0UsS0FBS2hEO1lBQ0wrQyxXQUFVO1lBQ1ZqRCxTQUFTQTtZQUNUbUQsTUFBSztZQUNMQyxVQUFVO1lBQ1ZDLE9BQU87Z0JBQ0xoRCxPQUFPRixXQUFXRSxLQUFLO2dCQUN2QkMsUUFBUUgsV0FBV0csTUFBTTtZQUMzQjs7OEJBRUEsOERBQUNFO29CQUNDYSxLQUFLdkI7b0JBQ0x3RCxLQUFJO29CQUNKTCxXQUFVO29CQUNWSSxPQUFPO3dCQUNMaEQsT0FBT0YsV0FBV0UsS0FBSzt3QkFDdkJDLFFBQVFILFdBQVdHLE1BQU07b0JBQzNCOzs7Ozs7OEJBRUYsOERBQUNtQjtvQkFDQ3lCLEtBQUtqRDtvQkFDTGdELFdBQVU7b0JBQ1ZJLE9BQU87d0JBQ0xoRCxPQUFPRixXQUFXRSxLQUFLO3dCQUN2QkMsUUFBUUgsV0FBV0csTUFBTTtvQkFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1YsRUFBRTtHQXBIV1Q7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9yb3V0ZXIvSW1hZ2VXaXRoT3ZlcmxheS50c3g/NzFkZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmludGVyZmFjZSBJbWFnZVdpdGhPdmVybGF5UHJvcHMge1xuICBpbWFnZVVybDogc3RyaW5nO1xuICBwcmVkaWN0aW9uczogQXJyYXk8e1xuICAgIGJib3g6IG51bWJlcltdO1xuICAgIGNvbmZpZGVuY2U6IG51bWJlcjtcbiAgICBjbGFzc19uYW1lOiBzdHJpbmc7XG4gIH0+O1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEltYWdlV2l0aE92ZXJsYXk6IFJlYWN0LkZDPEltYWdlV2l0aE92ZXJsYXlQcm9wcz4gPSAoe1xuICBpbWFnZVVybCxcbiAgcHJlZGljdGlvbnMsXG4gIG9uQ2xpY2ssXG59KSA9PiB7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IFtkaW1lbnNpb25zLCBzZXREaW1lbnNpb25zXSA9IHVzZVN0YXRlKHsgd2lkdGg6IDAsIGhlaWdodDogMCB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZURpbWVuc2lvbnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBjb25zdCBtYXhXaWR0aCA9IE1hdGgubWluKDgwMCwgd2luZG93LmlubmVyV2lkdGggLSAzMik7IC8vIE1heCB3aWR0aCB3aXRoIHBhZGRpbmdcbiAgICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogMC44OyAvLyA4MCUgb2Ygdmlld3BvcnQgaGVpZ2h0XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHNjYWxpbmcgcmF0aW8gd2hpbGUgbWFpbnRhaW5pbmcgYXNwZWN0IHJhdGlvXG4gICAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5taW4obWF4V2lkdGggLyBpbWcud2lkdGgsIG1heEhlaWdodCAvIGltZy5oZWlnaHQpO1xuXG4gICAgICAgIHNldERpbWVuc2lvbnMoe1xuICAgICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKGltZy53aWR0aCAqIHNjYWxlKSxcbiAgICAgICAgICBoZWlnaHQ6IE1hdGguZmxvb3IoaW1nLmhlaWdodCAqIHNjYWxlKSxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgaW1nLnNyYyA9IGltYWdlVXJsO1xuICAgIH07XG5cbiAgICB1cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlRGltZW5zaW9ucyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZURpbWVuc2lvbnMpO1xuICB9LCBbaW1hZ2VVcmxdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGRyYXdPdmVybGF5ID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIWNhbnZhcyB8fCBkaW1lbnNpb25zLndpZHRoID09PSAwKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgICAvLyBVcGRhdGUgY2FudmFzIGRpbWVuc2lvbnNcbiAgICAgIGNhbnZhcy53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQ7XG5cbiAgICAgIC8vIENsZWFyIHByZXZpb3VzIGRyYXdpbmdzXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIC8vIERyYXcgYm91bmRpbmcgYm94ZXNcbiAgICAgIHByZWRpY3Rpb25zPy5mb3JFYWNoKChwcmVkaWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYmJveCwgY29uZmlkZW5jZSwgY2xhc3NfbmFtZSB9ID0gcHJlZGljdGlvbjtcblxuICAgICAgICAvLyBDb252ZXJ0IG5vcm1hbGl6ZWQgY29vcmRpbmF0ZXMgdG8gcGl4ZWwgdmFsdWVzXG4gICAgICAgIGNvbnN0IHggPSBiYm94WzBdICogY2FudmFzLndpZHRoO1xuICAgICAgICBjb25zdCB5ID0gYmJveFsxXSAqIGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGJib3hbMl0gLSBiYm94WzBdKSAqIGNhbnZhcy53aWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gKGJib3hbM10gLSBiYm94WzFdKSAqIGNhbnZhcy5oZWlnaHQ7XG5cbiAgICAgICAgLy8gRHJhdyBib3hcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDBmZjAwXCI7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICAvLyBEcmF3IGxhYmVsIHdpdGggYmFja2dyb3VuZFxuICAgICAgICBjb25zdCBsYWJlbCA9IGAke2NsYXNzX25hbWV9ICR7KGNvbmZpZGVuY2UgKiAxMDApLnRvRml4ZWQoMSl9JWA7XG4gICAgICAgIGN0eC5mb250ID0gXCIxNHB4IEFyaWFsXCI7XG4gICAgICAgIGNvbnN0IGxhYmVsV2lkdGggPSBjdHgubWVhc3VyZVRleHQobGFiZWwpLndpZHRoO1xuICAgICAgICBjb25zdCBsYWJlbEhlaWdodCA9IDIwO1xuXG4gICAgICAgIC8vIERyYXcgbGFiZWwgYmFja2dyb3VuZFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHkgLSBsYWJlbEhlaWdodCwgbGFiZWxXaWR0aCArIDYsIGxhYmVsSGVpZ2h0KTtcblxuICAgICAgICAvLyBEcmF3IGxhYmVsIHRleHRcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICBjdHguZmlsbFRleHQobGFiZWwsIHggKyAzLCB5IC0gNSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZHJhd092ZXJsYXkoKTtcbiAgfSwgW3ByZWRpY3Rpb25zLCBkaW1lbnNpb25zXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHAtNFwiPlxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgcm91bmRlZC1sZyBvdmVyZmxvdy1oaWRkZW5cIlxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBkaW1lbnNpb25zLmhlaWdodCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XG4gICAgICAgICAgYWx0PVwiQ2FwdHVyZWQgaW1hZ2VcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvbnRhaW5cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICB3aWR0aDogZGltZW5zaW9ucy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHQsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgPGNhbnZhc1xuICAgICAgICAgIHJlZj17Y2FudmFzUmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGxlZnQtMCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaGVpZ2h0LFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkltYWdlV2l0aE92ZXJsYXkiLCJpbWFnZVVybCIsInByZWRpY3Rpb25zIiwib25DbGljayIsImNhbnZhc1JlZiIsImNvbnRhaW5lclJlZiIsImRpbWVuc2lvbnMiLCJzZXREaW1lbnNpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJ1cGRhdGVEaW1lbnNpb25zIiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJjdXJyZW50IiwibWF4V2lkdGgiLCJNYXRoIiwibWluIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIm1heEhlaWdodCIsImlubmVySGVpZ2h0Iiwic2NhbGUiLCJmbG9vciIsInNyYyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZHJhd092ZXJsYXkiLCJjYW52YXMiLCJjdHgiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0IiwiZm9yRWFjaCIsInByZWRpY3Rpb24iLCJiYm94IiwiY29uZmlkZW5jZSIsImNsYXNzX25hbWUiLCJ4IiwieSIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic3Ryb2tlUmVjdCIsImxhYmVsIiwidG9GaXhlZCIsImZvbnQiLCJsYWJlbFdpZHRoIiwibWVhc3VyZVRleHQiLCJsYWJlbEhlaWdodCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZmlsbFRleHQiLCJkaXYiLCJjbGFzc05hbWUiLCJyZWYiLCJyb2xlIiwidGFiSW5kZXgiLCJzdHlsZSIsImFsdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/router/ImageWithOverlay.tsx\n"));

/***/ })

});