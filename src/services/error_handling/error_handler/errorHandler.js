
import { store } from './../../../store/store';

const genericErrorMessage = 'So sorry, there\'s been an error - please try again later';

const displayError = (errorMessage) => {
  store.commit('UPDATE_ERROR_MESSAGE', errorMessage);
  store.commit('UPDATE_ERROR_STATUS', true);
};

const handleError = (error) => {
  let errorMessage;
  if (error.message === 'Network Error') {
    errorMessage = 'So sorry, we\'re having trouble connecting to the internet' + 
    '- please check your connection, or try again later';
  } else if (error.isCustomError) {
    errorMessage = error.publicErrorMessage;
  } else {
    errorMessage = genericErrorMessage;
  }
  displayError(errorMessage);
  console.log(error);
};

export { handleError };
