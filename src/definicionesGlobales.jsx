export const EstadoFormulario = {
  edit: "edit",
  create: "create",
  filter: "filter",
  view: "view",
};

export const EstadoTabla = {
  normal: "normal",
  seleccion: "seleccion",
};

export const orgid = "AMANDA_DEM7";

export const urlBase = "https://af-mutual-valida-dev-001.azurewebsites.net/api";

export const dateToStringFormat = (date, dateDefault = undefined) => {
  if (date === null || date === undefined || date === "") {
    if (dateDefault === undefined) {
      return undefined;
    } else {
      date = dateDefault;
    }
  }

  const dateObject = new Date(date);

  const locale = window.navigator.language;

  // Formatear la fecha según el formato de fecha del sistema operativo
  const formattedDate = dateObject.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
};

export const stringUTCToStringLocal = (date, dateDefault) => {
  if (date === null || date === undefined || date === "") {
    if (dateDefault === undefined) {
      date = "1900-01-01T00:00:00.000Z";
    } else {
      date = dateDefault;
    }
  }

  const fecha = new Date(date);

  // Obtener el desplazamiento de la zona horaria en minutos y convertirlo a milisegundos
  const desplazamientoZonaHoraria = fecha.getTimezoneOffset() * 60000;

  // Ajustar la fecha al desplazamiento de la zona horaria
  const fechaLocal = new Date(fecha.getTime() - desplazamientoZonaHoraria);

  // Convertir a formato ISO pero sin 'Z' al final, ya que ya no es UTC
  const fechaLocalISO = fechaLocal.toISOString();

  return fechaLocalISO;
};

export const stringLocalToStringUTC = (date) => {
  if (date === null || date === undefined || date === "") {
    return undefined;
  }

  const fecha = new Date(date);

  // Obtener el desplazamiento de la zona horaria en minutos y convertirlo a milisegundos
  const desplazamientoZonaHoraria = fecha.getTimezoneOffset() * 60000;

  // Ajustar la fecha al desplazamiento de la zona horaria
  const fechaUTC = new Date(fecha.getTime() + desplazamientoZonaHoraria);

  // Convertir a formato ISO pero sin 'Z' al final, ya que ya no es UTC
  const fechaUTCISO = fechaUTC.toISOString();

  return fechaUTCISO;
};
