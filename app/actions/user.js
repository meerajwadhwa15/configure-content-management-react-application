export const AddUser = (payload) => {
    return {
        type: 'ADD_USER',
        payload
    };
};

export const UpdateUser = (payload) => {
    return {
        type: 'UPDATE_USER',
        payload
    };
};

export const DeleteUser = (payload) => {
    return {
        type: 'DELETE_USER',
        id: payload.id
    };
};

export const UserList = (payload) => {
    return {
        type: 'LIST_USER',
        payload
    };
};