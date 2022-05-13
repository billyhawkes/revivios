// TYPES //
export type Create = {
  name: string;
  date: Date | null;
  userId: number;
};

export type FindAll = {
  userId: number;
};

export type FindOne = {
  id: number;
  userId: number;
};

export type Delete = {
  id: number;
  userId: number;
};

export type Update = {
  id: number;
  name: string;
  completed: boolean;
  date: Date | null;
  userId: number;
};
