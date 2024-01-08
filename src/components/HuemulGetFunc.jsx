import axios from "axios";

const huemulGetFunc = async (url, token, header) => {
  try {
    let headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    if (header) {
      headers = {
        ...headers,
        ...header,
      };
    }

    const response = await axios.get(url, { headers });
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response;
    } else {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  }
};

export default huemulGetFunc;
