import { WavyBackground } from "@/components/wavy-background";

export default function Layout({children}) {
  return (
      <WavyBackground>
        <main>{children}</main>
      </WavyBackground>
  );
}