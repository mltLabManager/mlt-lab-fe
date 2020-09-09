import AxiosInstance from "./AxiosInstance";

export interface IUserData {
  phone: string;
  password: string;
}

export default class UserService {
  static async getToken(userData: IUserData) {
    let result;

    try {
      result = await AxiosInstance.post(`user/login`, {
        phone: userData.phone,
        password: userData.password,
        newPassword: "",
        EULASigned: false,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }
}
