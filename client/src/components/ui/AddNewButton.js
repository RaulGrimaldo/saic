import React from 'react';
import { Button, Tooltip } from 'antd';
const AddNewButton = ({ setVisible, setIsTableLoading="undefined", title, buttonTitle='Agregar' }) => {

  const confirmadd = () => {
    if(setIsTableLoading !== "undefined"){
      setIsTableLoading(true);
    }
    setVisible(true);
  }
  return (
    <Tooltip title={title}>
      <Button  size='default' onClick={() => confirmadd()}>
        {buttonTitle}
      </Button>
    </Tooltip>

  )
}

export default AddNewButton
