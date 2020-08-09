import AxiosInstance from "./AxiosInstance";

export default class SystemDataService {
  static async getSystemData() {
    let result;

    try {
      result = await AxiosInstance.get(`systemData`);
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }
}
