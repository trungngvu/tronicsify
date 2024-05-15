import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ErrorMessage, useField } from "formik";
const LoginInput = ({ icon, placeholder, type, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`flex mt-4 ${meta.touched && meta.error ? "error-input" : ""}`}
    >
      <label className="w-full font-semibold ">
        {icon === "email" ? (
          <div className="flex items-center mb-1">
            <PaperAirplaneIcon className="h-4 mr-1 -rotate-45" />
            Email
          </div>
        ) : icon === "password" ? (
          <div className="flex items-center mb-1">
            <LockClosedIcon className="h-4 mr-1" />
            {field.name === "conf_password"
              ? "Xác nhận mật khẩu mới"
              : field.name === "current_password"
              ? "Mật khẩu hiện tại"
              : field.name === "new_password"
              ? "Mật khẩu mới"
              : "Password"}
          </div>
        ) : icon === "user" ? (
          <div className="flex items-center mb-1">
            <UserIcon className="h-4 mr-1" />
            Họ và tên
          </div>
        ) : (
          ""
        )}
        <input
          type={type}
          // name={type}
          placeholder={placeholder}
          {...field}
          {...props}
          className="w-full p-2 text-sm border rounded outline-none placeholder:font-normal focus:shadow-amazon-orange"
        />
        {meta.touched && meta.error && (
          <div className="flex text-sm text-red-500">
            <ErrorMessage name={field.name} />
          </div>
        )}
      </label>
    </div>
  );
};

export default LoginInput;
