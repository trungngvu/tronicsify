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
import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";

const initialUser = {
  login_email: "",
  login_password: "",
  login_error: "",
};

const SignInPage = ({ providers, csrfToken, callbackUrl }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialUser);
  const { login_email, login_password, login_error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Vui lòng nhập email.")
      .email("Email không đúng định dạng."),
    login_password: Yup.string().required("Vui lòng nhập mật khẩu."),
  });

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };

    const res = await signIn("credentials", options);
    setUser({
      ...user,
      login_error: "",
    });
    setLoading(false);

    if (res?.error) {
      setLoading(false);
      setUser({
        ...user,
        login_error: res?.error,
      });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className="flex flex-col w-full px-4 pt-8 pb-16 mx-auto sm:w-3/5 md:w-3/5 lg:w-2/5">
        <div className="flex flex-col p-4 my-4 space-y-4 bg-white border rounded">
          <h3 className="text-xl font-bold">Đăng nhập</h3>
          <Formik
            enableReinitialize
            initialValues={{
              login_email,
              login_password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => signInHandler()}
          >
            {(form) => (
              <Form method="post" action="/api/auth/signin/email">
                <input
                  type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}
                />
                <LoginInput
                  id="input-email"
                  type="text"
                  icon="email"
                  name="login_email"
                  onChange={handleChange}
                />

                <LoginInput
                  id="input-password"
                  type="password"
                  icon="password"
                  name="login_password"
                  onChange={handleChange}
                />
                <ButtonInput type="submit" text="Đăng nhập" />
              </Form>
            )}
          </Formik>
          <div className="flex">
            {login_error && <p className="text-red-500">{login_error}</p>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            {providers.map((provider) => {
              if (provider.name === "Credentials") {
                return;
              }
              return (
                <div
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="flex items-center w-full gap-2 p-2 mt-3 bg-white border cursor-pointer rounded-xl md:mt-1"
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

          <Link
            href="/auth/forgot"
            className="text-sm text-blue-500 cursor-pointer hover:text-amazon-orange hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <div className="flex flex-col mt-3">
          <span
            className="pt-1 relative flex justify-center text-sm 
              before:left-1 before:top-[50%] before:absolute before:bg-slate-200 before:h-[1px] before:w-[20%] sm:before:w-[25%] md:before:w-[31%]
              after:right-1 after:top-[50%] after:absolute after:bg-slate-200 after:h-[1px] after:w-[20%] sm:after:w-[25%] md:after:w-[31%]"
          >
           Bạn là khách hàng mới?
          </span>
          <Link
            href="/auth/register"
            className="flex items-center justify-center w-full mt-4 button-orange  py-[0.5rem] text-sm text-gray-900 active:from-amazon-orange active:to-yellow-200 "
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
