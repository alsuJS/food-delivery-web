"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type FoodCartContextType = {
  foodCart: {
    foodName: string;
    price: number;
    quantity: number;
  }[];
  setFoodCart: Dispatch<
    SetStateAction<
      {
        foodName: string;
        price: number;
        quantity: number;
      }[]
    >
  >;
};
export const FoodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<
    {
      foodName: string;
      price: number;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    const cartItems = localStorage.getItem("foodCart");
    if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
  }, []);

  useEffect(() => {
    if (foodCart) localStorage.setItem("foodCart", JSON.stringify(foodCart));
  }, [foodCart]);
  return (
    <FoodCartContext.Provider value={{ foodCart, setFoodCart }}>
      {children}
    </FoodCartContext.Provider>
  );
}
