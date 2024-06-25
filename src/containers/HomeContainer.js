import React  from 'react'
import { useNavigate } from 'react-router-dom'
import AppFrame from '../components/AppFrame';
import CustomersActions from '../components/CustomersActions';

const HomeContainer = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    console.log("handleOn Click");
    navigate('/customers');
    }
    return (
      <div>
        <AppFrame 
        header="home"
        body={
            <div>
                Esta es la pantalla inicial
                <CustomersActions>
                    <button onClick={handleOnClick}>Listado de Clientes</button>
                    
                </CustomersActions>
            </div>
        }></AppFrame>
      </div>
    );
  }

export default HomeContainer;
