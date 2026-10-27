function base64url(bytes: Uint8Array) {
    return Buffer.from(bytes)
        .toString("base64")
        .replaceAll("+", "-")
        .replaceAll("/", "_")
        .replaceAll("=", "");
}

export function randomVerifier(len = 64) {
    const bytes = crypto.getRandomValues(new Uint8Array(len));
    return base64url(bytes).slice(0, Math.max(43, Math.min(128, len)));
}

export async function pkceChallenge(verifier: string) {
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
    return base64url(new Uint8Array(hash));
}

export async function signState(secret: string, payload: Record<string, unknown>) {
    const data = base64url(new TextEncoder().encode(JSON.stringify(payload)));

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
    return `${data}.${base64url(new Uint8Array(sig))}`;
}

export async function verifyState(secret: string, state: string) {
    const [data, sig] = state.split(".");
    if (!data || !sig) return null;

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
    );

    const ok = await crypto.subtle.verify(
        "HMAC",
        key,
        Buffer.from(sig.replaceAll("-", "+").replaceAll("_", "/"), "base64"),
        new TextEncoder().encode(data)
    );

    if (!ok) return null;

    const json = Buffer.from(data.replaceAll("-", "+").replaceAll("_", "/"), "base64").toString("utf8");
    return JSON.parse(json) as any;
}
