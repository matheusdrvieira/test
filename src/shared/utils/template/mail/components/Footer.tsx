import { Text } from "@react-email/components";

type FooterProps = {
    appName: string;
    unsubscribeUrl?: string;
};

export function Footer({ appName, unsubscribeUrl }: FooterProps) {
    return (
        <>
            <Text style={{ fontSize: 12, color: "#a5a8ae", textAlign: "center" }}>
                Atenciosamente, Equipe {appName}
            </Text>

            {unsubscribeUrl && (
                <a
                    href={unsubscribeUrl}
                    style={{ color: "#cacaca", fontSize: 12, textDecoration: "underline", display: 'block', textAlign: "center" }}
                >
                    Cancelar inscrição
                </a>
            )}
        </>
    );
}
