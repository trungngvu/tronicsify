import { useState } from "react";
import AddShipping from "./AddShipping";
import ListShipping from "./ListShipping";

const initialValue = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

const ShippingPage = ({
  user,
  addresses,
  setAddresses,
  setSelectedAddress,
  profile,
}) => {
  const [shipping, setShipping] = useState(initialValue);
  const [visible, setVisible] = useState(user?.address.length ? false : true);

  return (
    <>
      {!profile && (
        <div className="pb-2 mb-4 text-xl font-semibold border-b border-b-2 ">
          Shipping Information
        </div>
      )}
      <ListShipping
        visible={visible}
        setVisible={setVisible}
        addresses={addresses}
        setAddresses={setAddresses}
        user={user}
      />
      {visible && (
        <AddShipping
          shipping={shipping}
          setShipping={setShipping}
          addresses={addresses}
          setAddresses={setAddresses}
          initialValue={initialValue}
          setSelectedAddress={setSelectedAddress}
        />
      )}
    </>
  );
};

export default ShippingPage;
