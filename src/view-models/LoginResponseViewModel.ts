import UserViewModel from "./UserViewModel";

export default interface LoginResponseViewModel {
  AccessToken: string;
  ExpiresIn: number;
  User: UserViewModel;
}
