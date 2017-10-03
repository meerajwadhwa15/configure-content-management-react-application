export const AddConfiguration = (payload) => {
    return {
        type: 'ADD_CONFIGURATION',
        payload
    };
};

export const UpdateConfiguration = (payload) => {
    return {
        type: 'UPDATE_CONFIGURATION',
        payload
    };
};

export const DeleteConfiguration = (payload) => {
    return {
        type: 'DELETE_CONFIGURATION',
        id: payload.id
    };
};

export const ListConfiguration = (payload) => {
    return {
        type: 'LIST_CONFIGURATION',
        payload
    };
};

export const ApproveConfiguration = (payload) => {
    return {
        type: 'APPROVE_CONFIGURATION',
        payload
    };
};

export const PublishConfiguration = (payload) => {
    return {
        type: 'PUBLISH_CONFIGURATION',
        payload
    };
};

