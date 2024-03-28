import { WavyBackground } from "@/components/wavy-background";

export default function Layout({children}) {
  return (
      //attempt to figure out how this works
      <WavyBackground>
        <main>{children}</main>
      </WavyBackground>
  );
}