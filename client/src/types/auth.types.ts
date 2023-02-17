export type User = {
  email: string,
  password: string,
  username?: string,
};

export type UserStorage = {
  token: string,
  userId: string,
}
