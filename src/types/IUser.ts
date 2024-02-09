export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string;
}
