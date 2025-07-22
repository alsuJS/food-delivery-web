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
      image: string;
    }[]
  >([]);

  useEffect(() => {
    const cartItems = localStorage.getItem("foodCart");
    if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
  }, []);

  useEffect(() => {
    if (foodCart) localStorage.setItem("foodCart", JSON.stringify(foodCart));
  }, [foodCart]);

  const addToCart = (newFood) => {
    const existingFood = foodCart.find(
      ({ food }) => food._id === newFood.food._id
    );

    if (existingFood) {
      const updatedFoodCart = updateFoodCart(foodCart, newFood);

      setFoodCart(updatedFoodCart);
      return;
    }

    setFoodCart([...foodCart, newFood]);
  };

  const updateFoodCart = (foodCart, newFood) => {
    const updatedFoodCart = foodCart.map(({ food, quantity, totalPrice }) => {
      if (food._id === food._id) {
        return {
          food: food,
          quantity: quantity + newFood.quantity,
          totalPrice: quantity * Number(food.price),
        };
      } else {
        return {
          food,
          quantity,
          totalPrice,
        };
      }
    });

    return updatedFoodCart;
  };

  const incrementFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart.map(({ food, quantity, totalPrice }) => {
      if (food._id === foodId) {
        return {
          food: food,
          quantity: quantity + 1,
          totalPrice: quantity * Number(food.price),
        };
      } else {
        return {
          food,
          quantity,
          totalPrice,
        };
      }
    });

    setFoodCart(updatedFoodCart);
  };

  const decrimentFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart.map(({ food, quantity, totalPrice }) => {
      if (food._id === foodId) {
        return {
          food: food,
          quantity: quantity < 2 ? 1 : quantity - 1,
          totalPrice: (quantity < 2 ? 1 : quantity - 1) * food.price,
        };
      } else {
        return {
          food,
          quantity,
          totalPrice,
        };
      }
    });

    setFoodCart(updatedFoodCart);
  };
  return (
    <FoodCartContext.Provider
      value={{
        foodCart,
        setFoodCart,
        addToCart,
        incrementFoodQuantity,
        decrimentFoodQuantity,
        removeFromCart: () => {},
      }}
    >
      {children}
    </FoodCartContext.Provider>
  );
}
