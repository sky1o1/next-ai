import { axiosClient } from "../";

interface UserData {
  data: { username: string; password: string };
}

export const loginFxn = async ({ data }: UserData) => {
  const { username, password } = data;
  try {
    const response = await axiosClient.post("/login", {
      username,
      password,
      expiresInMins: 30,
    });
    console.log("Login successful!");
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return error;
  }
};
