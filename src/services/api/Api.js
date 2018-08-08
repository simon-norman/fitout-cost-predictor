import axios from 'axios';

export default class Api {
  constructor({ baseURL = '' }) {
    this.axios = axios.create({
      baseURL,
      responseType: 'json',
    });
  }
}
