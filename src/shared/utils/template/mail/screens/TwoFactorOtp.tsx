import { Section, Text } from "@react-email/components";
import { Layout } from "../components/Layout";

type Props = {
    appName: string;
    name: string;
    otp?: string;
    logoUrl: string;
    heroUrl: string;
    unsubscribeUrl?: string;
};

export default function TwoFactorOtpEmail({
    appName,
    name,
    otp,
    logoUrl,
    heroUrl,
    unsubscribeUrl,
}: Props) {
    return (
        <Layout
            appName={appName}
            logoUrl={logoUrl}
            heroUrl={heroUrl}
            unsubscribeUrl={unsubscribeUrl}
            maxWidth={400}
        >
            <Section style={{ padding: "0 32px", textAlign: "center" }}>
                <Text style={{ fontSize: 20, lineHeight: "28px", color: "#353535" }}>
                    Olá <span style={{ color: "#ff8d00", fontWeight: 500 }}>{name}</span>, use este código para continuar.
                </Text>
            </Section>

            <Section style={{ padding: "0 32px", textAlign: "center" }}>
                <Text style={{ fontSize: 15, lineHeight: "22px", color: "#666" }}>
                    Recebemos uma tentativa de login no {appName}. Digite o código abaixo para concluir a autenticação em dois fatores.
                </Text>
            </Section>

            <Section style={{ padding: "0 32px", textAlign: "center" }}>
                <Text
                    style={{
                        display: "inline-block",
                        margin: "0",
                        padding: "12px 20px",
                        borderRadius: 8,
                        border: "1px solid #ffd7ae",
                        backgroundColor: "#fff5e9",
                        fontSize: 28,
                        lineHeight: "32px",
                        letterSpacing: 8,
                        fontWeight: 700,
                        color: "#ff8d00",
                    }}
                >
                    {(otp ?? "").slice(0, 6) || "------"}
                </Text>
            </Section>

            <Section style={{ padding: "0 32px" }}>
                <Text style={{ fontSize: 13, lineHeight: "18px", color: "#ff9966", textAlign: "center" }}>
                    Este código expira em poucos minutos. Se você não solicitou este acesso, ignore este e-mail.
                </Text>
            </Section>
        </Layout>
    );
}
