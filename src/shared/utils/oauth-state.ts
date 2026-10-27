type OAuthState = {
    userId: string;
    provider: "mercadolivre" | "mercadopago";
    codeVerifier?: string;
    expiresAt: number;
};

const store = new Map<string, OAuthState>();

export function putOAuthState(id: string, value: OAuthState) {
    store.set(id, value);
}

export function popOAuthState(id: string) {
    const v = store.get(id);
    store.delete(id);
    if (!v) return null;
    if (Date.now() > v.expiresAt) return null;
    return v;
}
