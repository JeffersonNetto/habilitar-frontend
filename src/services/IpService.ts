import axios from "axios";

const GetIp = async () => {
  try {
    const { data } = await axios.get("https://api.ipify.org?format=json");
    return data.ip.toString();
  } catch (error) {
    console.error("Problem fetching my IP", error);
  }
};

export default GetIp;
