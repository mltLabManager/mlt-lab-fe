import AxiosInstance from "./AxiosInstance";

export default class SystemDataService {
  static async getSystemData() {
    let result;

    try {
      result = await AxiosInstance.get(`systemData`, {
        // withCredentials: true,
        // headers: { "Access-Control-Allow-Origin": "*" },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }
}
