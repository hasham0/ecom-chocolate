import React from "react";
import AddInventoryButton from "./_components/add-inevtory-button";
import DisplayInventoryData from "./_components/display-inventory-data";
import InventorySheet from "./_components/inventory-sheet";

type Props = {};

export default function InventriesPage({}: Props) {
  return (
    <div>
      <AddInventoryButton />
      <InventorySheet />
      <div>
        <DisplayInventoryData />
      </div>
    </div>
  );
}
