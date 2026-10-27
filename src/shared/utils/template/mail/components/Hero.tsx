import { Img } from "@react-email/components";

type HeroProps = {
    heroUrl: string;
};

export function Hero({ heroUrl }: HeroProps) {
    return <Img src={heroUrl} width={300} alt="Ilustração" style={{ display: "block", margin: "0 auto" }} />;
}
