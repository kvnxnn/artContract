import "@/styles/app.scss";
import Layout from "@/pageComponents/components/Layout";
import {  ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "@/context";

const customChain = {
  chainId: 80002,
  rpc: [
    "https://polygon-amoy.g.alchemy.com/v2/KRQSFhBCgOcvo77PjgIQhMmL8kaxCglC"
  ],

  nativeCurrency: {
    decimals: 18,
    name: "Matic",
    symbol: "MATIC"
  },
  shortName: "Polygon Amoy",
  slug: "polygon-amoy",
  testnet: true,
  chain: "Polygon",
  name: "Polygon Amoy Testnet"
};

// Create the client with your clientId
const clientId =
  "c0e181c6d5402a39a264ad9bce561132";
// export const client = createThirdwebClient({
//   clientId: clientId
// });


export default function App({ Component, pageProps }) {
  
  return (
    <ThirdwebProvider clientId={clientId} activeChain={customChain}>
      <StateContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
