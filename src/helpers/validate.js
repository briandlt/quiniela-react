const messageValidator = (regExp, typeValue, data, campos) => {
  let getName = '';
  const result = {
    isValid: true,
    message: '',
  };

  if (!campos) {
    getName = 'anteriores';
  }else if (campos.length === 1) {
    getName = campos;
  } else if (campos.length > 1)  {
    campos.forEach((name, index) => {
      if (campos.length === 2 && index === 0) {
        getName += `${name} `;
      } else if (campos.length - 1 === index) {
        getName += `y ${name}`;
      } else {
        getName += `${name}, `;
      }
    });
  }
  data.forEach((item) => {
    if (!regExp.test(item.trim())) {
      result.isValid = false;
      if (!campos) return result.message = "Todos los campos deben de ser numericos."
      result.message = (campos.length <= 1)
        ? `El campo ${getName} debe de contener ${typeValue}.`
        : `Los campos ${getName} deben de contener ${typeValue}.`;
    }
  });
  return result;
};
export const onlyNumbers = (data, campos = null) => {
  const regExp = /^([0-9],{0,}\.{0,})*$/;
  const typeValue = 'valores Numéricos';
  return messageValidator(regExp, typeValue, data, campos);
};

// all required acept one parameter when array
export const allRequired = (data) => {
  const result = {
    isValid: true,
    message: '',
  };
  data.forEach((item) => {
    if (item === '') {
      result.isValid = false;
      result.message = 'Todos los campos con * son requeridos';
    }
  });
  return result;
};
export const equalsPassword = (value1, value2) => {
  const result = {
    isValid: true,
    message: '',
  };
  if (value1 !== value2) {
    result.isValid = false
    result.message = 'Las contraseñas no coinciden'
  }
  return result
}
export const validFormateEmail = (email) => {
  const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/g;
  const result = {
    isValid: true,
    message: '',
  };
  if (!regExp.test(email)) {
    result.isValid = false;
    result.message = 'Verifica que el Correo contenga el formato correcto'
  }
  return result
}
export const validateUserName = (name) => {
  const result = {
    isValid: true,
    message: '',
  };
  const regExp = /^(([a-z]{1,})([0-9]{0,})+(_[a-z]{1,})+([0-9]{0,}))*$/g
  if (!regExp.test(name)) {
    result.isValid = false;
    result.message = `El usuario tiene que estar en mínusculas conformado por el nombre y el apellido paterno del usuario y opcionalmente se agrega un número al final. Por ejemplo "daniel_gonzalez" o "pedro_ramirez123"`
  }
  return result
}
// length in letters, numbers. Acept thow parameters 1- data when array 2- name inputs when array
export const maxLength = (data, campos) => {
  const regExp = /^([0-9]{10,10})*$/;
  const typeValue = '10 Numéros';
  return messageValidator(regExp, typeValue, data, campos);
};
/**
 * Validate longitude and latitude
 */
export const LatitudeLongitude = (data, campos) => {
  const regExp = /^-?([1-8]?[0-9]{1,2})\.{1}\d{1,6}/;
  const typeValue = 'el formato correcto ejemplo: latitud: 20.67537 longitud: -103.35898'
  return messageValidator(regExp, typeValue, data, campos);
}
// Go error
export const goError = () => {
  setTimeout(() => {
    window.location.href = '#error';
  }, 200);
};
// convert date yy-mm-dd to dd-mm-yy
export const convertDate = (date) => {
  let result;
  if (date) {
    const day = date.substring(0, 10).slice(8, 10);
    const month = date.substring(0, 10).slice(5, 7);
    const year = date.substring(0, 10).slice(0, 4);
    result = `${day}/${month}/${year}`;
  } else {
    result = '----';
  }
  return result;
};

/**
 * Verify if is valid yours rules
 * you need pass array of objec for than validate all rules are correct
 */
export const validationContainer = (objectValues) => objectValues.find(item => !item.isValid) || { isValid: true }