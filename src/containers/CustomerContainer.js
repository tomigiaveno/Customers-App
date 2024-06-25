import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import { Route, useParams, useNavigate } from 'react-router-dom'; // Importa useHistory desde react-router-dom
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { fetchCustomers } from '../actions/fetchCustomers';
import { updateCustomer } from '../actions/updateCustomer';
import { SubmissionError } from 'redux-form';
import { deleteCustomer } from '../actions/deleteCustomer';

const CustomerContainer = ({
  dni,
  customer,
  fetchCustomers,
  updateCustomer,
  deleteCustomer
}) => {
  const navigate = useNavigate(); // Usa useHistory como un hook para obtener el objeto history
  const { dni: customerDni } = useParams(); // Usa useParams para obtener los parámetros de la ruta

  useEffect(() => {
    if (!customer || customer.dni !== customerDni) {
      fetchCustomers();
    }
  }, [customer, customerDni, fetchCustomers]);

  const handleSubmit = values => {
    const { id } = values;
    return updateCustomer(id, values).then(response => {
      if (response.payload && response.payload.error) {
        throw new SubmissionError(response.payload.error);
      }
    });
  };

  const handleOnBack = () => {
    navigate.goBack(); // Navega atrás utilizando history.goBack()
  };

  const handleOnSubmitSuccess = () => {
    navigate.goBack(); // Navega atrás utilizando history.goBack()
  };

  const handleOnDelete = id => {
    deleteCustomer(id).then(() => {
      navigate.goBack(); // Navega atrás utilizando history.goBack()
    });
  };

  const renderCustomerControl = (isEdit, isDelete) => {
    if (customer) {
      const CustomerControl = isEdit ? CustomerEdit : CustomerData;
      return (
        <CustomerControl
          {...customer}
          onSubmit={handleSubmit}
          onSubmitSuccess={handleOnSubmitSuccess}
          onBack={handleOnBack}
          isDeleteAllow={!!isDelete}
          onDelete={() => handleOnDelete(customer.id)}
        />
      );
    }
    return null;
  };

  const renderBody = () => (
    <Route path="/customers/:dni/edit">
      {({ match: isEdit }) => (
        <Route path="/customers/:dni/edit">
          {({ match: isDelete }) => renderCustomerControl(isEdit, isDelete)}
        </Route>
      )}
    </Route>
  );

  return (
    <div>
      <AppFrame header={`Cliente ${dni}`} body={renderBody()} />
    </div>
  );
};

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.object,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props),
});

export default connect(mapStateToProps, {
  fetchCustomers,
  updateCustomer,
  deleteCustomer,
})(CustomerContainer);


