// Funciones útiles y flexibles

export const goTo = (e, navigate, url, state = {}) => {
  e.preventDefault();
  navigate(url, { state });
}

export const updateValue = (setFunction, event) => {
  setFunction(event.target.value);
}