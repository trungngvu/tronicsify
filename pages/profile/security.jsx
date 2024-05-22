import Layout from "@/components/profile/layout/Layout";
import ButtonInput from "@/components/User/ButtonInput";
import LoginInput from "@/components/User/LoginInput";
import db from "@/utils/db";
import axios from "axios";
import { Form, Formik } from "formik";
import { getSession } from "next-auth/react";
import { useState } from "react";
import * as Yup from "yup";
import DotLoaderSpinner from "../../components/loaders/dotLoader/DotLoaderSpinner";

const initialPassword = {
  current_password: "",
  new_password: "",
  conf_password: "",
  success: "",
  error: "",
};

const Security = ({ user, tab, orders }) => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState(initialPassword);
  const { current_password, new_password, conf_password, success, error } =
    newPassword;

  const validation = Yup.object({
    current_password: Yup.string()
      .required("Vui lòng nhập mật khẩu hiện tại")
      .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
      .max(36, "Mật khẩu phải ít hơn 36 ký tự"),
    new_password: Yup.string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(6, "Mật khẩu mới phải nhiều hơn 6 ký tự")
      .max(36, "Mật khẩu mới phải ít hơn 36 ký tự"),
    conf_password: Yup.string()
      .required("Vui lòng xác nhận lại mật khẩu")
      .oneOf([Yup.ref("new_password")], "Mật khẩu không trùng khớp"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const changePasswordHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/user/changepassword", {
        current_password,
        new_password,
      });
      // console.log(data)

      setNewPassword({
        new_password: "",
        current_password: "",
        conf_password: "",
        success: data.message,
        error: "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNewPassword({
        new_password: "",
        current_password: "",
        conf_password: "",
        success: "",
        error: error.response.data.message,
      });
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Layout user={user} tab={tab} title={`Đổi mật khẩu`}>
        <div className="text-center">
          <h2 className="mb-6 text-4xl font-bold">Đổi mật khẩu</h2>
        </div>
        <div className="mx-auto md:w-1/3">
          <Formik
            enableReinitialize
            initialValues={{
              current_password,
              new_password,
              conf_password,
            }}
            validationSchema={validation}
            onSubmit={() => changePasswordHandler()}
          >
            {(form) => (
              <Form>
                <LoginInput
                  id="current_password"
                  type="password"
                  icon="password"
                  name="current_password"
                  placeholder="Mật khẩu hiện tại"
                  onChange={handleChange}
                />

                <LoginInput
                  id="password"
                  type="password"
                  icon="password"
                  name="new_password"
                  placeholder="Mật khẩu mới"
                  onChange={handleChange}
                />
                <LoginInput
                  id="password-conf"
                  type="password"
                  icon="password"
                  name="conf_password"
                  placeholder="Mật khẩu mới"
                  onChange={handleChange}
                />
                <ButtonInput type="submit" text="Đổi mật khẩu" />
              </Form>
            )}
          </Formik>
          <div className="flex justify-center mt-2">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : success ? (
              <p className="text-green-500">{success}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Security;

export async function getServerSideProps(context) {
  db.connectDb();
  const { query } = context;
  const session = await getSession(context);
  const tab = query.tab || 0;

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  db.disconnectDb();
  return {
    props: {
      user: session?.user,
      tab,
    },
  };
}
