import { privateAgent } from "../";

export const customerDetail = async (id: number) => {
  try {
    if (id) {
      const response = await privateAgent.get(`/users/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
