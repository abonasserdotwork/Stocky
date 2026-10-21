export function getErrorMessage(error) {
  // The server answered with an error (wrong password, validation, etc.)
  if (error.response) {
    return error.response.data?.message || "Something went wrong. Please try again.";
  }
  // The request never got an answer (server off, no internet)
  if (error.request) {
    return "Cannot reach the server. Please check your connection and try again.";
  }
  return "Something went wrong. Please try again.";
}