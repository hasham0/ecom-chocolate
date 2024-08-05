import { Button } from "@/components/ui/button";
import DisplayData from "./display-data";
import ProductSheet from "./product-sheet";

type Props = {};

export default function ProductsPage({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="p-2 text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"}>Add Product</Button>
        <ProductSheet />
      </div>
      <div>
        <DisplayData />
      </div>
    </div>
  );
}
