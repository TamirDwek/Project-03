import { useForm } from "react-hook-form";
import "./Login.css";
import LoginModel from "../../models/user/Login";
import auth from "../../../services/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/Auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<LoginModel>({
    mode: "onBlur",
  });

  const { newLogin } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(login: LoginModel) {
    try {
      console.log("Submitting data:", login);
      setErrorMessage(""); // ננקה שגיאות קודמות

      const { jwt, role } = await auth.login(login);
      newLogin(jwt, role);
      navigate("/vacations");

    } 
    catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        setErrorMessage(axiosError.response.data.message);
      } else {
        setErrorMessage("Email or Password is wrong. Please try again.");
      }
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(submit)} noValidate>
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {formState.errors.email && <p>{formState.errors.email.message}</p>}

        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {formState.errors.password && <p>{formState.errors.password.message}</p>}

        <button type="submit">Login</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <div>
        Don't have an account?{" "}
        <button className="switch" onClick={() => navigate("/signup")}>
          Register
        </button>
      </div>
    </div>
  );
}
