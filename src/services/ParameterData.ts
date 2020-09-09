import AxiosInstance from "./AxiosInstance";

export async function GetAllParameters() {
  try {
    return (await AxiosInstance.get(`parameters`)).data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
