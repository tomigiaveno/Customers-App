import React, { Component } from "react";
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import CustomersActions from './CustomersActions';
import { setPropsAsInitial } from "../helpers/setPropsAsInitial";
import { CUSTOMER_EDIT } from "../constants/permissions";
import { accessControl } from './../helpers/accessControl';
import Prompt from './Prompt'; 

//const isRequired = value => (!value && "Este campo es requerido"
//);

const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
);
const validate = values => {
    const error = {};

    if (!values.name) {
        error.name = "El campo nombre es requerido";
    }

    if (!values.dni) {
        error.dni = "El Dni es un campo obligatorio"
    }
        return error;
};

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) => 
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));
class CustomerEdit extends Component {
   
    componentDidMount() { 
        if (this.txt) {
            this.txt.focus();
        }
     }

     renderField = ({ input, meta, type, field, label, name, withFocus}) => {
        const controls = {...input, value: input["value"] || "" }
        return (<div>
            <label htmlFor={name}>{field}</label>
            <input {...controls} 
            type={!type ? "text" : type} 
            ref={withFocus && (txt => this.txt = txt) }/>
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }
                </div>)
     };
    
    render() {
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
            return (
                <div>
                    <h2>Edición del cliente</h2>
                    <form onSubmit={handleSubmit}>
            
                            <Field 
                            withFocus
                            name="name" 
                            component={this.renderField}
                            label="Nombre"
                            parse={toUpper}
                            format={toLower}></Field>
            
                            <Field 
                            name="dni" 
                            component={this.renderField}
                            label="Dni"></Field>
            
                            <Field name="age" 
                            component={this.renderField} 
                            type="number"
                            validate={isNumber}
                            label="Edad" 
                            parse={toNumber}
                            normalize={onlyGrow}></Field>
                        <CustomersActions>
                            <button type="submit" disabled={pristine || submitting}>
                                Aceptar
                                </button>
                            <button type="button" disabled={submitting} onClick={onBack}>
                                Cancelar
                                </button>
                        </CustomersActions>
                        <Prompt
                        when={!pristine && !submitSucceeded }
                        message="Se perderán los datos si continúa"></Prompt>
                    </form>
                </div>
            );
    }
};

CustomerEdit.propTypes = {
name: PropTypes.string,
dni: PropTypes.string,
age: PropTypes.number,
onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm({ 
    form: 'CustomerEdit', 
validate
})(CustomerEdit);
export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm));