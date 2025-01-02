import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout"; // Corrected typo: DefaultLaout -> DefaultLayout
import ProductsCard from "@/components/Products/ProductsCard";
import { PRODUCTS } from "@/const/product";
const ProductDisplayPage = async () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Daftar Produk" />

        <div className="min-h-screen bg-gray-100 dark:bg-[#03000d19]">
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((items) => (
                <ProductsCard key={items.id} productsData={items} />  // Type is inferred from Movie interface
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDisplayPage;
