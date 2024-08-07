import React from "react";
import AddDeliveryPersonButton from "./_components/add-delivery-person-button";
import DeliveryPersonSheet from "./_components/delivery-person-sheet";
import DisplayDeliveryPersonData from "./_components/display-delivery-person-data";

type Props = {};

export default function DeliveryPersonsPage({}: Props) {
  return (
    <div>
      <AddDeliveryPersonButton />
      <DeliveryPersonSheet />
      <div>
        <DisplayDeliveryPersonData />
      </div>
    </div>
  );
}
