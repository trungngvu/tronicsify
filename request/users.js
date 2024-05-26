import axios from "axios";

export const saveAddress = async (address) => {
  try {
    const { data } = await axios.post("/api/user/saveaddress", {
      address,
    });
    return data;
  } catch (error) {
    console.log("error >>>", error.response.data.message);
  }
};

export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put("/api/user/manageaddress", {
      id,
    });
    return data;
  } catch (error) {
    console.log("error >>>", error.response.data.message);
  }
};

export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete("/api/user/manageaddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    console.log("error >>>", error.response.data.message);
  }
};
