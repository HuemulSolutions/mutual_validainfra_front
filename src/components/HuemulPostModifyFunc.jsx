import axios from "axios";

const huemulPostModifyFunc = async (url, data, base64, header) => {
  try {
    let headers = {
      Authorization: `Bearer ${base64}`,
    };

    if (header) {
      headers = {
        ...headers,
        ...header,
      };
    }

    const response = await axios.post(url, data, { headers });
    const responseData = response.data;
    return responseData;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      console.error("Error al realizar la solicitud POST:", error);
    }
  }
};

export default huemulPostModifyFunc;
