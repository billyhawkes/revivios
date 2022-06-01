export type CreateUser = {
  name: string;
  email: string;
};

export type UpdateUser = {
  userId: number;
  name: string;
};

export type AlterXP = {
  userId: number;
  amount: number;
};
