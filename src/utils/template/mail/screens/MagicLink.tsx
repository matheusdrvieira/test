import { Button, Section, Text } from "@react-email/components";
import { Layout } from "../components/Layout";

type Props = {
    appName: string;
    name: string;
    url?: string;
    logoUrl: string;
    heroUrl: string;
    unsubscribeUrl?: string;
};

export default function MagicLinkEmail({
    appName,
    name,
    url,
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
                    Olá <span style={{ color: "#ff8d00", fontWeight: 500 }}>{name}</span>, seu acesso está pronto!
                </Text>
            </Section>

            <Section style={{ padding: "0 32px", textAlign: "center" }}>
                <Text style={{ fontSize: 15, lineHeight: "22px", color: "#666" }}>
                    Clique no botão abaixo para entrar no {appName} sem precisar de senha. O link expira em alguns minutos.
                </Text>
            </Section>

            <Section style={{ textAlign: "center" }}>
                <Button
                    href={url}
                    style={{
                        display: "inline-block",
                        backgroundColor: "#ff8d00",
                        color: "#ffffff",
                        fontSize: 16,
                        padding: "12px 32px",
                        borderRadius: 8,
                        textDecoration: "none",
                    }}
                >
                    Acessar com o magic link
                </Button>
            </Section>

            <Section style={{ padding: "0 32px" }}>
                <Text style={{ fontSize: 13, lineHeight: "18px", color: "#ff9966", textAlign: "center" }}>
                    Caso você não tenha solicitado este link, basta ignorar este e-mail.
                </Text>
            </Section>
        </Layout>
    );
}
