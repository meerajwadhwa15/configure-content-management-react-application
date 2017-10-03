let newConfigurations = null;
export const ConfigurationsReducer = (configurations = [], actions) => {
    switch (actions.type) {
        case 'ADD_CONFIGURATION':
            return [...configurations, actions.payload];
            break;
        case 'DELETE_CONFIGURATION':
            newConfigurations = [...configurations];
            for (let i in newConfigurations) {
                if (newConfigurations[i]._id == actions.id) {
                    newConfigurations.splice(i, 1);
                    break;
                }
            }
            return newConfigurations;
            break;
        case 'UPDATE_CONFIGURATION':
            newConfigurations = [...configurations];
            for (let i in newConfigurations) {
                if (newConfigurations[i]._id == actions.payload.id) {
                    for(let j in actions.payload) {
                        newConfigurations[i][j] = actions.payload[j];
                    }
                    break;
                }
            }
            return newConfigurations;
            break;
        case 'LIST_CONFIGURATION':
            return (actions.payload)?[...actions.payload]:[];
            break;
        case 'APPROVE_CONFIGURATION':
            newConfigurations = [...configurations];
            for (let i in newConfigurations) {
                if (newConfigurations[i]._id == actions.payload.id) {
                    newConfigurations[i].approve = true;
                    break;
                }
            }
            return newConfigurations;
            break;
        case 'PUBLISH_CONFIGURATION':
            for (let i in configurations) {
                if (configurations[i]._id == actions.payload.id) {
                    configurations[i].publish = true;
                    break;
                }
            }
            return [...configurations];
            break;
        default:
            return configurations;
    }
};