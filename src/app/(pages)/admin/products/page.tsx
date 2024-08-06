import ProductSheet from "./_components/product-sheet";
import AddProductButton from "./_components/add-product-button";
import DisplayProductData from "./_components/display-product-data";

type Props = {};

export default function ProductsPage({}: Props) {
  return (
    <div>
      <AddProductButton />
      <ProductSheet />
      <div>
        <DisplayProductData />
      </div>
    </div>
  );
}
