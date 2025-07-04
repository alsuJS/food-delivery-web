export type CategoryType = {
  createdAt: String;
  updatedAt: String;
  _id: String;
  categoryName: String;
  __v: Number;
};

export type foodWithCategory = {
  _id: string;
  categoryName: string;
  foods: [
    {
      _id: string;
      foodName: string;
      price: number;
      image: string;
      ingredients: string;
    }
  ];
  count: number;
};
