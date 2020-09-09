import { IUserData } from "./UserService";
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

  static async getDeliveryData(userData: IUserData) {
    let result;

    try {
      result = await AxiosInstance.get(`computerData/delivery`, {
        params: {
          phone: userData.phone,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }

  static async createDeliveryReception(deliveryRows: DeliveryRowType[]) {
    let result;

    try {
      result = await AxiosInstance.post(`computerData/createReception`, {
        deliveryRows: deliveryRows,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }

  static async reportDeliveryReception(deliveryRows: DeliveryRowType[], courierPhoneNumber: string) {
    let result;

    try {
      result = await AxiosInstance.post(`computerData/reception`, {
        deliveryRows: deliveryRows,
        courierPhoneNumber: courierPhoneNumber,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }

  static async updateComputerData(computerData: TableRow, userId: string) {
    let result;

    try {
      result = await AxiosInstance.put(`computerData/${userId}`, computerData);
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result.data;
  }
}
