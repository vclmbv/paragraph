/* constructor */
export interface Config {
  placeholder?: string;
  blank?: boolean;
}
export interface Data {
  text: string;
}
export interface Constructor {
  api: API;
  readOnly: boolean;
  config: Config;
  data: Data;
}
export interface CSS {
  block: string;
  container: string;
}

export type UI = HTMLDivElement;