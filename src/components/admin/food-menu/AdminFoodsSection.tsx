"use client";

import { AddFoodModal } from "./AddFoodModal";
import { AdminFoodCard } from "./AdminFoodCard";
import { AdminFoodSkeleton } from "./AdminFoodSkeleton";
import { useEffect, useState } from "react";
import { foodWithCategory } from "@/lib/utils/types";

export type FoodCategory = {
  _id: string;
  categoryName: string;
  count: number;
  foods: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
};

export const AdminFoodsSection = () => {
  const [foodWithCategories, setFoodWithCategories] = useState<
    foodWithCategory[]
  >([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("http://localhost:4200/food");
      const data = await response.json();

      setFoodWithCategories(data.foodsWithCategories);
    };
    getCategories();
  }, []);
  console.log(foodWithCategories);

  if (!foodWithCategories) return null;

  if (!foodWithCategories.length) return <AdminFoodSkeleton />;

  return (
    <div className="flex flex-col gap-6">
      {foodWithCategories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-6 bg-background rounded-xl"
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{category.categoryName}</p>
            <p className="flex items-center">{category.count}</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodModal
              categoryName={category.categoryName}
              categoryId={category._id}
            />
            {category.foods.map((food) => (
              <div key={`${food._id}`} className="flex gap-2">
                <AdminFoodCard
                  image={food.image}
                  price={food.price}
                  ingredients={food.ingredients}
                  foodName={food.foodName}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
