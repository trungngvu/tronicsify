import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginInput from "./LoginInput";
import * as Yup from "yup";
import ButtonInput from "./ButtonInput";
import axios from "axios";

import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";

const initialUser = {
  password: "",
  conf_password: "",
  success: "",
  error: "",
};

const ResetPage = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialUser);
  const { password, conf_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu mới.")
      .min(6, "Mật khẩu mới phải chứa ít nhất 6 ký tự.")
      .max(36, "Mật khẩu mới phải chứa ít hơn 36 ký tự."),
    conf_password: Yup.string()
      .required("Xác nhận lại mật khẩu.")
      .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp."),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset/", {
        userId,
        password,
      });

      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload();

      setUser({
        ...user,
        success: data.message,
        error: "",
        password: "",
        conf_password: "",
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setUser({
        ...user,
        success: "",
        error: error.response.data.message,
        password: "",
        conf_password: "",
      });
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className="flex flex-col w-full px-4 pt-8 pb-16 mx-auto sm:w-3/5 md:w-3/5 lg:w-2/5">
        <div className="flex flex-col p-4 my-4 space-y-4 bg-white border rounded">
          <h3 className="text-xl font-bold">Reset Password</h3>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => resetHandler()}
          >
            {(form) => (
              <Form>
                <LoginInput
                  id="input-password"
                  type="password"
                  icon="password"
                  name="password"
                  onChange={handleChange}
                />
                <LoginInput
                  id="input-conf-password"
                  type="password"
                  icon="password"
                  name="conf_password"
                  onChange={handleChange}
                />
                <ButtonInput type="submit" text="Đổi mật khẩu" />
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

export default ResetPage;
