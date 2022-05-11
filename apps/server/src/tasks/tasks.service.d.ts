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

export type ToggleComplete = {
  id: number;
  userId: number;
};

export type ChangeDate = {
  id: number;
  date: Date;
  userId: number;
};
