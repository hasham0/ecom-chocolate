import DisplayData from "./display-data";
import ProductSheet from "./product-sheet";
import AddProductButton from "./add-product-button";

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
