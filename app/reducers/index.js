import { combineReducers } from 'redux';
import { UserReducer } from './user';
import { UserDetailReducer } from './userDetail';
import { ConfigurationsReducer } from './configurations';

export const reducers = combineReducers({ ConfigurationsReducer, UserReducer, UserDetailReducer });