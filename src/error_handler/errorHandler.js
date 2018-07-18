
import { store } from './../store/store';

const generalErrorMessage = 'So sorry, there\'s been an error - please contact us or try again later';

const displayError = () => {
  store.commit('UPDATE_ERROR_MESSAGE', generalErrorMessage);
  store.commit('UPDATE_ERROR_STATUS', true);
};

const handleError = (error) => {
  displayError();
  console.log(error);
};

export { handleError };
