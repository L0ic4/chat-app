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
