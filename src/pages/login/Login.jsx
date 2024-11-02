import { useEffect } from "react";
import HealTetherLogo from "assets/images/HealTetherLogo.png";
import NationalHealthAuthority from "assets/images/national-health-authority.jpg";
import LoginForm from "pages/AuthForm/LoginForm";
import { useNavigate } from "react-router-dom";

import login_bg from "assets/svg/loginbg.svg";
import { useDispatch, useSelector } from "react-redux";
import CheckJWT from "utils/CheckJWT";
import { AuthLogin } from "services/auth/authApi";
import { useActionData } from "react-router-dom";
import { setCredentials } from "store/slice/AuthSlice";
import { setUser } from "store/slice/UserSlice";
import { SetHeaderToken } from "../../services/axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function LoginAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      formData.getAll(key).length > 1
        ? formData.getAll(key)
        : formData.get(key),
    ])
  );

  var result = await AuthLogin({
    emailOrPhone: updates.emailOrPhone,
    password: updates.password,
  }).then((res) => {
    if (res.data.user && res.data.token) {
      toast.success("Welcome");
      SetHeaderToken(res.data.token);
      return res.data;
    }
    if (res.data.success === false) {
      toast.error("Invalid Credentials");
    }
    if (res.data.action === false) {
      toast.error("Invalid Credentials");
    } else if (res.data.action === true) {
      toast.error("The User is Blocked");
    }
    return null;
  });

  return result;
}

export default function Login() {
  const { token } = useSelector((state) => state.auth);
  const { clinic } = useSelector((state) => state.currentClinic);
  const navigate = useNavigate();
  const actionData = useActionData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (actionData != null) {
      dispatch(setCredentials({ ...actionData }));
      dispatch(setUser({ ...actionData }));
      //   if(actionData?.user?.isSuperAdmin || (actionData?.user?.linkedClinics!=null && actionData?.user?.linkedClinics.length>0))
      //   {
      //     console.log("navigate to choose clibnic")
      //     navigate("/select-clinic")
      //   }
      //   else if((actionData?.user?.linkedClinics!=null && actionData?.user?.linkedClinics.length==1)){
      //     dispatch(setCurrentClinic({ ...actionData }));
      //     navigate("/dashboard");
      //    }
    }
  }, [actionData]);
  useEffect(() => {
    const isLoggedIn = token != null && token != undefined && !CheckJWT(token);
    if (isLoggedIn && (clinic == null || clinic?._id == null)) {
      navigate("/select-clinic");
    } else if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate, token]);
  return (
    <>
      <div className="flex flex-row ">
        <div
          className="w-6/12 h-screen flex flex-col justify-center items-center rounded-r-[10rem]  "
          style={{
            backgroundImage: `url(${login_bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="z-10 flex flex-col justify-center items-center ">
            <h1 className="text-[1.875rem] font-medium mt-3 text-[#1E1E36]">
              Welcome to
            </h1>
            <img
                src={HealTetherLogo}
                alt="HealTether Logo"
                className="object-contain w-[120px] m-8	"
            />
            <div
                className="font-normal text-md text-[#000] gap-[0.5rem] mt-3 flex flex-col justify-center items-center ">
              <p>Empower your Practice!</p>{" "}
              <p>Be assured that we have strong commitment to your</p>
              <p>data privacy and security</p>
            </div>
            {/*<div className="flex m-12 justify-center items-center ">
              <p className="mx-5 text-md text-[#505050] font-medium">
                Approved by
              </p>
              <img
                src={NationalHealthAuthority}
                alt="NationalHealthAuthorityLogo"
                className="object-contain w-[100px]"
              />
            </div>*/}

            <div className="flex justify-center text-sm font-medium mt-5">
              <p><a href="https://www.healtether.com/privacy" target="_blank">Privacy policy</a> |<a
                  href="https://www.healtether.com/terms" target="_blank"> Terms & Conditions</a></p>
            </div>
          </div>
        </div>

        <div className="w-6/12 flex flex-col justify-center items-center mb-[6rem]">
          <h1 className="text-3xl font-semibold py-8">
            Join our network of Doctors
          </h1>
          <p className="py-3">Sign in to get started</p>

          <LoginForm />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>{" "}
    </>
  );
}
