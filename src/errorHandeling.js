function errorToDisplay(err) {
  const code = JSON.parse(JSON.stringify(err)).status;
  let msg;
  switch (code) {
    case 401:
        msg = "Unauthorized. Wrong email or password";
      break;
    case 400:
        msg = "Can not do this action";
      break;
    case 500:
        msg = "Internal Server Error. Please try again";
      break;
    case 404:
        msg = "Page not found";
      break;
    default:
        msg = "Internal Server Error. Please try again";
  }
  return msg
}

export default errorToDisplay
