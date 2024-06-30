import { ServerErrorResponse, ServerSuccessResponse } from "@/lib/types";
import { API } from "@/service/API";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type LoginFields = {
  password: string;
  email: string;
};

type SuccessResponse = ServerSuccessResponse<{
  email: string;
  role: number;
  token: string;
}>;

type Props = {
  onError: (errorMessage: string) => void;
};

export default function useLoginMutation({ onError }: Props) {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (fields: LoginFields) => {
      return API.post<SuccessResponse>("/login", fields);
    },
    onError: (error) => {
      const serverError = (error as AxiosError).response?.data;
      const errorMessage = (serverError as ServerErrorResponse).msg;
      onError(errorMessage);
    },
    onSuccess: (data) => {
      const { token, role } = data.data.data;
      // Prevent non-admin users from logging into the dashboard
      if (role !== 1) {
        onError("Invalid email or password!");
        return;
      }
      Cookies.set("token", token);
      navigate("/dashboard");
    },
  });

  return { loginMutation };
}
