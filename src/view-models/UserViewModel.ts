import ClaimViewModel from "./ClaimViewModel";

export default class UserViewModel {
  Id!: string;
  Email!: string;
  UserName!: string;
  Claims!: ClaimViewModel[];
}
