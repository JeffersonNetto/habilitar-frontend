import User from "../models/User";
import UserViewModel from "./UserViewModel";

export default interface LoginResponseViewModel {
  AccessToken: string;
  ExpiresIn: number;
  User: User;
}
