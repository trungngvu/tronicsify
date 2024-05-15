import GridCategory from "./GridCategory";

const CategoriesProduct = ({ products }) => {
  return (
    <div className="relative z-10 grid grid-flow-row-dense gap-4 p-4 -mt-16 md:grid-cols-4 sm:-mt-32 md:-mt-48 lg:-mt-80 bg-gradient-to-t from-gray-100 to-transparent">
      <GridCategory category="cpu" products={products} gridCols={2} />
      <GridCategory category="gpu" products={products} gridCols={2} />
      <GridCategory category="ram" products={products} gridCols={2} />
      <GridCategory category="main" products={products} gridCols={2} />
    </div>
  );
};

export default CategoriesProduct;
