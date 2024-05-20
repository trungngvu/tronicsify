import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginInput from "./LoginInput";
import * as Yup from "yup";
import ButtonInput from "./ButtonInput";
import Router from "next/router";
import { signIn } from "next-auth/react";
import axios from "axios";

import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";

const initialUser = {
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
};

const RegisterPage = ({ providers }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialUser);
  const { name, email, password, conf_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log(user);
  };

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên của bạn.")
      .min(2, "Tên phải nằm trong khoảng 2 và 16 ký tự.")
      .max(16, "Tên phải nằm trong khoảng 2 và 16 ký tự."),
    email: Yup.string()
      .required("Vui lòng nhập địa chỉ Email.")
      .email("Địa chỉ email không đúng định dạng."),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu.")
      .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự.")
      .max(36, "Mật khẩu phải chứa ít hơn 36 ký tự."),
    conf_password: Yup.string()
      .required("Xác nhận lại mật khẩu.")
      .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp."),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup/", {
        name,
        email,
        password,
      });

      setUser({
        ...user,
        error: "",
        success: data.message,
      });
      setLoading(false);

      setTimeout(async () => {
        setLoading(true);
        let options = {
          redirect: false,
          email: email,
          password: password,
        };

        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({
        ...user,
        success: "",
        error: error.response.data.message,
      });
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className="flex flex-col w-full px-4 pt-8 pb-16 mx-auto sm:w-3/5 md:w-3/5 lg:w-2/5">
        <div className="flex flex-col p-4 my-4 space-y-4 bg-white border rounded">
          <h3 className="text-xl font-bold">Đăng ký</h3>
          <Formik
            enableReinitialize
            initialValues={{
              name,
              email,
              password,
              conf_password,
            }}
            validationSchema={registerValidation}
            onSubmit={() => signUpHandler()}
          >
            {(form) => (
              <Form>
                <LoginInput
                  id="input-name"
                  type="text"
                  icon="user"
                  name="name"
                  onChange={handleChange}
                />
                <LoginInput
                  id="input-email"
                  type="text"
                  icon="email"
                  name="email"
                  onChange={handleChange}
                />

                <LoginInput
                  id="input-password"
                  type="password"
                  icon="password"
                  name="password"
                  onChange={handleChange}
                />
                <LoginInput
                  id="input-password-conf"
                  type="password"
                  icon="password"
                  name="conf_password"
                  onChange={handleChange}
                />
                <ButtonInput type="submit" text="Sign up" />
              </Form>
            )}
          </Formik>

          <div className="flex">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : success ? (
              <p className="text-green-500">{success}</p>
            ) : (
              ""
            )}
          </div>

          <span
            className="pt-1 relative flex justify-center text-sm 
              before:left-1 before:top-[50%] before:absolute before:bg-slate-200 before:h-[1px] before:w-[10%] sm:before:w-[18%] md:before:w-[22%]
              after:right-1 after:top-[50%] after:absolute after:bg-slate-200 after:h-[1px] after:w-[10%] sm:after:w-[18%] md:after:w-[22%]"
          >
            Đăng nhập với tài khoản bên thứ ba
          </span>

          <div className="flex flex-col lg:flex-row">
            {providers.map((provider) => {
              if (provider.name === "Credentials") {
                return;
              }
              return (
                <div
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="flex items-center w-full p-2 mx-2 mt-3 bg-white border cursor-pointer rounded-xl lg:mt-1"
                >
                  <Image
                    src={`/assets/images/${provider.id}.png`}
                    alt={provider.name}
                    width={28}
                    height={28}
                  />
                  <div className="w-full ml-2 text-sm font-semibold">
                    Đăng nhập với {provider.name}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center pt-4 text-sm">
            <span className="ml-1 text-black">Đã có tài khoản?</span>
            <Link
              className="flex items-center ml-2 text-blue-500 hover:text-amazon-orange hover:underline"
              href="/auth/signin"
            >
              Đăng nhập
              <ChevronRightIcon className="h-3 text-gray-500" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
