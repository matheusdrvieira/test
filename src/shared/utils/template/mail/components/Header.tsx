import { Img } from "@react-email/components";

type HeaderProps = {
    logoUrl: string;
};

export function Header({ logoUrl }: HeaderProps) {
    return <Img src={logoUrl} width={80} alt="Logo" style={{ display: "block", margin: "0 auto", marginBottom: 12 }} />;
}
