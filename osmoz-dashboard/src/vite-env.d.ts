/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ATTIO_API_KEY: string;
  readonly VITE_DASHBOARD_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
