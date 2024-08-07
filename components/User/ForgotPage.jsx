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

const initialUser = {
  email: "",
  success: "",
  error: "",
};

const ForgotPage = ({ providers }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialUser);
  const { email, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email.")
      .email("Email không đúng định dạng."),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/forgot/", {
        email,
      });

      setUser({
        ...user,
        email: "",
        success: data.message,
        error: "",
      });

      setLoading(false);
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
      <div className="flex flex-col w-full px-4 pt-8 pb-16 mx-auto sm:w-3/5 md:w-3/5 lg:w-2/5 min-h-[65vh]">
        <div className="flex flex-col p-4 my-4 space-y-4 bg-white border rounded">
          <h3 className="text-xl font-bold">Quên mật khẩu</h3>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => forgotHandler()}
          >
            {(form) => (
              <Form>
                <LoginInput
                  id="input-email"
                  type="text"
                  icon="email"
                  name="email"
                  onChange={handleChange}
                />
                <ButtonInput type="submit" text="Xác nhận" />
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

export default ForgotPage;
