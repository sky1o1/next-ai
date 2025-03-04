import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../app/slice/user-slice";
import { loginFxn } from "../api/login/userLogin";
import { useNavigate } from "react-router-dom";

interface UserData {
  data: { username: string; password: string };
}

export const useUserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["user-login"],
    mutationFn: async ({ data }: UserData) => {
      const response = await loginFxn({ data });
      const { accessToken, id, email, image, gender, firstName, lastName } =
        response;
      if (accessToken) {
        dispatch(
          setUser({
            userData: {
              name: `${firstName} ${lastName}`,
              username: data.username,
              id,
              email,
              image,
              gender,
            },
          })
        );
        localStorage.setItem("token", accessToken);
      }

      return response;
    },
    onSuccess: ({ accessToken }) => {
      if (accessToken) navigate("/");
    },
  });
};
