import PropTypes from 'prop-types';
import React from 'react';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importa useHistory desde react-router-dom
import { insertCustomer } from '../actions/insertCustomers';
import { SubmissionError } from 'redux-form';

const NewCustomerContainer = ({ insertCustomer }) => {
  const history = useNavigate(); // Usa useHistory como un hook para obtener el objeto history

  const handleSubmit = values => {
    return insertCustomer(values).then(response => {
      if (response.payload && response.payload.error) {
        throw new SubmissionError(response.payload);
      }
    });
  };

  const handleOnSubmitSuccess = () => {
    history.goBack(); // Navega atrás utilizando history.goBack()
  };

  const handleOnBack = () => {
    history.goBack(); // Navega atrás utilizando history.goBack()
  };

  const renderBody = () => (
    <CustomerEdit
      onSubmit={handleSubmit}
      onSubmitSuccess={handleOnSubmitSuccess}
      onBack={handleOnBack}
    />
  );

  return (
    <div>
      <AppFrame
        header={'Creación de nuevo cliente'}
        body={renderBody()}
      />
    </div>
  );
};

NewCustomerContainer.propTypes = {
  insertCustomer: PropTypes.func.isRequired,
};

export default connect(null, { insertCustomer })(NewCustomerContainer);
