import axios from "axios";

const saToDeleteFunc = async (url, token, header) => {
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

    const response = await axios.delete(url, { headers });
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
  }
};

export default saToDeleteFunc;
