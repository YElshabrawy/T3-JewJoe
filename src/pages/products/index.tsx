import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import ProductItem2 from "../../components/ProductItem2";
import Search from "../../components/Search";
import { trpc } from "../../utils/trpc";

const ProductPage: NextPage = () => {
  const { data: allProducts } = trpc.product.getAllProducts.useQuery();
  return (
    <>
      <Head>
        <title>JoeJew - Products</title>
      </Head>
      <main className="mt-28">
        <h1 className="text-[28px] font-medium">Shop The Latest</h1>
        <div className="flex">
          <div className="aside hidden w-[20%] md:block ">
            <Search isOutlined={true} />
          </div>

          <div className="mx-auto w-full px-4">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {allProducts?.map((product) => {
                return <ProductItem2 key={product.id} product={product} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
