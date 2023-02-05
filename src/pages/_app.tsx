import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="p-4 md:mx-auto md:w-[90%]">
        <NavBar />
        <Component {...pageProps} />
        <div className="mt-24">
          <Footer />
        </div>
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
