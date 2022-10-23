/// <reference types="vite/client" />
import type { ContextBridgeApi } from "../electron/preload/index";


declare global {
    interface Window {
        api: ContextBridgeApi
    }
}