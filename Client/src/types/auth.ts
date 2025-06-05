// types/auth.ts
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

