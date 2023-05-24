export function getToken() {
  return sessionStorage.getItem("access_token");
}

export const setHeaders = () => {
  const headers = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  return headers;
};
