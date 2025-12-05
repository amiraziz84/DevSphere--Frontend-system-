/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Agar future me aur env variables hon to yahan add karein
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
