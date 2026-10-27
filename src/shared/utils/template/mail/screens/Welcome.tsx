import { Section, Text } from "@react-email/components";
import { Layout } from "../components/Layout";

type Props = {
    appName: string;
    name: string;
    logoUrl: string;
    heroUrl: string;
    unsubscribeUrl?: string;
};

export default function WelcomeEmail({
    appName,
    name,
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
                    Bem-vindo, <span style={{ color: "#ff8d00", fontWeight: 500 }}>{name}</span>!
                </Text>
            </Section>

            <Section style={{ padding: "0 32px", textAlign: "center" }}>
                <Text style={{ fontSize: 15, lineHeight: "22px", color: "#666" }}>
                    Sua conta no {appName} está pronta. Em breve você receberá mais novidades e dicas para aproveitar tudo que preparamos.
                </Text>
            </Section>

            <Section style={{ padding: "0 32px" }}>
                <Text style={{ fontSize: 13, lineHeight: "18px", color: "#ff9966", textAlign: "center" }}>
                    Se pintar qualquer dúvida, é só responder este e-mail ou falar com o nosso suporte. Estamos por aqui para te ajudar.
                </Text>
            </Section>
        </Layout>
    );
}
