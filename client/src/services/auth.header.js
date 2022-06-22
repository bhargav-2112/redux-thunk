const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // eslint-disable-next-line no-console
  console.log('user', user);
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  }
  return {};
};

export default authHeader;
// for Node.js Express back-end
// return { 'x-access-token': user.accessToken };
