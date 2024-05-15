import { Form, Formik } from "formik";

import * as Yup from "yup";
import "yup-phone";

import ShippingInput from "./ShippingInput";

import { saveAddress } from "../../request/users";

const AddShipping = ({
  shipping,
  setShipping,
  setAddresses,
  initialValue,
  setSelectedAddress,
}) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
  } = shipping;

  const validate = Yup.object({
    lastName: Yup.string()
      .required("Vui lòng nhập họ")
      .max(20, "Họ không được vượt quá 20 ký tự"),
    firstName: Yup.string()
      .required("Vui lòng nhập tên")
      .max(20, "Tên không được vượt quá 20 ký tự"),
    phoneNumber: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      // .phone()
      .min(9, "Số điện thoại không được ít hơn 10 số")
      .max(12, "Số điện thoại không được vượt quá hơn 12 số"),
    state: Yup.string().required("Ô không được bỏ trống"),
    city: Yup.string().required("Ô không được bỏ trống"),
    zipCode: Yup.string().required("Ô không được bỏ trống"),
    address1: Yup.string().required("Ô không được bỏ trống"),
    address2: Yup.string(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const submitHandler = async () => {
    const res = await saveAddress(shipping);
    setAddresses(res.address);
    setSelectedAddress(initialValue);
    setShipping(initialValue);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName,
        lastName,
        phoneNumber,
        state,
        city,
        zipCode,
        address1,
        address2,
      }}
      validationSchema={validate}
      onSubmit={() => submitHandler()}
    >
      {(formik) => (
        <Form className="grid grid-cols-1 gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ShippingInput
              type="text"
              name="lastName"
              placeholder="*Họ"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              name="firstName"
              placeholder="*Tên"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ShippingInput
              type="text"
              name="state"
              placeholder="*Tỉnh/Thành phố"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              name="city"
              placeholder="*Quận/Huyện"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ShippingInput
              type="text"
              name="zipCode"
              placeholder="*Phường/xã"
              onChange={handleChange}
            />
            <ShippingInput
              type="text"
              name="phoneNumber"
              placeholder="*Số điện thoại"
              onChange={handleChange}
            />
          </div>
          <ShippingInput
            type="text"
            name="address1"
            placeholder="*Số nhà, tên đường"
            onChange={handleChange}
          />
          <ShippingInput
            type="text"
            name="address2"
            placeholder="*Chỉ dẫn thêm (gần cơ quan, trường học,...)"
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`mb-4 mx-3 py-4 rounded-xl bg-amazon-orange text-amazon-blue_dark font-bold bg-gradient-to-r from-amazon-orange to-yellow-300  hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-300  `}
          >
            Lưu địa chỉ
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddShipping;
