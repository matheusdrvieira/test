import { pkceChallenge, randomVerifier, signState, verifyState } from "@/shared/utils/oauth-helpers";
import { popOAuthState, putOAuthState } from "@/shared/utils/oauth-state";
import axios from "axios";

const MERCADOPAGO_AUTH_URL = "https://auth.mercadopago.com";
const MERCADOPAGO_API_URL = "https://api.mercadopago.com";

const mercadopagoClient = axios.create({
  baseURL: MERCADOPAGO_API_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export type MercadoPagoOAuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
  accountId: string;
  expiresIn: string;
  userId: string;
};

export class MercadoPagoService {
  async start(userId: string): Promise<{ url: string }> {
    const intentId = crypto.randomUUID();
    const codeVerifier = randomVerifier(96);
    const codeChallenge = await pkceChallenge(codeVerifier);

    putOAuthState(intentId, {
      userId,
      provider: "mercadopago",
      codeVerifier,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
    });

    const state = await signState(process.env.OAUTH_STATE_SECRET!, {
      intentId,
      iat: Date.now(),
    });

    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.MERCADOPAGO_CLIENT_ID!,
      redirect_uri: process.env.MERCADOPAGO_REDIRECT_URI!,
      platform_id: "mp",
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256"
    });

    return { url: `${MERCADOPAGO_AUTH_URL}/authorization?${params.toString()}` };
  }

  async callback(code: string, state: string): Promise<MercadoPagoOAuthTokenResponse> {
    const parsed = await verifyState(process.env.OAUTH_STATE_SECRET!, state);
    if (!parsed?.intentId) throw new Error("Invalid state");

    const st = popOAuthState(parsed.intentId);
    if (!st) throw new Error("OAuth state expired/invalid");

    const payload = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.MERCADOPAGO_CLIENT_ID!,
      client_secret: process.env.MERCADOPAGO_CLIENT_SECRET!,
      code,
      redirect_uri: process.env.MERCADOPAGO_REDIRECT_URI!,
    });

    if (!st.codeVerifier) {
      throw new Error("Missing code_verifier. Restart Mercado Pago OAuth.");
    }

    payload.set("code_verifier", st.codeVerifier);

    try {
      const { data } = await mercadopagoClient.post("/oauth/token", payload);

      return {
        userId: st.userId,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        accountId: String(data.user_id),
        expiresIn: String(data.expires_in),
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.message);
      }

      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Erro ao autenticar com o Mercado Pago.");
    }
  }
}
