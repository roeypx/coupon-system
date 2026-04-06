
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserCredentialsModel, { Role } from "../../Models/UserCredentialsModel";
import loginService from "../../Services/LoginService";
import notificationService from "../../Services/NotificationService";
import "./Login.css";
import { AuthActionType, AuthStore } from "../../Redux/AuthState";
import { useEffect } from "react";
function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserCredentialsModel>();
  const navigate = useNavigate();
  useEffect(() => {
    if (AuthStore.getState().user != null)
      AuthStore.dispatch({ type: AuthActionType.Logout });
  }, []);
  async function login(userCredentials: UserCredentialsModel) {
    try {
      await loginService.login(userCredentials);
      notificationService.success("Logged in");
      if (userCredentials.clientType.toString() == "ADMINISTRATOR")
        navigate("/admin/companies");
      if (userCredentials.clientType.toString() == "COMPANY")
        navigate("/company/coupons");
      if (userCredentials.clientType.toString() == "CUSTOMER")
        navigate("/customer/coupons");
    } catch (error: any) {
      notificationService.error("I think that some of the details are wrong🙄");
    }
  }

  return (
    <div className="login-box">
      <h2><b>LOGIN</b></h2>
      <form onSubmit={handleSubmit(login)}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ROWI@ROWI.com" required {...register("email", {
            required: { value: true, message: "You forgot the Email Bitch" }
          })} />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Shhhh....🤐" required {...register("password", {
            required: { value: true, message: "What about the password bitch?!" }
          })} />
        </div>
        <div className="flex items-start mb-6">
          <fieldset>
            <div className="flex items-center mb-4">
              <input id="country-option-1" type="radio" name="type" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" {...register("clientType")} value={"ADMINISTRATOR"} />
              <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Admin
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input id="country-option-2" type="radio" name="type" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" {...register("clientType")} value={"COMPANY"} />
              <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Costumer
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input id="country-option-3" type="radio" name="type" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" {...register("clientType")} value={"CUSTOMER"} />
              <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Company
              </label>
            </div>
          </fieldset>
          <br /><br />
          <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Lets Goooooo</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
