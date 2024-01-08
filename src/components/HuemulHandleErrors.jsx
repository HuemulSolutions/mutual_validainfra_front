const huemulHandleErrors = (response) => {
  if (response === undefined) {
    console.log(
      "Error en la respuesta del servidor antes del catch undefined:",
      response
    );
    return;
  }
  if (response === null) {
    console.log(
      "Error en la respuesta del servidor antes del catch null:",
      response
    );
    return;
  }
  if (response.data === undefined) {
    console.log(
      "Error en la respuesta del servidor antes del catch undefined:",
      response
    );
    return;
  }
  if (response.data === null) {
    console.log(
      "Error en la respuesta del servidor antes del catch null:",
      response
    );
    return;
  }
  if (response.data.errors === undefined) {
    console.log(
      "Error en la respuesta del servidor antes del catch undefined:",
      response
    );
    return;
  }

  if (response.data.isSuccessful === false) {
    const responseTxt = response.data.errors[0].errorTxt;
    const matchResult = responseTxt.match(/\{(.*?)\}/);
    const dentroCorchetes = matchResult ? matchResult[1].split(",") : [];
    const mensajeError =
      dentroCorchetes.length > 0 ? dentroCorchetes.join(", ") : responseTxt;

    const mensajeNotify = () => (
      <div>
        {dentroCorchetes.length > 0 ? (
          <div>
            {dentroCorchetes.length === 1 ? (
              <b>Ups... Tu error es: </b>
            ) : (
              <b>Ups... Tus errores son: </b>
            )}
            {dentroCorchetes.map((item, index) => (
              <p key={index}>
                {index + 1}.- {item}
              </p>
            ))}
          </div>
        ) : (
          <p>{mensajeError}</p>
        )}
      </div>
    );

    return;
  }
  if (response.isSuccessful === true) {
    return;
  }
};

export default huemulHandleErrors;
