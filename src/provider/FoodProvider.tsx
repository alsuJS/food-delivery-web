"use client";
import { createContext, useState } from "react";

export const FoodCartContext = createContext({
  foodCart: [
    {
      foodName: "testname",
      price: 100,
      quantity: 1,
    },
  ],
  setFoodCart: (
    foodCart: [
      {
        foodName: string;
        price: number;
        quantity: number;
      }
    ]
  ) => {},
});

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<
  {
    foodName:string;
    price:number;
    quantity:number;
  }[]
  >([
    {
    foodName: "testname",
    price: 100,
    quantity: 1,
  },
]);
  return (
    <FoodCartContext.Provider value={{ foodCart, setFoodCart }}>
      {children}
    </FoodCartContext.Provider>
  );
}
