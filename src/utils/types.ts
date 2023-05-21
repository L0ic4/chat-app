export interface LoginDataType {
  email: string;
  password: string;
}
export interface SigninDataType {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  bio: string;
}
export interface UserData {
  status: boolean;
  user: {
    id: number;
    email: string;
    name: string;
    googleId: string | null;
    bio: string | null;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    token: string;
  };
}

export interface ChannelDataType {
  name: string;
  type: "public" | "private";
  members: number;
}
