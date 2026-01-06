export interface Settings {
  theme: "system" | "light" | "dark";
  defaultExpiration: number | string;
  defaultViewLimit: number | string;
  defaultAllowDownload: boolean;
  defaultPassword?: string;
  watermarkText?:string;
}
