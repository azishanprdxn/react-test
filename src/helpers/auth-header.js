export function authHeader() {
  // return authorization header with test token
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}