import { useForm } from "react-hook-form";
import "./SignUp.css";
import signUpModal from "../../models/user/SingUp";
import auth from "../../../services/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/Auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function SignUp(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<signUpModal>({
    mode: "onBlur",
  });

  const { newLogin } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(signUp: signUpModal) {
    try {
      setErrorMessage(""); 
      console.log("Submitting data:", signUp);

      const { jwt, role } = await auth.signUp(signUp);
      newLogin(jwt, role);
      navigate("/vacations");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        const msg = axiosError.response.data.message;
    
        if (msg.toLowerCase().includes("already exists")) {
          setErrorMessage("אימייל זה כבר קיים במערכת. אנא השתמש באחר.");
        } else {
          setErrorMessage(msg);
        }
      } else {
        setErrorMessage("משהו השתבש. נסה שוב מאוחר יותר.");
      }
      if (axiosError.response?.data?.message) {
        setErrorMessage(axiosError.response.data.message);
      } else {
        setErrorMessage("try to use different email");
      }
    }
  }

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit(submit)}>
        <input
          placeholder="First Name"
          {...register("firstName", {
            required: "First Name is required",
            minLength: { value: 2, message: "First name must be at least 2 characters" },
            maxLength: { value: 40, message: "First name cannot exceed 40 characters" },
          })}
        />
        {formState.errors.firstName && <p>{formState.errors.firstName.message}</p>}

        <input
          placeholder="Last Name"
          {...register("lastName", {
            required: "Last Name is required",
            minLength: { value: 2, message: "Last name must be at least 2 characters" },
            maxLength: { value: 40, message: "Last name cannot exceed 40 characters" },
          })}
        />
        {formState.errors.lastName && <p>{formState.errors.lastName.message}</p>}

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
          {...register("password", {
            required: "Password is required",
            minLength: { value: 4, message: "Password must be at least 4 characters" },
            maxLength: { value: 40, message: "Password cannot exceed 40 characters" },
          })}
        />
        {formState.errors.password && <p>{formState.errors.password.message}</p>}

        <button type="submit">Register</button>

        {/*errors from backend */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <div>
        Already a member?{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
}
