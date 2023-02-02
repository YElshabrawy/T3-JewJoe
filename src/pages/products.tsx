import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import ProductItem2 from "../components/ProductItem2";
import { trpc } from "../utils/trpc";

const ProductPage: NextPage = () => {
  const { data: allProducts } = trpc.product.getAllProducts.useQuery();
  return (
    <>
      <Head>
        <title>JoeJew - Products</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-6">
        <h1 className="text-h5 text-[20px]">Products</h1>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {allProducts?.map((product) => {
              return <ProductItem2 key={product.id} product={product} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
