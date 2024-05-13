import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import AskAIButton from "@/components/Header/AskAI";

const inter = Inter({ subsets: ["latin"] });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className={inter.className}>
            <Component {...pageProps} />
            <div className="fixed z-50 bottom-7 right-5">
              <AskAIButton />
            </div>
          </div>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
