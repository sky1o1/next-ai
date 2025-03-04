import { privateAgent } from "../";

export const customerList = async ({ pageParam = 0 }) => {
  try {
    const response = await privateAgent.get(`/users?limit=9&skip=${pageParam}`);

    return {
      users: response.data.users, // Ensure response has users
      nextCursor: pageParam + 10, // Increment by 10 for the next page
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
