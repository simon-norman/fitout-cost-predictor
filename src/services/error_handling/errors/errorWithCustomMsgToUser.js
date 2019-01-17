
export default class ErrorWithCustomMsgToUser extends Error {
  constructor() {
    super();
    
    this.customError = true;
    this.publicErrorMessage = 'So sorry, there\'s been an error - please contact us or try again later';
  }
}
