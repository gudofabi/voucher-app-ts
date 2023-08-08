export default (to: any, from: any, next: any) => {
  const token = sessionStorage.access_token
    ? sessionStorage.access_token
    : null;
  if (sessionStorage.authenticated && token) {
    next({ name: "main" });
  } else {
    next();
  }
};