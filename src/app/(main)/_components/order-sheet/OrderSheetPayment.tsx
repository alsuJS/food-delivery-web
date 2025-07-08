import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { FoodCartContext } from "@/provider/FoodProvider";

export const OrderSheetPayment = ({ openModal }: { openModal: () => void }) => {
  const { foodCart } = useContext(FoodCartContext);
  const totalPrice = foodCart.reduce((accumulator, currentValue) => {
    const total = currentValue.price * currentValue.quantity;

    return total;
  }, 0);
  console.log(totalPrice);
  return (
    <Card className="mt-6">
      <CardHeader className="p-4 ">
        <CardTitle>Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Items</p>
          <p className="font-bold">{totalPrice}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Shipping</p>
          <p className="font-bold">12₮</p>
        </div>

        <SidebarDashLine />

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Total</p>
          <p className="font-bold">{totalPrice}₮</p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button size="lg" className="w-full bg-red-500 rounded-full">
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
