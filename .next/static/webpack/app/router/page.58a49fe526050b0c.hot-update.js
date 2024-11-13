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

/***/ "(app-pages-browser)/./hooks/useWebsocket.tsx":
/*!********************************!*\
  !*** ./hooks/useWebsocket.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useWebSocketManager: function() { return /* binding */ useWebSocketManager; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sonner */ \"(app-pages-browser)/./node_modules/sonner/dist/index.mjs\");\nvar _s = $RefreshSig$();\n\n\nconst WEBSOCKET_URL = \"ws://192.168.1.216:3000/ws\";\nconst RECONNECT_DELAY = 2000;\nconst MAX_RECONNECT_ATTEMPTS = 5;\nconst PING_INTERVAL = 30000;\nconst INITIAL_STATE = {\n    sensor1: false,\n    sensor2: false,\n    solenoid: false,\n    lastPhotoPath: null,\n    deviceConnected: false,\n    lastUpdate: new Date(),\n    events: [],\n    currentImageUrl: null,\n    currentImageMetadata: null,\n    isCapturingImage: false,\n    currentAnalysis: null\n};\nconst useWebSocketManager = ()=>{\n    _s();\n    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n        ...INITIAL_STATE,\n        currentAnalysis: null\n    });\n    const [logs, setLogs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n    const [alerts, setAlerts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n    const [connectionStatus, setConnectionStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"disconnected\");\n    const [reconnectAttempts, setReconnectAttempts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n    const [connectionError, setConnectionError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [isCapturingImage, setIsCapturingImage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const wsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const reconnectTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const pingIntervalRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const isConnectingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);\n    const mountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);\n    const handleBinaryMessage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((blob)=>{\n        try {\n            const url = URL.createObjectURL(blob);\n            // Clean up previous URL if it exists\n            setState((prev)=>{\n                if (prev.currentImageUrl) {\n                    URL.revokeObjectURL(prev.currentImageUrl);\n                }\n                return {\n                    ...prev,\n                    currentImageUrl: url,\n                    lastUpdate: new Date()\n                };\n            });\n            setIsCapturingImage(false);\n            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.success(\"Image captured successfully\");\n        } catch (error) {\n            console.error(\"Error handling image blob:\", error);\n            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(\"Failed to process image\");\n        }\n    }, []);\n    const clearPingInterval = ()=>{\n        if (pingIntervalRef.current) {\n            clearInterval(pingIntervalRef.current);\n            pingIntervalRef.current = null;\n        }\n    };\n    const setupPingInterval = (ws)=>{\n        clearPingInterval();\n        pingIntervalRef.current = setInterval(()=>{\n            if (ws.readyState === WebSocket.OPEN) {\n                try {\n                    ws.send(JSON.stringify({\n                        type: \"ping\"\n                    }));\n                } catch (error) {\n                    console.error(\"Error sending ping:\", error);\n                    ws.close();\n                }\n            }\n        }, PING_INTERVAL);\n    };\n    const connect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{\n        if (!mountedRef.current || isConnectingRef.current) {\n            return;\n        }\n        try {\n            isConnectingRef.current = true;\n            setConnectionStatus(\"connecting\");\n            const ws = new WebSocket(WEBSOCKET_URL);\n            ws.binaryType = \"blob\"; // Important for binary image data\n            wsRef.current = ws;\n            const connectionTimeout = setTimeout(()=>{\n                if (ws.readyState !== WebSocket.OPEN) {\n                    ws.close();\n                }\n            }, 5000);\n            ws.onopen = ()=>{\n                if (!mountedRef.current) {\n                    ws.close(1000, \"Component unmounted\");\n                    return;\n                }\n                clearTimeout(connectionTimeout);\n                setConnectionStatus(\"connected\");\n                setReconnectAttempts(0);\n                setConnectionError(\"\");\n                setupPingInterval(ws);\n                isConnectingRef.current = false;\n                sonner__WEBPACK_IMPORTED_MODULE_1__.toast.success(\"Connected to system\");\n            };\n            ws.onmessage = (event)=>{\n                try {\n                    // Handle binary message (image data)\n                    if (event.data instanceof Blob) {\n                        handleBinaryMessage(event.data);\n                        return;\n                    }\n                    if (event.data === \"pong\") return;\n                    const eventData = JSON.parse(event.data);\n                    console.log(\"raw data\", eventData);\n                    if (!eventData.type && typeof eventData === \"object\") {\n                        setState((prev)=>({\n                                ...prev,\n                                ...eventData,\n                                lastUpdate: new Date()\n                            }));\n                        return;\n                    }\n                    switch(eventData.type){\n                        case \"imageMetadata\":\n                            {\n                                setState((prev)=>({\n                                        ...prev,\n                                        currentImageMetadata: eventData.data,\n                                        lastUpdate: new Date()\n                                    }));\n                                setIsCapturingImage(true);\n                                break;\n                            }\n                        case \"stateUpdate\":\n                            {\n                                setState((prev)=>({\n                                        ...prev,\n                                        ...eventData.data,\n                                        lastUpdate: new Date()\n                                    }));\n                                break;\n                            }\n                        case \"systemLog\":\n                            {\n                                setLogs((prev)=>[\n                                        {\n                                            id: crypto.randomUUID(),\n                                            timestamp: new Date(),\n                                            level: eventData.level || \"info\",\n                                            message: eventData.data.message,\n                                            source: eventData.source || \"system\"\n                                        },\n                                        ...prev\n                                    ]);\n                                break;\n                            }\n                        case \"alert\":\n                            {\n                                const newAlert = {\n                                    id: crypto.randomUUID(),\n                                    timestamp: new Date(),\n                                    level: eventData.level || \"warning\",\n                                    message: eventData.data.message,\n                                    acknowledged: false\n                                };\n                                setAlerts((prev)=>[\n                                        newAlert,\n                                        ...prev\n                                    ]);\n                                // Show toast for new alerts\n                                if (eventData.level === \"error\") {\n                                    sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(eventData.data.message);\n                                } else {\n                                    sonner__WEBPACK_IMPORTED_MODULE_1__.toast.warning(eventData.data.message);\n                                }\n                                break;\n                            }\n                        case \"analysisResults\":\n                            {\n                                setState((prev)=>({\n                                        ...prev,\n                                        currentAnalysis: eventData.data,\n                                        lastUpdate: new Date()\n                                    }));\n                                break;\n                            }\n                    }\n                } catch (error) {\n                    console.error(\"Error processing WebSocket message:\", error);\n                }\n            };\n            ws.onclose = (event)=>{\n                clearTimeout(connectionTimeout);\n                clearPingInterval();\n                if (!mountedRef.current) return;\n                setConnectionStatus(\"disconnected\");\n                isConnectingRef.current = false;\n                sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(\"Disconnected from system\");\n                if (event.code !== 1000 && event.code !== 1005) {\n                    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {\n                        reconnectTimeoutRef.current = setTimeout(()=>{\n                            if (mountedRef.current) {\n                                setReconnectAttempts((prev)=>prev + 1);\n                                connect();\n                            }\n                        }, RECONNECT_DELAY);\n                    } else {\n                        setConnectionError(\"Maximum reconnection attempts reached. Please refresh the page.\");\n                    }\n                }\n            };\n            ws.onerror = ()=>{\n                if (!mountedRef.current) return;\n                setConnectionStatus(\"disconnected\");\n                isConnectingRef.current = false;\n            };\n        } catch (error) {\n            if (!mountedRef.current) return;\n            setConnectionError(\"Failed to establish WebSocket connection. Please check your network connection.\");\n            isConnectingRef.current = false;\n        }\n    }, [\n        reconnectAttempts,\n        handleBinaryMessage\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        mountedRef.current = true;\n        connect();\n        return ()=>{\n            mountedRef.current = false;\n            isConnectingRef.current = false;\n            // Clean up image URLs\n            setState((prev)=>{\n                if (prev.currentImageUrl) {\n                    URL.revokeObjectURL(prev.currentImageUrl);\n                }\n                return prev;\n            });\n            if (wsRef.current) {\n                wsRef.current.close(1000, \"Component unmounting\");\n                wsRef.current = null;\n            }\n            if (reconnectTimeoutRef.current) {\n                clearTimeout(reconnectTimeoutRef.current);\n                reconnectTimeoutRef.current = null;\n            }\n            clearPingInterval();\n        };\n    }, [\n        connect\n    ]);\n    return {\n        status: state,\n        logs,\n        alerts,\n        connectionStatus,\n        connectionError,\n        reconnectAttempts,\n        isCapturingImage\n    };\n};\n_s(useWebSocketManager, \"JYq1asBAp5Q4oEjcxm44T2KU4a8=\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2hvb2tzL3VzZVdlYnNvY2tldC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFPaUU7QUFDbEM7QUFFL0IsTUFBTUssZ0JBQWdCO0FBQ3RCLE1BQU1DLGtCQUFrQjtBQUN4QixNQUFNQyx5QkFBeUI7QUFDL0IsTUFBTUMsZ0JBQWdCO0FBaUJ0QixNQUFNQyxnQkFBZ0M7SUFDcENDLFNBQVM7SUFDVEMsU0FBUztJQUNUQyxVQUFVO0lBQ1ZDLGVBQWU7SUFDZkMsaUJBQWlCO0lBQ2pCQyxZQUFZLElBQUlDO0lBQ2hCQyxRQUFRLEVBQUU7SUFDVkMsaUJBQWlCO0lBQ2pCQyxzQkFBc0I7SUFDdEJDLGtCQUFrQjtJQUNsQkMsaUJBQWlCO0FBQ25CO0FBRU8sTUFBTUMsc0JBQXNCOztJQUNqQyxNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR3hCLCtDQUFRQSxDQUFpQjtRQUNqRCxHQUFHUyxhQUFhO1FBQ2hCWSxpQkFBaUI7SUFDbkI7SUFDQSxNQUFNLENBQUNJLE1BQU1DLFFBQVEsR0FBRzFCLCtDQUFRQSxDQUFhLEVBQUU7SUFDL0MsTUFBTSxDQUFDMkIsUUFBUUMsVUFBVSxHQUFHNUIsK0NBQVFBLENBQVUsRUFBRTtJQUNoRCxNQUFNLENBQUM2QixrQkFBa0JDLG9CQUFvQixHQUMzQzlCLCtDQUFRQSxDQUFtQjtJQUM3QixNQUFNLENBQUMrQixtQkFBbUJDLHFCQUFxQixHQUFHaEMsK0NBQVFBLENBQVM7SUFDbkUsTUFBTSxDQUFDaUMsaUJBQWlCQyxtQkFBbUIsR0FBR2xDLCtDQUFRQSxDQUFTO0lBQy9ELE1BQU0sQ0FBQ29CLGtCQUFrQmUsb0JBQW9CLEdBQUduQywrQ0FBUUEsQ0FBQztJQUV6RCxNQUFNb0MsUUFBUW5DLDZDQUFNQSxDQUFtQjtJQUN2QyxNQUFNb0Msc0JBQXNCcEMsNkNBQU1BLENBQXdCO0lBQzFELE1BQU1xQyxrQkFBa0JyQyw2Q0FBTUEsQ0FBd0I7SUFDdEQsTUFBTXNDLGtCQUFrQnRDLDZDQUFNQSxD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LENBQUM7UUFDUnFDLFdBQVdZLE9BQU8sR0FBRztRQUNyQmE7UUFFQSxPQUFPO1lBQ0x6QixXQUFXWSxPQUFPLEdBQUc7WUFDckJiLGdCQUFnQmEsT0FBTyxHQUFHO1lBRTFCLHNCQUFzQjtZQUN0QjVCLFNBQVMsQ0FBQ3NCO2dCQUNSLElBQUlBLEtBQUs1QixlQUFlLEVBQUU7b0JBQ3hCMEIsSUFBSUcsZUFBZSxDQUFDRCxLQUFLNUIsZUFBZTtnQkFDMUM7Z0JBQ0EsT0FBTzRCO1lBQ1Q7WUFFQSxJQUFJVixNQUFNZ0IsT0FBTyxFQUFFO2dCQUNqQmhCLE1BQU1nQixPQUFPLENBQUNZLEtBQUssQ0FBQyxNQUFNO2dCQUMxQjVCLE1BQU1nQixPQUFPLEdBQUc7WUFDbEI7WUFFQSxJQUFJZixvQkFBb0JlLE9BQU8sRUFBRTtnQkFDL0JrQixhQUFhakMsb0JBQW9CZSxPQUFPO2dCQUN4Q2Ysb0JBQW9CZSxPQUFPLEdBQUc7WUFDaEM7WUFFQUQ7UUFDRjtJQUNGLEdBQUc7UUFBQ2M7S0FBUTtJQUVaLE9BQU87UUFDTDBCLFFBQVFwRTtRQUNSRTtRQUNBRTtRQUNBRTtRQUNBSTtRQUNBRjtRQUNBWDtJQUNGO0FBQ0YsRUFBRTtHQXJRV0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vaG9va3MvdXNlV2Vic29ja2V0LnRzeD9kZmIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFsZXJ0LFxuICBBbmFseXNpc1Jlc3VsdHMsXG4gIENvbm5lY3Rpb25TdGF0dXMsXG4gIExvZ0VudHJ5LFxuICBTdGF0dXMsXG59IGZyb20gXCJAL3R5cGluZ3MvdHlwZXNcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSBcInNvbm5lclwiO1xuXG5jb25zdCBXRUJTT0NLRVRfVVJMID0gXCJ3czovLzE5Mi4xNjguMS4yMTY6MzAwMC93c1wiO1xuY29uc3QgUkVDT05ORUNUX0RFTEFZID0gMjAwMDtcbmNvbnN0IE1BWF9SRUNPTk5FQ1RfQVRURU1QVFMgPSA1O1xuY29uc3QgUElOR19JTlRFUlZBTCA9IDMwMDAwO1xuXG4vLyBBZGQgbmV3IHR5cGVzIGZvciBpbWFnZSBoYW5kbGluZ1xuaW50ZXJmYWNlIEltYWdlTWV0YWRhdGEge1xuICB0eXBlOiBcImltYWdlXCI7XG4gIGZpbGVuYW1lOiBzdHJpbmc7XG4gIG1pbWVUeXBlOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogc3RyaW5nO1xuICBzaXplOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBFeHRlbmRlZFN0YXR1cyBleHRlbmRzIFN0YXR1cyB7XG4gIGN1cnJlbnRJbWFnZVVybDogc3RyaW5nIHwgbnVsbDtcbiAgY3VycmVudEltYWdlTWV0YWRhdGE6IEltYWdlTWV0YWRhdGEgfCBudWxsO1xuICBjdXJyZW50QW5hbHlzaXM6IEFuYWx5c2lzUmVzdWx0cyB8IG51bGw7XG59XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IEV4dGVuZGVkU3RhdHVzID0ge1xuICBzZW5zb3IxOiBmYWxzZSxcbiAgc2Vuc29yMjogZmFsc2UsXG4gIHNvbGVub2lkOiBmYWxzZSxcbiAgbGFzdFBob3RvUGF0aDogbnVsbCxcbiAgZGV2aWNlQ29ubmVjdGVkOiBmYWxzZSxcbiAgbGFzdFVwZGF0ZTogbmV3IERhdGUoKSxcbiAgZXZlbnRzOiBbXSxcbiAgY3VycmVudEltYWdlVXJsOiBudWxsLFxuICBjdXJyZW50SW1hZ2VNZXRhZGF0YTogbnVsbCxcbiAgaXNDYXB0dXJpbmdJbWFnZTogZmFsc2UsXG4gIGN1cnJlbnRBbmFseXNpczogbnVsbCxcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VXZWJTb2NrZXRNYW5hZ2VyID0gKCkgPT4ge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPEV4dGVuZGVkU3RhdHVzPih7XG4gICAgLi4uSU5JVElBTF9TVEFURSxcbiAgICBjdXJyZW50QW5hbHlzaXM6IG51bGwsXG4gIH0pO1xuICBjb25zdCBbbG9ncywgc2V0TG9nc10gPSB1c2VTdGF0ZTxMb2dFbnRyeVtdPihbXSk7XG4gIGNvbnN0IFthbGVydHMsIHNldEFsZXJ0c10gPSB1c2VTdGF0ZTxBbGVydFtdPihbXSk7XG4gIGNvbnN0IFtjb25uZWN0aW9uU3RhdHVzLCBzZXRDb25uZWN0aW9uU3RhdHVzXSA9XG4gICAgdXNlU3RhdGU8Q29ubmVjdGlvblN0YXR1cz4oXCJkaXNjb25uZWN0ZWRcIik7XG4gIGNvbnN0IFtyZWNvbm5lY3RBdHRlbXB0cywgc2V0UmVjb25uZWN0QXR0ZW1wdHNdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW2Nvbm5lY3Rpb25FcnJvciwgc2V0Q29ubmVjdGlvbkVycm9yXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG4gIGNvbnN0IFtpc0NhcHR1cmluZ0ltYWdlLCBzZXRJc0NhcHR1cmluZ0ltYWdlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCB3c1JlZiA9IHVzZVJlZjxXZWJTb2NrZXQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcmVjb25uZWN0VGltZW91dFJlZiA9IHVzZVJlZjxOb2RlSlMuVGltZW91dCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwaW5nSW50ZXJ2YWxSZWYgPSB1c2VSZWY8Tm9kZUpTLlRpbWVvdXQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaXNDb25uZWN0aW5nUmVmID0gdXNlUmVmPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgbW91bnRlZFJlZiA9IHVzZVJlZjxib29sZWFuPih0cnVlKTtcblxuICBjb25zdCBoYW5kbGVCaW5hcnlNZXNzYWdlID0gdXNlQ2FsbGJhY2soKGJsb2I6IEJsb2IpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcHJldmlvdXMgVVJMIGlmIGl0IGV4aXN0c1xuICAgICAgc2V0U3RhdGUoKHByZXYpID0+IHtcbiAgICAgICAgaWYgKHByZXYuY3VycmVudEltYWdlVXJsKSB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChwcmV2LmN1cnJlbnRJbWFnZVVybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgIGN1cnJlbnRJbWFnZVVybDogdXJsLFxuICAgICAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgc2V0SXNDYXB0dXJpbmdJbWFnZShmYWxzZSk7XG4gICAgICB0b2FzdC5zdWNjZXNzKFwiSW1hZ2UgY2FwdHVyZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaGFuZGxpbmcgaW1hZ2UgYmxvYjpcIiwgZXJyb3IpO1xuICAgICAgdG9hc3QuZXJyb3IoXCJGYWlsZWQgdG8gcHJvY2VzcyBpbWFnZVwiKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhclBpbmdJbnRlcnZhbCA9ICgpID0+IHtcbiAgICBpZiAocGluZ0ludGVydmFsUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocGluZ0ludGVydmFsUmVmLmN1cnJlbnQpO1xuICAgICAgcGluZ0ludGVydmFsUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXR1cFBpbmdJbnRlcnZhbCA9ICh3czogV2ViU29ja2V0KSA9PiB7XG4gICAgY2xlYXJQaW5nSW50ZXJ2YWwoKTtcbiAgICBwaW5nSW50ZXJ2YWxSZWYuY3VycmVudCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiBcInBpbmdcIiB9KSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlbmRpbmcgcGluZzpcIiwgZXJyb3IpO1xuICAgICAgICAgIHdzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBQSU5HX0lOVEVSVkFMKTtcbiAgfTtcblxuICBjb25zdCBjb25uZWN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghbW91bnRlZFJlZi5jdXJyZW50IHx8IGlzQ29ubmVjdGluZ1JlZi5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzQ29ubmVjdGluZ1JlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgIHNldENvbm5lY3Rpb25TdGF0dXMoXCJjb25uZWN0aW5nXCIpO1xuXG4gICAgICBjb25zdCB3cyA9IG5ldyBXZWJTb2NrZXQoV0VCU09DS0VUX1VSTCk7XG4gICAgICB3cy5iaW5hcnlUeXBlID0gXCJibG9iXCI7IC8vIEltcG9ydGFudCBmb3IgYmluYXJ5IGltYWdlIGRhdGFcbiAgICAgIHdzUmVmLmN1cnJlbnQgPSB3cztcblxuICAgICAgY29uc3QgY29ubmVjdGlvblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICAgICAgd3MuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwMCk7XG5cbiAgICAgIHdzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFtb3VudGVkUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICB3cy5jbG9zZSgxMDAwLCBcIkNvbXBvbmVudCB1bm1vdW50ZWRcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dChjb25uZWN0aW9uVGltZW91dCk7XG4gICAgICAgIHNldENvbm5lY3Rpb25TdGF0dXMoXCJjb25uZWN0ZWRcIik7XG4gICAgICAgIHNldFJlY29ubmVjdEF0dGVtcHRzKDApO1xuICAgICAgICBzZXRDb25uZWN0aW9uRXJyb3IoXCJcIik7XG4gICAgICAgIHNldHVwUGluZ0ludGVydmFsKHdzKTtcbiAgICAgICAgaXNDb25uZWN0aW5nUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgdG9hc3Quc3VjY2VzcyhcIkNvbm5lY3RlZCB0byBzeXN0ZW1cIik7XG4gICAgICB9O1xuXG4gICAgICB3cy5vbm1lc3NhZ2UgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIEhhbmRsZSBiaW5hcnkgbWVzc2FnZSAoaW1hZ2UgZGF0YSlcbiAgICAgICAgICBpZiAoZXZlbnQuZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIGhhbmRsZUJpbmFyeU1lc3NhZ2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50LmRhdGEgPT09IFwicG9uZ1wiKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBldmVudERhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmF3IGRhdGFcIiwgZXZlbnREYXRhKTtcblxuICAgICAgICAgIGlmICghZXZlbnREYXRhLnR5cGUgJiYgdHlwZW9mIGV2ZW50RGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgc2V0U3RhdGUoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgIC4uLmV2ZW50RGF0YSxcbiAgICAgICAgICAgICAgbGFzdFVwZGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzd2l0Y2ggKGV2ZW50RGF0YS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaW1hZ2VNZXRhZGF0YVwiOiB7XG4gICAgICAgICAgICAgIHNldFN0YXRlKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgY3VycmVudEltYWdlTWV0YWRhdGE6IGV2ZW50RGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgc2V0SXNDYXB0dXJpbmdJbWFnZSh0cnVlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwic3RhdGVVcGRhdGVcIjoge1xuICAgICAgICAgICAgICBzZXRTdGF0ZSgocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIC4uLmV2ZW50RGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwic3lzdGVtTG9nXCI6IHtcbiAgICAgICAgICAgICAgc2V0TG9ncygocHJldikgPT4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLFxuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgbGV2ZWw6IGV2ZW50RGF0YS5sZXZlbCB8fCBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGV2ZW50RGF0YS5kYXRhLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICBzb3VyY2U6IGV2ZW50RGF0YS5zb3VyY2UgfHwgXCJzeXN0ZW1cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJhbGVydFwiOiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0FsZXJ0ID0ge1xuICAgICAgICAgICAgICAgIGlkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBsZXZlbDogZXZlbnREYXRhLmxldmVsIHx8IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGV2ZW50RGF0YS5kYXRhLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgYWNrbm93bGVkZ2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgc2V0QWxlcnRzKChwcmV2KSA9PiBbbmV3QWxlcnQsIC4uLnByZXZdKTtcblxuICAgICAgICAgICAgICAvLyBTaG93IHRvYXN0IGZvciBuZXcgYWxlcnRzXG4gICAgICAgICAgICAgIGlmIChldmVudERhdGEubGV2ZWwgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHRvYXN0LmVycm9yKGV2ZW50RGF0YS5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvYXN0Lndhcm5pbmcoZXZlbnREYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiYW5hbHlzaXNSZXN1bHRzXCI6IHtcbiAgICAgICAgICAgICAgc2V0U3RhdGUoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICBjdXJyZW50QW5hbHlzaXM6IGV2ZW50RGF0YS5kYXRhIGFzIEFuYWx5c2lzUmVzdWx0cyxcbiAgICAgICAgICAgICAgICBsYXN0VXBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcHJvY2Vzc2luZyBXZWJTb2NrZXQgbWVzc2FnZTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB3cy5vbmNsb3NlID0gKGV2ZW50OiBDbG9zZUV2ZW50KSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dChjb25uZWN0aW9uVGltZW91dCk7XG4gICAgICAgIGNsZWFyUGluZ0ludGVydmFsKCk7XG5cbiAgICAgICAgaWYgKCFtb3VudGVkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBzZXRDb25uZWN0aW9uU3RhdHVzKFwiZGlzY29ubmVjdGVkXCIpO1xuICAgICAgICBpc0Nvbm5lY3RpbmdSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB0b2FzdC5lcnJvcihcIkRpc2Nvbm5lY3RlZCBmcm9tIHN5c3RlbVwiKTtcblxuICAgICAgICBpZiAoZXZlbnQuY29kZSAhPT0gMTAwMCAmJiBldmVudC5jb2RlICE9PSAxMDA1KSB7XG4gICAgICAgICAgaWYgKHJlY29ubmVjdEF0dGVtcHRzIDwgTUFYX1JFQ09OTkVDVF9BVFRFTVBUUykge1xuICAgICAgICAgICAgcmVjb25uZWN0VGltZW91dFJlZi5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChtb3VudGVkUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBzZXRSZWNvbm5lY3RBdHRlbXB0cygocHJldikgPT4gcHJldiArIDEpO1xuICAgICAgICAgICAgICAgIGNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgUkVDT05ORUNUX0RFTEFZKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0Q29ubmVjdGlvbkVycm9yKFxuICAgICAgICAgICAgICBcIk1heGltdW0gcmVjb25uZWN0aW9uIGF0dGVtcHRzIHJlYWNoZWQuIFBsZWFzZSByZWZyZXNoIHRoZSBwYWdlLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgd3Mub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFtb3VudGVkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgc2V0Q29ubmVjdGlvblN0YXR1cyhcImRpc2Nvbm5lY3RlZFwiKTtcbiAgICAgICAgaXNDb25uZWN0aW5nUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghbW91bnRlZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBzZXRDb25uZWN0aW9uRXJyb3IoXG4gICAgICAgIFwiRmFpbGVkIHRvIGVzdGFibGlzaCBXZWJTb2NrZXQgY29ubmVjdGlvbi4gUGxlYXNlIGNoZWNrIHlvdXIgbmV0d29yayBjb25uZWN0aW9uLlwiXG4gICAgICApO1xuICAgICAgaXNDb25uZWN0aW5nUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH0sIFtyZWNvbm5lY3RBdHRlbXB0cywgaGFuZGxlQmluYXJ5TWVzc2FnZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbW91bnRlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25uZWN0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbW91bnRlZFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICBpc0Nvbm5lY3RpbmdSZWYuY3VycmVudCA9IGZhbHNlO1xuXG4gICAgICAvLyBDbGVhbiB1cCBpbWFnZSBVUkxzXG4gICAgICBzZXRTdGF0ZSgocHJldikgPT4ge1xuICAgICAgICBpZiAocHJldi5jdXJyZW50SW1hZ2VVcmwpIHtcbiAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXYuY3VycmVudEltYWdlVXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAod3NSZWYuY3VycmVudCkge1xuICAgICAgICB3c1JlZi5jdXJyZW50LmNsb3NlKDEwMDAsIFwiQ29tcG9uZW50IHVubW91bnRpbmdcIik7XG4gICAgICAgIHdzUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb25uZWN0VGltZW91dFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChyZWNvbm5lY3RUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgICAgICByZWNvbm5lY3RUaW1lb3V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBjbGVhclBpbmdJbnRlcnZhbCgpO1xuICAgIH07XG4gIH0sIFtjb25uZWN0XSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXM6IHN0YXRlLFxuICAgIGxvZ3MsXG4gICAgYWxlcnRzLFxuICAgIGNvbm5lY3Rpb25TdGF0dXMsXG4gICAgY29ubmVjdGlvbkVycm9yLFxuICAgIHJlY29ubmVjdEF0dGVtcHRzLFxuICAgIGlzQ2FwdHVyaW5nSW1hZ2UsXG4gIH07XG59O1xuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJ0b2FzdCIsIldFQlNPQ0tFVF9VUkwiLCJSRUNPTk5FQ1RfREVMQVkiLCJNQVhfUkVDT05ORUNUX0FUVEVNUFRTIiwiUElOR19JTlRFUlZBTCIsIklOSVRJQUxfU1RBVEUiLCJzZW5zb3IxIiwic2Vuc29yMiIsInNvbGVub2lkIiwibGFzdFBob3RvUGF0aCIsImRldmljZUNvbm5lY3RlZCIsImxhc3RVcGRhdGUiLCJEYXRlIiwiZXZlbnRzIiwiY3VycmVudEltYWdlVXJsIiwiY3VycmVudEltYWdlTWV0YWRhdGEiLCJpc0NhcHR1cmluZ0ltYWdlIiwiY3VycmVudEFuYWx5c2lzIiwidXNlV2ViU29ja2V0TWFuYWdlciIsInN0YXRlIiwic2V0U3RhdGUiLCJsb2dzIiwic2V0TG9ncyIsImFsZXJ0cyIsInNldEFsZXJ0cyIsImNvbm5lY3Rpb25TdGF0dXMiLCJzZXRDb25uZWN0aW9uU3RhdHVzIiwicmVjb25uZWN0QXR0ZW1wdHMiLCJzZXRSZWNvbm5lY3RBdHRlbXB0cyIsImNvbm5lY3Rpb25FcnJvciIsInNldENvbm5lY3Rpb25FcnJvciIsInNldElzQ2FwdHVyaW5nSW1hZ2UiLCJ3c1JlZiIsInJlY29ubmVjdFRpbWVvdXRSZWYiLCJwaW5nSW50ZXJ2YWxSZWYiLCJpc0Nvbm5lY3RpbmdSZWYiLCJtb3VudGVkUmVmIiwiaGFuZGxlQmluYXJ5TWVzc2FnZSIsImJsb2IiLCJ1cmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJwcmV2IiwicmV2b2tlT2JqZWN0VVJMIiwic3VjY2VzcyIsImVycm9yIiwiY29uc29sZSIsImNsZWFyUGluZ0ludGVydmFsIiwiY3VycmVudCIsImNsZWFySW50ZXJ2YWwiLCJzZXR1cFBpbmdJbnRlcnZhbCIsIndzIiwic2V0SW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwiV2ViU29ja2V0IiwiT1BFTiIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwidHlwZSIsImNsb3NlIiwiY29ubmVjdCIsImJpbmFyeVR5cGUiLCJjb25uZWN0aW9uVGltZW91dCIsInNldFRpbWVvdXQiLCJvbm9wZW4iLCJjbGVhclRpbWVvdXQiLCJvbm1lc3NhZ2UiLCJldmVudCIsImRhdGEiLCJCbG9iIiwiZXZlbnREYXRhIiwicGFyc2UiLCJsb2ciLCJpZCIsImNyeXB0byIsInJhbmRvbVVVSUQiLCJ0aW1lc3RhbXAiLCJsZXZlbCIsIm1lc3NhZ2UiLCJzb3VyY2UiLCJuZXdBbGVydCIsImFja25vd2xlZGdlZCIsIndhcm5pbmciLCJvbmNsb3NlIiwiY29kZSIsIm9uZXJyb3IiLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./hooks/useWebsocket.tsx\n"));

/***/ })

});