import { useRef, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { SignupSchema } from "../../Schema/authSignUp";
import { useSelector } from "react-redux";
import { AuthsubmissionApi } from "services/user/signupApi";
import { useNavigate } from "react-router-dom";
export default function SignupForm() {
  const phoneNumber = useSelector((state) => state.number.phoneNumber);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [hide, setHide] = useState(false);
  const [chide, setChide] = useState(false);
  const [phone, setphone] = useState(phoneNumber.phone);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          phone: phone,
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          AuthsubmissionApi(values)
            .then((res) => {
              if (res.data.success === true) {
                //  toast.success('successfully completed')
                navigate("/login");
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mt-5">
              <label htmlFor="email"></label>
              <Field
                innerRef={inputRef}
                className="md:w-[400px] w-[300px]  focus:outline-none bg-slate-50 drop-shadow-md border-zinc-50 h-12 rounded-md hover:drop-shadow-xl"
                placeholder="Email"
                style={{ paddingLeft: "20px" }}
                type="text"
                name="email"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500 font-sans mt-3 text-sm ">
                  {errors.email}
                </div>
              ) : null}
              <label htmlFor="phoneh"></label>
              <Field
                className="md:w-[400px] w-[300px] focus:outline-none mt-4 bg-slate-50 drop-shadow-md border-zinc-50 h-12 rounded-md hover:drop-shadow-xl"
                placeholder="Phone"
                style={{ paddingLeft: "20px" }}
                type="text"
                name="phoneh"
                value={phone}
              />
              {errors.phoneh && touched.phoneh ? (
                <div className="text-red-500 font-sans text-sm ">
                  {errors.phoneh}
                </div>
              ) : null}
              <div className="md:w-[400px] w-[300px]  mt-4 bg-slate-50 drop-shadow-lg border-zinc-50 h-12 rounded-md hover:drop-shadow-xl flex">
                <label htmlFor="password"></label>
                <Field
                  className="outline-none w-[420px] bg-slate-50  "
                  placeholder="Password"
                  name="password"
                  style={{ paddingLeft: "20px" }}
                  type={`${hide ? "title" : "password"}`}
                />
                <h1
                  className="text-2xl mt-3 mr-4 text-gray-500 "
                  onClick={() => setHide(!hide)}
                >
                  {hide ? <FaEyeSlash /> : <FaEye />}
                </h1>
              </div>
              {errors.password && touched.password ? (
                <div className="text-red-500 font-sans text-sm ">
                  {errors.password}
                </div>
              ) : null}
              {/* cpassword */}
              <div className="md:w-[400px] w-[300px] mt-3 bg-slate-50 drop-shadow-lg border-zinc-50 h-12 rounded-md hover:drop-shadow-xl flex">
                <label htmlFor="cpassword"></label>
                <Field
                  className="outline-none w-[420px] bg-slate-50  "
                  placeholder="confirm password"
                  name="cpassword"
                  style={{ paddingLeft: "20px" }}
                  type={`${chide ? "title" : "password"}`}
                />
                <h1
                  className="text-2xl mt-3 mr-4 text-gray-500 "
                  onClick={() => setChide(!chide)}
                >
                  {chide ? <FaEyeSlash /> : <FaEye />}
                </h1>
              </div>
              {errors.cpassword && touched.cpassword ? (
                <div className="text-red-500 font-sans text-sm ">
                  {errors.cpassword}
                </div>
              ) : null}

              <button
                type="submit"
                className="md:w-[400px] w-[300px] mt-5 bg-teal-600 h-12 rounded-md text-white font-bold transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100 duration-300 "
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
