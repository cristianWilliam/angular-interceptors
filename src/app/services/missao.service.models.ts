export interface MissaoHeroiLoginRequest {
    heroi: string
};

export interface MissaoHeroiRefreshTokenRequest {
    refreshToken: string
}

export interface MissaoHeroiLoginResponse {
    token: string,
    refreshToken: string
};

