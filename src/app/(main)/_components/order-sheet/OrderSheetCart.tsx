import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetEmptyCard } from "./OrderSheetEmptyCard";
import { OrderSheetFoodItem } from "./OrderSheetFoodItem";
import { useContext } from "react";
import { FoodCartContext } from "@/provider/FoodProvider";

// export const cartData = [
//   {
//     food: {
//       _id: "1",
//       foodName: "foodName",
//       price: 1200,
//       image: "",
//       ingredients: "ingredients ingredients",
//       categoryId: {
//         _id: "1",
//         categoryName: "categoryName",
//         createdAt: "2025-06-27T17:00:00+08:00",
//         updatedAt: "2025-06-22T17:00:00+08:00",
//       },
//     },
//     quantity: 1,
//   },
// ];
export const OrderSheetCart = () => {
  const { foodCart } = useContext(FoodCartContext);
  const renderFoodCard = () => {
    if (foodCart?.length) {
      return foodCart?.map((item) => {
        return (
          <OrderSheetFoodItem
            key={item.price}
            food={item.foodName}
            quantity={item.quantity}
          />
        );
      });
    }
    return <OrderSheetEmptyCard />;
  };

  return (
    <Card className="h-[400px] overflow-hidden pb-4">
      <CardHeader className="p-4">
        <CardTitle>My cart</CardTitle>
      </CardHeader>

      <CardContent className="h-full p-4 pb-10 overflow-scroll">
        {renderFoodCard()}
      </CardContent>
    </Card>
  );
};
