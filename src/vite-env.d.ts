/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_SERVER_ADDRESS: string
    readonly VITE_BUILD_MODE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}