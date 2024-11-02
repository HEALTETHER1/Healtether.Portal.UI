import { useEffect, useRef, useState } from "react";

import { Form, useNavigation } from "react-router-dom";
import {
  ForgotOTP,
  SavePasswordAfterOTP,
  VerifyOTPService,
} from "../../services/auth/authApi";
import { toast } from "react-toastify";
import Spinner from "../../components/loader/Spinner";

const LoginForm = () => {
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";
  const [emailValue, setEmailValue] = useState("");
  const [step, setStep] = useState(1);
  const [showEmail, setShowEmail] = useState("");
  const [showPassword, setShowPassword] = useState("hidden");
  const [showConfirmPassword, setConfirmPassword] = useState("hidden");
  const [showOTP, setShowOTP] = useState("hidden");
  const [OTP, setOTP] = useState("0000");
  const [userId, setUserId] = useState("");
  const mobileRef = useRef(null);
  const OTPRef = useRef(null);
  const [validationNewPassword, setvalidationNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingForgot, setLoadingForgot] = useState(false);
  useEffect(() => {
    switch (step) {
      case 1:
        {
          setShowEmail("");
          setShowPassword("hidden");
          setConfirmPassword("hidden");
          setShowOTP("hidden");
        }
        break;
      case 2:
        {
          setShowEmail("hidden");
          setShowPassword("");
          setConfirmPassword("hidden");
          setShowOTP("hidden");
        }
        break;
      case 3:
        {
          setShowEmail("hidden");
          setShowPassword("hidden");
          setConfirmPassword("hidden");
          setShowOTP("");
          setOTP("");
        }
        break;
      case 4:
        {
          setShowEmail("hidden");
          setShowPassword("hidden");
          setShowOTP("hidden");
          setConfirmPassword("");
        }
        break;
    }
  }, [step]);

  const nextStep = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    if (
      !emailRegex.test(mobileRef.current.value) &&
      !mobileRegex.test(mobileRef.current.value)
    ) {
      mobileRef.current.setCustomValidity(
        "Please enter a valid email / mobile"
      );
      mobileRef.current.reportValidity();
      return false;
    }
    if (!mobileRef.current.checkValidity())
      // Trigger custom validation
      mobileRef.current.reportValidity();
    else setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
    setShowEmail(step != 1 ? "hidden" : "");
  };
  const backToPasswordStep = () => {
    setStep(2);
    setShowEmail(step != 1 ? "hidden" : "");
  };

  const VerifyOTP = async () => {
    if (OTP == null || OTP.length != 4) {
      OTPRef.current.setCustomValidity("Please enter a valid email / mobile");
      OTPRef.current.reportValidity();
      return false;
    } else {
      var res = await VerifyOTPService({ mobile: emailValue, password: OTP });
      if (res.status == 200 && res.data.success == true) {
        setStep(4);
      } else {
        OTPRef.current.setCustomValidity("Invalid OTP , try again");
        OTPRef.current.reportValidity();
      }
    }
  };
  const SendForgotOTP = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    if (
      !emailRegex.test(mobileRef.current.value) &&
      !mobileRegex.test(mobileRef.current.value)
    ) {
      mobileRef.current.setCustomValidity(
        "Please enter a valid email / mobile"
      );
      mobileRef.current.reportValidity();
      return false;
    }
    setLoadingForgot(true);
    var res = await ForgotOTP({ mobile: emailValue, password: OTP });

    if (res.status == 200 && res.data.success) {
      setStep(3);
      setUserId(res.data.token);
      setLoadingForgot(false);
      toast.info("Sending OTP...");
    } else {
      setStep(1);
      setLoadingForgot(false);
      toast.warn("Invalid mobile/email ");
      mobileRef.current.setCustomValidity(
        "Please enter a valid email / mobile"
      );
      mobileRef.current.reportValidity();
    }
  };

  const AssignNewPassword = async () => {
    if (
      confirmNewPassword.trim().length == 0 ||
      newPassword.trim().length == 0 ||
      confirmNewPassword.trim().length < 6 ||
      newPassword.trim().length < 6
    ) {
      setvalidationNewPassword(
        "Please enter valid password ( length upto 6 to 12 character)."
      );
      return;
    }
    if (confirmNewPassword != newPassword) {
      setvalidationNewPassword(
        "Please enter valid password (must match confirm password)."
      );
      return;
    }
    if (confirmNewPassword == newPassword && !confirmNewPassword.length < 13) {
      setLoading(true);
      var result = await SavePasswordAfterOTP({
        token: userId,
        password: confirmNewPassword,
      });

      if (result.status == 200 && result.data.success) {
        setLoading(false);
        setStep(2);
        toast.success("New password has been set, login again");
        //toast
      } else {
        setLoading(false);
        setvalidationNewPassword("Invalid password,try again");
      }
    }
    return;
  };

  return (
    <div className="w-5/6 px-20 ">
      {/* <div className='bg-black'> </div> */}
      <Form method="post">
        <div className={showEmail}>
          <input
            type="text"
            name="emailOrPhone"
            ref={mobileRef}
            placeholder="Email or Mobile number"
            onChange={(e) => {
              e.target.setCustomValidity("");
              setEmailValue(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                nextStep();
              }
            }}
            className="border border-black border-px rounded p-3 w-full "
            required
            defaultValue={emailValue}
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter a valid email / mobile")
            }
          />{" "}
          {/* <p className="">
              or <span className="text-purple-700">Create new account</span>
            </p> */}
          <div className="flex justify-center py-4">
            <button
              type="button"
              onClick={nextStep}
              className="text-white shadow-slate-400 shadow-lg bg-teal-600 px-5 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>

        <div className={showPassword}>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => e.target.setCustomValidity("")}
            className="border border-black border-px rounded p-3 w-full"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter a valid password")
            }
          />
          <button
            className="flex text-Secondary pt-2 cursor-pointer"
            type="button"
            disabled={loadingForgot}
            onClick={() => {
              SendForgotOTP();
            }}
          >
            Forgot Password? &nbsp;&nbsp;
            <Spinner show={loadingForgot} />
          </button>

          <div className="flex justify-between py-4 ">
            <button
              type="button"
              onClick={prevStep}
              className="text-white shadow-slate-400 shadow-lg bg-teal-600 px-5 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={busy}
              className="text-white shadow-slate-400 shadow-lg bg-teal-600 px-5 py-2 rounded"
            >
              Login &nbsp;&nbsp;
              {busy ? <Spinner show={true} /> : <></>}
            </button>
          </div>
        </div>
        <div className={showOTP + " mt-4"}>
          <p className="text-sm text-black pb-2 text-teal-800">
            OTP is sent to your whatsapp / email
          </p>

          <input
            type="password"
            name="otp"
            placeholder="Enter your OTP "
            value={OTP}
            ref={OTPRef}
            onChange={(e) => {
              e.target.setCustomValidity("");
              setOTP(e.target.value);
            }}
            className="border border-black border-px rounded p-3 w-full"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter valid OTP")
            }
          />
          <div className="flex justify-between py-4 ">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-white shadow-slate-400 shadow-lg bg-teal-600 px-5 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => VerifyOTP()}
              disabled={loading}
              className="text-white shadow-slate-400 shadow-lg bg-teal-600 px-5 py-2 rounded"
            >
              Verify OTP &nbsp;&nbsp;
              <Spinner show={loading} />
            </button>
          </div>
        </div>
        <div className={showConfirmPassword}>
          <label>Enter new password</label>
          <input
            type="text"
            name="newPassword"
            maxLength={12}
            value={newPassword}
            placeholder="New password"
            onChange={(e) => {
              setvalidationNewPassword("");
              setNewPassword(e.target.value);
            }}
            className="border border-black rounded my-2 p-3 w-full"
          />

          <label className="py-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmNewPassword}
            maxLength={12}
            placeholder="Confirm new password"
            onChange={(e) => {
              setvalidationNewPassword("");
              setconfirmNewpassword(e.target.value);
            }}
            className="border border-black rounded my-2 p-3 w-full"
          />
          <div className="flex  justify-center mt-3">
            <p className="text-red-700 font-italic">{validationNewPassword}</p>
          </div>
          <div className="flex justify-between mt-3">
            <button
              type="button"
              onClick={backToPasswordStep}
              className="text-white shadow-slate-400 shadow-lg bg-teal-600 px-5 py-1 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={AssignNewPassword}
              disabled={loading}
              className="text-white shadow-slate-400 shadow-lg bg-teal-600 px-5 py-2 rounded"
            >
              Set New Password &nbsp;&nbsp;
              <Spinner show={loading} />
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
