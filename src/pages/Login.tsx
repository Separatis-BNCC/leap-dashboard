import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useLoginMutation from "@/hooks/auth/useLoginMutation";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>();

  const displayError = (errorMessage: string) => {
    setError("email", {
      message: errorMessage,
    });
    setError("password", {
      message: errorMessage,
    });
  };
  const { loginMutation } = useLoginMutation({
    onError(message) {
      displayError(message);
    },
  });

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
          <p className="font-semibold text-lg mb-4 text-dark">Leap.</p>
          <h1 className="text-[2.25rem] mb-4 text-dark">Login</h1>

          <div className="grid gap-6">
            <Input
              label="Email"
              placeholder="example@mail.com"
              {...register("email", { required: "This field is required" })}
              errorMessage={errors.email?.message}
            />

            <Input
              label="Password"
              placeholder="*****"
              type="password"
              {...register("password", { required: "This field is required" })}
              errorMessage={errors.password?.message}
            />
          </div>
          <Button
            className="w-full py-4 mt-6"
            variant="accent"
            isLoading={loginMutation.isPending}
          >
            Login
          </Button>
        </form>
        <div className="flex items-center justify-center mt-12">
          <p className="text-light">
            Forgot credentials?{" "}
            <span className="text-highlight underline hover:opacity-60 transition-all duration-100 cursor-pointer">
              Recover Account
            </span>
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#E4ECFF] to-[#F2F7FF]w-full min-h-screen"></div>
    </main>
  );
}
