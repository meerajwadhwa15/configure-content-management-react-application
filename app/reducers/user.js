let newUsers = null;
export const UserReducer = (user = [], actions) => {
    switch (actions.type) {
        case 'ADD_USER':
            return [...user, actions.payload];
            break;
        case 'LIST_USER':
        return (actions.payload)?[...actions.payload]:[];
            break;
        case 'DELETE_USER':
            newUsers = [...user];
            for (let i in newUsers) {
                if (newUsers[i]._id == actions.id) {
                    newUsers.splice(i, 1);
                    break;
                }
            }
            return newUsers;
            break;
        case 'UPDATE_USER':
            newUsers = [...user];
            for (let i in newUsers) {
                if (newUsers[i]._id == actions.payload.id) {
                    for(let j in actions.payload) {
                        newUsers[i][j] = actions.payload[j];
                    }
                    break;
                }
            }
            return newUsers;
            break;
        default:
            return user;
    }
};