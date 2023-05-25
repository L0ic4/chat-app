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
  status?: boolean;
  user?: {
    id?: number;
    email?: string;
    name?: string;
    googleId?: string;
    bio?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    token?: string;
  };
}
export interface ChannelData {
  status?: boolean;
  channel?: {
    id?: number;
    name?: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
    ownerId?: number;
    owner?: {
      id?: number;
      name?: string;
      email?: string;
    };
  };
}

interface User {
  id?: number;
  name?: string;
  email?: string;
  bio?: string;
}

export interface UserListData {
  status?: boolean;
  users?: User[];
}

export interface ChannelDataType {
  name?: string;
  type?: "public" | "private";
  members?: [];
}
