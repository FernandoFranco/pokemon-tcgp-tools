export interface Google {
  accounts: Accounts;
}

export interface Accounts {
  oauth2: OAuth2;
  id: Id;
}

export interface OAuth2 {
  initTokenClient: (config: TokenClientConfig) => TokenClient;
}

export interface TokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: { error?: Error; access_token?: string }) => void;
}

export interface TokenClient {
  requestAccessToken: (options: { prompt: string }) => void;
  callback: (response: TokenClientResponse) => void;
}

export interface TokenClientResponse {
  error?: Error;
  access_token?: string;
}

export interface Id {
  initialize: (config: IdConfig) => void;
  prompt: () => void;
  renderButton: (element: HTMLElement, options: RenderButtonOptions) => void;
}

export interface IdConfig {
  client_id: string;
  scope: string;
  auto_select: boolean;
  callback: (response: { credential?: string }) => void;
}

export interface RenderButtonOptions {
  theme: string;
  size: string;
  shape: string;
}
