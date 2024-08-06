import DisplayData from "./_components/display-data";
import ProductSheet from "./_components/product-sheet";
import AddProductButton from "./_components/add-product-button";

type Props = {};

export default function ProductsPage({}: Props) {
  return (
    <div>
      <AddProductButton />
      <ProductSheet />
      <div>
        <DisplayData />
      </div>
    </div>
  );
}
