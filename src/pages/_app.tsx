import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="p-4 md:mx-auto md:w-[90%]">
      <NavBar />
      <Component {...pageProps} />
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default trpc.withTRPC(MyApp);
