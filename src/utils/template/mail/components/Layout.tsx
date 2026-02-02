import { Body, Container, Html, Section } from "@react-email/components";
import * as React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";

type LayoutProps = React.PropsWithChildren<{
    appName: string;
    logoUrl: string;
    heroUrl: string;
    unsubscribeUrl?: string;
    maxWidth?: number;
}>;

export function Layout({
    appName,
    logoUrl,
    heroUrl,
    unsubscribeUrl,
    maxWidth = 400,
    children,
}: LayoutProps) {
    return (
        <Html>
            <Body
                style={{
                    backgroundColor: "#f1eff2",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <Section
                    style={{
                        maxWidth,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: 12,
                        paddingBottom: 12
                    }}
                >
                    <Header logoUrl={logoUrl} />

                    <Container
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: 12,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            paddingTop: 8,
                            paddingBottom: 8,
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <Hero heroUrl={heroUrl} />
                        {children}
                    </Container>
                    <Footer appName={appName} unsubscribeUrl={unsubscribeUrl} />
                </Section>
            </Body>
        </Html>
    );
}
