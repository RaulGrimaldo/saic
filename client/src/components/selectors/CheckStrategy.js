import React, { useEffect, useState } from 'react';
import { Form , Checkbox } from 'antd';

const CheckStrategy = (
    {value='NO', name, label, form} 
) => {


    const [checkSelect, setCheckSelect] = useState(false);

    const onCheckboxChange = (e) => {
        form.setFieldsValue({FechaF: null});

        form.setFieldsValue({
          fecharango: undefined
        });

        form.setFieldsValue({FechaI: null});

        form.setFieldsValue({
          FechaInicial: undefined
        });
        setCheckSelect(e.target.checked);
        form.setFieldsValue({
            [`${name}`]: e.target.checked
        });
    };


    useEffect(() => {
        form.setFieldsValue({
            [`${name}`]: false
        });
        if(value.toString() !== 'NO'){            
            setCheckSelect(true);
            form.setFieldsValue({
                [`${name}`]: true
            });
        }
        // eslint-disable-next-line
     }, []);
  return (
    <>

        <div className="col-md-auto text-center">
                <Form.Item
                    name={name}
                    label={label}                    
                >
                    <Checkbox checked={checkSelect}  onChange={onCheckboxChange} size="default">

                    </Checkbox>                   
                </Form.Item>       
            </div>     
    </>
  );
};

export default CheckStrategy;

