export type Game = {
  appid: string;
  name: string;
  coverId: string;
};

export type GameConfig = {
  name: string;
  has_denuvo: boolean;
  save_path: string;
  needs_seamless_mod?: boolean;
  config_template?: string;
};

export type GameState = {
  isDeployed: boolean;
  nickname: string;
  steamId: string;
  backupPath: string;
  backupFrequency: number;
};
