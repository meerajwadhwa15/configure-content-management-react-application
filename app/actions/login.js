export const LoginSuccess = (payload) => {
    let userDetail = {
        type: 'LOGIN_SUCCESS',
        user: payload.user,
        token: payload.token
    };
    localStorage.setItem('userDetail', JSON.stringify(userDetail));
    return userDetail;
};

export const Logout = () => {
    let userDetail = {
        type: 'LOGOUT'
    };
    localStorage.removeItem('userDetail');
    return userDetail;
};