import React, { useEffect, useState } from 'react';

import { Form , Checkbox, Tooltip, Input} from 'antd';

const CheckInputDep = (
    {title="", value='NO', 
    message, placeholder, name, label, form}) => {

    const [checkSelect, setCheckSelect] = useState(false);

    

    useEffect(() => {
        form.validateFields([{name}]);
        // eslint-disable-next-line
      }, [checkSelect]);

    const onCheckboxChange = (e) => {
        form.setFieldsValue({
            [`${name}`]: undefined
        })
        setCheckSelect(e.target.checked);
    }; 

    useEffect(() => {
        if(value.toString() !== 'NO'){            
            setCheckSelect(true);
            form.setFieldsValue({
                [`${name}`]: value
            });
        }
        // eslint-disable-next-line
     }, []);

    return (
        <>
            
            <div className="col">
                    
                <Form.Item
                    name={name}
                    label={<Checkbox checked={checkSelect}  onChange={onCheckboxChange} size="default">
                    <Tooltip title={title}>
                     {label}
                    </Tooltip>
                    </Checkbox>}                    
                    rules={[
                        {
                            required:  checkSelect,
                            message: `${message}`
                        },
                    ]}
                >
                    <Input 
                        size="default" 
                        placeholder={placeholder} 
                        disabled={!checkSelect}
                    />                    
                </Form.Item>          
            </div>        
        </>
    )
}

export default CheckInputDep;
