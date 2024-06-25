import { apiGet } from '../api';
import { urlCustomers } from '../api/urls';
import { FETCH_CUSTOMERS } from './../constants';
import { createAction } from 'redux-actions';

export const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(urlCustomers));