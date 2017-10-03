export const UserDetailReducer = (user = [], actions) => {
    switch (actions.type) {
        case 'LOGIN_SUCCESS':
            return {user: actions.user, token: actions.token};
            break;
        case 'LOGOUT':
            return [];
            break;
        default:
            return user;
    }
};