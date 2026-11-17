let accessToken = null;

export function getToken() {
  return accessToken;
}

export function saveToken(token) {
  accessToken = token;
}

export function removeToken() {
  accessToken = null;
}