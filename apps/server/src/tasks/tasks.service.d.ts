// TYPES //
export type CreateTask = {
  name: string;
  date: Date | null;
  userId: number;
};

export type FindAllOnDateTask = {
  date: Date | null;
  userId: number;
};

export type FindOneTask = {
  id: number;
  userId: number;
};

export type DeleteTask = {
  id: number;
  userId: number;
};

export type UpdateTask = {
  id: number;
  name: string;
  completed: boolean;
  date: Date | null;
  userId: number;
};
