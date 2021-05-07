import UserViewModel from "./UserViewModel";

export default class LoginResponseViewModel {
  AccessToken!: string;
  ExpiresIn!: number;
  User!: UserViewModel;
}
