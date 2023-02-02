import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ShopLatest from "../components/ShopLatest";
import Carousel from "../components/Carousel";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>JewJoe</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Carousel />
        <ShopLatest />
      </main>
    </>
  );
};

export default Home;
