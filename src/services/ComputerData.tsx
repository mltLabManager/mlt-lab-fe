import AxiosInstance from "./AxiosInstance";

export default class ComputerDataService {
  static async getComputersData() {
    let result;

    try {
      result = await AxiosInstance.get(`computerData`);
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }

  static async updateComputerData(computerData: TableRow, userId: string) {
    let result;

    try {
      result = await AxiosInstance.put(`computerData/:${userId}`, computerData);
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }
}
