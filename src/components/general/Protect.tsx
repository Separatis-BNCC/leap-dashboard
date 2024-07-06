import { ReactNode, useEffect } from "react";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Protect({ children }: Props) {
  const navigate = useNavigate();
  const isAuthenticated = cookies.get("token");

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [navigate, isAuthenticated]);

  if (!isAuthenticated) {
    return <></>;
  }

  return children;
}
