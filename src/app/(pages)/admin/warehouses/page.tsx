import React from "react";
import AddWarehouseButton from "./_components/add-warehouse-button";
import WarehouseSheet from "./_components/warehouse-sheet";
import DisplayWarehouseData from "./_components/display-warehouse-data";

type Props = {};

export default function WarehousesPage({}: Props) {
  return (
    <div>
      <AddWarehouseButton />
      <WarehouseSheet />
      <div>
        <DisplayWarehouseData />
      </div>
    </div>
  );
}
