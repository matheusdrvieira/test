import axios from "axios";

const STRIPE_URL = "https://connect.stripe.com"

const stripeClient = axios.create({
  baseURL: STRIPE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export type StripeOAuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
  accountId: string;
  expiresIn: string
};

const SCOPES = "read_write";
type StripeOAuthFlow = "onboarding" | "default";

export class StripeService {
  async start(
    userId: string,
    flow: StripeOAuthFlow = "default"
  ): Promise<{ url: string }> {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.STRIPE_CLIENT_ID!,
      scope: SCOPES,
      redirect_uri: process.env.STRIPE_REDIRECT_URI!,
      state: JSON.stringify({ userId, flow }),
    });

    return {
      url: `${STRIPE_URL}/oauth/authorize?${params.toString()}`
    }
  }

  async callback(code: string): Promise<StripeOAuthTokenResponse> {
    try {
      const payload = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.STRIPE_CLIENT_ID!,
        client_secret: process.env.STRIPE_CLIENT_SECRET!,
        redirect_uri: process.env.STRIPE_REDIRECT_URI!,
      });

      const { data } = await stripeClient.post("/oauth/token", payload);

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        accountId: data.stripe_user_id,
        expiresIn: data.expires_in
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.message);
      }

      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Erro ao autenticar com a Stripe.");
    }
  }
}
