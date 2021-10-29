export type UserDocument = User;

export class User {
  id: string;
  username: string;
  password: string;
}

const UserSchema = User;
