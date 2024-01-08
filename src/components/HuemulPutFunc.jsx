import axios from "axios";

const huemulPutFunc = async (url, data, token, header) => {
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

    const response = await axios.put(url, data, { headers });
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  }
};

export default huemulPutFunc;
