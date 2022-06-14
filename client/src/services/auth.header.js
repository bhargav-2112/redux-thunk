const authHeader = () => {
    const user =  JSON.parse(localStorage.getItem('user'));
    console.log("user", user);
    if(user && user.accessToken) {
        return { 'x-access-token': user.accessToken }
    }else{
        return {};
    }
}

export default authHeader;
// for Node.js Express back-end
// return { 'x-access-token': user.accessToken };