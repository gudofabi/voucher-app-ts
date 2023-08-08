export default (to: any, from: any, next: any) => {
  const token = sessionStorage.access_token
    ? sessionStorage.access_token
    : null;
  const roles = sessionStorage.roles
    ? JSON.parse(sessionStorage.roles)
    : [];

  if (sessionStorage.authenticated && token) {
    if (to.meta.roles) {
      // check if user role is included in route meta roles
      const userHasAccess = to.meta.roles.some((role: any) => roles.includes(role));
      if (userHasAccess) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  } else {
    next({ name: 'login' });
  }
};

