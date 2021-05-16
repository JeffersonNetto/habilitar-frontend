import ClaimViewModel from "./ClaimViewModel";

export default interface UserViewModel {
  Id: string;
  Email: string;
  UserName: string;
  PhoneNumber: string;
  Claims: ClaimViewModel[];
}
