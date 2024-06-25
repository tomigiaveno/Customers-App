import { handleActions } from "redux-actions";
import { DELETE_CUSTOMER, 
    FETCH_CUSTOMERS, 
    INSERT_CUSTOMER, 
    UPDATE_CUSTOMER } from "../constants";

export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload], 
    [INSERT_CUSTOMER]: (state, action) => [...state, action.payload ],
    [UPDATE_CUSTOMER]: (state, action) => {
        const customerPayload = action.payload;
        const { id } = customerPayload;
        // [ { id: 1, name: '', ... }]
        const customers = state;
        const initialValue = [];
        const newCustomers = customers.reduce( ( acc, customer) => {
            if (customer.id === id) {
                return [...acc, ...customerPayload];
            } else {
                return [...acc, customer ];
            }
        }, initialValue);

        return newCustomers;
    },
    [DELETE_CUSTOMER]: (state, action) => state.filter(c => c.id !== action.payload)
}, []);

