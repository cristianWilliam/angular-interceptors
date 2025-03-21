export interface MissaoHeroiLoginRequest {
    heroi: string
};

export interface MissaoHeroiLoginResponse {
    token: string,
    refreshToken: string
};