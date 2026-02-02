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

export default function RegisterEmail({
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
                    Olá <span style={{ color: "#ff8d00", fontWeight: 500 }}>{name}</span>, bem-vindo(a)!
                </Text>
            </Section>

            <Section style={{ padding: "0 32px", textAlign: "center" }}>
                <Text style={{ fontSize: 15, lineHeight: "22px", color: "#666" }}>
                    Estamos quase lá. Para ativar sua conta e completar seu cadastro, clique no botão abaixo:
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
                    Ativar conta
                </Button>
            </Section>

            <Section style={{ padding: "0 32px" }}>
                <Text style={{ fontSize: 13, lineHeight: "18px", color: "#ff9966", textAlign: "center" }}>
                    Obs: se você não solicitou este cadastro, por favor ignore este e-mail.
                </Text>
            </Section>
        </Layout>
    );
}
