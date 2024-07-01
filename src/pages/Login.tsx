import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useLoginMutation from "@/hooks/auth/useLoginMutation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>();
  const [errorMessage, setErrorMessage] = useState("");

  const { loginMutation } = useLoginMutation({
    onError: setErrorMessage,
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterValues> = (value) => {
    loginMutation.mutate({
      password: value.password,
      email: value.email,
    });
  };

  return (
    <main className="grid grid-cols-2">
      <div className="px-8 py-8 flex items-center justify-center flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[40rem] w-full mx-auto"
        >
          <p className="font-semibold text-lg text-dark">Leap.</p>
          <h1 className="text-[2.25rem] mb-4 text-dark">Login</h1>

          <div className="grid gap-6">
            <Input
              label="Email"
              placeholder="example@mail.com"
              {...register("email", { required: "This field is required" })}
              errorMessage={errors.email?.message}
              className={cn(errorMessage && "[&_input]:border-red-400")}
            />
            <div className="relative">
              <Input
                label="Password"
                placeholder="*****"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "This field is required",
                })}
                errorMessage={errors.password?.message}
                className={cn(
                  "[&_input]:pr-12",
                  errorMessage && "[&_input]:border-red-400"
                )}
              />
              <i
                className={cn(
                  "absolute bx text-lg top-[2.5rem] right-4 cursor-pointer duration-100 transition-all hover:opacity-50",
                  showPassword ? "bx-show" : "bx-hide"
                )}
                onClick={() => setShowPassword((cur) => !cur)}
              ></i>
            </div>
          </div>
          {errorMessage && !errors.password && (
            <div className="flex gap-2 mt-6">
              <i className="text-red-400 bx bxs-error-circle leading-[150%]"></i>
              <p className="text-red-400 text-start mt-0">{errorMessage}</p>
            </div>
          )}
          <Button
            className="w-full py-4 mt-6"
            variant="accent"
            isLoading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            Login
          </Button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <p className="text-light">
            Forgot Your Password?{" "}
            <span className="text-highlight underline hover:opacity-60 transition-all duration-100 cursor-pointer">
              Recover
            </span>
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#E4ECFF] to-[#F2F7FF]w-full min-h-screen"></div>
    </main>
  );
}
