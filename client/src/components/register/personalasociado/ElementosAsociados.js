import React, { useEffect, useState } from 'react';
import { Form, Select , Checkbox, Tooltip} from 'antd';
import { getusers } from '../../../actions/usersdata';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';


const { Option } = Select;

const ElementosAsociados = (
    {   form, 
        getusers, 
        usersdata: { users }, 
        datospersona1='undefined', 
        datospersona2='undefined',
        datospersona3='undefined',
        datospersona4='undefined',
        datospersona5='undefined',
        datospersona6='undefined',
        datospersona7='undefined',
        datospersona8='undefined',
      } ) => { 

    // usar variables locales para evitar la propagación del efecto luego de la carga


//on mount useEffect
    useEffect(() => {
        getUsersEffect();
    }, []);

    //api calls functions ====>

    //get cases function
    const getUsersEffect = async () => {
        const response = await getusers();
    };
       

    // Datos a cargar en la tabla
    let options1 = [];

    if (users) {
        options1 = users;       
    } 
     

    const [checkSelect, setCheckSelect] = useState(false);
    const [checkSelect2, setCheckSelect2] = useState(false);
    const [checkSelect3, setCheckSelect3] = useState(false);
    const [checkSelect4, setCheckSelect4] = useState(false);
    const [checkSelect5, setCheckSelect5] = useState(false);//1
    const [checkSelect6, setCheckSelect6] = useState(false);
    const [checkSelect7, setCheckSelect7] = useState(false);
    const [checkSelect8, setCheckSelect8] = useState(false);

    const [elementValues2, setElementValues2] = useState([]);
    const [elementValues3, setElementValues3] = useState([]);
    const [elementValues4, setElementValues4] = useState([]);
    const [elementValues5, setElementValues5] = useState([]);
    const [elementValues6, setElementValues6] = useState([]);
    const [elementValues7, setElementValues7] = useState([]);
    const [elementValues8, setElementValues8] = useState([]);
    
    const [propagation, setPropagation] = useState(true);

    useEffect(() => {
        
        if( ((datospersona1 !== 'undefined') && (datospersona1 !== 'N/A')) && (propagation)){
            setCheckSelect(true);
            form.setFieldsValue({
                datospersona1: datospersona1
            });

            let value = form.getFieldValue('datospersona1');
            if( ( ( value !== undefined ) && ( (Number(options1.length) - 1) > 0) ) ){    

                const userIdSelected = value.split(',');
    
                let newoptions = users.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                //con esta opción salen los nombres pero en el cambio se corrige
                //aumentar proceso redefiniendo el filtro
                if(datospersona2 !== 'undefined'){
                    setElementValues2(newoptions);
                } else{
                    setPropagation(false);
                }               
    
            }
        } 
        // eslint-disable-next-line
    }, [users]);


    useEffect(() => {

        if(((datospersona2 !== 'undefined') && (datospersona2 !== 'N/A')) && (propagation) && (Number(elementValues2.length) !== 0)){

                setCheckSelect2(true);
                form.setFieldsValue({
                    datospersona2: datospersona2
                });
    
                let value = form.getFieldValue('datospersona2');
                if( ( ( value !== undefined ) && ( (Number(elementValues2.length) - 1) > 0) ) ){    
    
                    const userIdSelected = value.split(',');
        
                    let newoptions = elementValues2.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                                    
                    if(datospersona3 !== 'undefined'){
                        setElementValues3(newoptions);
                    } else{
                        setPropagation(false);
                    }
                }

        } 
        
        // eslint-disable-next-line
    }, [elementValues2]);

    useEffect(() => {
            
        if(((datospersona3 !== 'undefined') && (datospersona3 !== 'N/A')) && (propagation)){
            setCheckSelect3(true);
            form.setFieldsValue({
                datospersona3: datospersona3
            });

            let value = form.getFieldValue('datospersona3');
            if( ( ( value !== undefined ) && ( (Number(elementValues3.length) - 1) > 0) ) ){    

                const userIdSelected = value.split(',');
    
                let newoptions = elementValues3.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                if(datospersona4 !== 'undefined'){
                    setElementValues4(newoptions);
                } else{
                    setPropagation(false);
                }
    
            }
        } 
        
        // eslint-disable-next-line
    }, [elementValues3]);

    useEffect(() => {
            
        if((((datospersona4 !== 'undefined') && (datospersona4 !== 'N/A')) && (datospersona4 !== 'N/A')) && (propagation)){
            setCheckSelect4(true);
            form.setFieldsValue({
                datospersona4: datospersona4
            });

            let value = form.getFieldValue('datospersona4');
            if( ( ( value !== undefined ) && ( (Number(elementValues4.length) - 1) > 0) ) ){    

                const userIdSelected = value.split(',');
    
                let newoptions = elementValues4.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                if(datospersona5 !== 'undefined'){
                    setElementValues5(newoptions);
                } else{
                    setPropagation(false);
                }
    
            }
        } 
        
        // eslint-disable-next-line
    }, [elementValues4]);

    useEffect(() => {
            
        if(((datospersona5 !== 'undefined') && (datospersona5 !== 'N/A')) && (propagation)){
            setCheckSelect5(true); 
            form.setFieldsValue({
                datospersona5: datospersona5
            });

            let value = form.getFieldValue('datospersona5');
            if( ( ( value !== undefined ) && ( (Number(elementValues5.length) - 1) > 0) ) ){    

                const userIdSelected = value.split(',');
    
                let newoptions = elementValues5.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                if(datospersona6 !== 'undefined'){
                    setElementValues6(newoptions);
                } else{
                    setPropagation(false);
                }
    
            } 
        } 
        
        // eslint-disable-next-line
    }, [elementValues5]);

    
    useEffect(() => {
            
        if(((datospersona6 !== 'undefined') && (datospersona6 !== 'N/A')) && (propagation)){
            setCheckSelect6(true); 
            form.setFieldsValue({
                datospersona6: datospersona6
            });

            let value = form.getFieldValue('datospersona6');
            if( ( ( value !== undefined ) && ( (Number(elementValues6.length) - 1) > 0) ) ){    

                const userIdSelected = value.split(',');
    
                let newoptions = elementValues6.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                if(datospersona7 !== 'undefined'){
                    setElementValues7(newoptions);
                } else{
                    setPropagation(false);
                }
    
            } 
        } 
        
        // eslint-disable-next-line
    }, [elementValues6]);

    useEffect(() => {
            
        if(((datospersona7 !== 'undefined') && (datospersona7 !== 'N/A')) && (propagation)){
            setCheckSelect7(true); 
            form.setFieldsValue({
                datospersona7: datospersona7
            });

            let value = form.getFieldValue('datospersona7');
            if( ( ( value !== undefined ) && ( (Number(elementValues7.length) - 1) > 0) ) ){    

                const userIdSelected = value.split(',');
    
                let newoptions = elementValues7.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                if(datospersona8 !== 'undefined'){
                    setElementValues8(newoptions);
                } else{
                    setPropagation(false);
                }
    
            } 
        } 
        
        // eslint-disable-next-line
    }, [elementValues7]);

    useEffect(() => {
            
        if(((datospersona8 !== 'undefined') && (datospersona8 !== 'N/A')) && (propagation)){
            setCheckSelect8(true); 
            form.setFieldsValue({
                datospersona8: datospersona8
            });
            
            let value = form.getFieldValue('datospersona7');
            if( ( ( value !== undefined ) && ( (Number(elementValues8.length) - 1) > 0) ) ){    
                setTimeout(() => {
                    setPropagation(false);
                }, 0);
            }

        } 
        
        // eslint-disable-next-line
    }, [elementValues8]);

    const onCheckboxChange = (e) => {

        setCheckSelect(e.target.checked);
        form.setFieldsValue({
            datospersona1: undefined
        })
        
        if(!e.target.checked){
            setCheckSelect2(false);
            setCheckSelect3(false);
            setCheckSelect4(false);
            setCheckSelect5(false); //4
            setCheckSelect6(false);
            setCheckSelect7(false);
            setCheckSelect8(false);
            form.setFieldsValue({
                datospersona2: undefined,
                datospersona3: undefined,
                datospersona4: undefined,
                datospersona5: undefined,
                datospersona6: undefined,
                datospersona7: undefined,
                datospersona8: undefined,
            })
        }

        if(Number(options1.length) === 0){
            setCheckSelect(false);
        }
        
    }; 

    const handleElementValueChange1 = value => {   
           console.log(value)
        setCheckSelect2(false);
        setCheckSelect3(false);
        setCheckSelect4(false);
        setCheckSelect5(false); //5
        setCheckSelect6(false);
        setCheckSelect7(false);
        setCheckSelect8(false);

        form.setFieldsValue({
            datospersona2: undefined,
            datospersona3: undefined,
            datospersona4: undefined,
            datospersona5: undefined,
            datospersona6: undefined,
            datospersona7: undefined,
            datospersona8: undefined,
        });

        if( ( ( value !== undefined ) && ( (Number(options1.length) - 1) > 0) ) ){    

            const userIdSelected = value.split(',');

            let newoptions = users.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
            
            setElementValues2(newoptions);

        }
    };        

    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona1"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect]);       

    const onCheckboxChange2 = (e) => {
        
        if((checkSelect) && (!!form.getFieldValue('datospersona1'))){
            
            if( ((Number(elementValues2.length)) === 0 ) && ( (Number(options1.length) - 1) > 0 )){                

                const userIdSelected = form.getFieldValue('datospersona1').split(',');
    
                let newoptions = options1.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                setElementValues2(newoptions);
    
            }
            
            setCheckSelect2(e.target.checked)
            form.setFieldsValue({
                datospersona2: undefined
            })                        
            if(!e.target.checked){
                setCheckSelect3(false);
                setCheckSelect4(false);
                setCheckSelect5(false); //6
                setCheckSelect6(false);
                setCheckSelect7(false);
                setCheckSelect8(false);
                form.setFieldsValue({
                    datospersona3: undefined,
                    datospersona4: undefined,
                    datospersona5: undefined,
                    datospersona6: undefined,
                    datospersona7: undefined,
                    datospersona8: undefined,
                })
            } 

            if(Number(elementValues2.length) === 0){
                setCheckSelect2(false);
            }
        }
    }; 

    const handleElementValueChange2 = value => {
        
        setCheckSelect3(false);
        setCheckSelect4(false);
        setCheckSelect5(false); //7
        setCheckSelect6(false);
        setCheckSelect7(false);
        setCheckSelect8(false);

        form.setFieldsValue({
            datospersona3: undefined,
            datospersona4: undefined,
            datospersona5: undefined,
            datospersona6: undefined,
            datospersona7: undefined,
            datospersona8: undefined,
        });

        if( ( ( value !== undefined ) && ( (Number(elementValues2.length) - 1) > 0) ) ){  

            const userIdSelected = value.split(',');

            let newoptions = elementValues2.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
            
            setElementValues3(newoptions);

        }
    };

    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona2"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect2]);        

    const onCheckboxChange3 = (e) => {
        
        if((checkSelect2) && (!!form.getFieldValue('datospersona2'))){

            if( ((Number(elementValues3.length)) === 0 ) && ( (Number(elementValues2.length) - 1) > 0 )){                

                const userIdSelected = form.getFieldValue('datospersona2').split(',');
    
                let newoptions = elementValues2.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                setElementValues3(newoptions);
    
            }

            setCheckSelect3(e.target.checked);
            form.setFieldsValue({
                datospersona3: undefined
            })            
            if(!e.target.checked){
                setCheckSelect4(false);
                setCheckSelect5(false); //8
                setCheckSelect6(false);
                setCheckSelect7(false);
                setCheckSelect8(false);
                form.setFieldsValue({
                    datospersona4: undefined,
                    datospersona5: undefined,
                    datospersona6: undefined,
                    datospersona7: undefined,
                    datospersona8: undefined,
                })
            } 
        }


        if(Number(elementValues3.length) === 0){
            setCheckSelect3(false);
        }
    }; 

    const handleElementValueChange3 = value => {

        setCheckSelect4(false);
        setCheckSelect5(false); //9
        setCheckSelect6(false);
        setCheckSelect7(false);
        setCheckSelect8(false);
        form.setFieldsValue({
            datospersona4: undefined,
            datospersona5: undefined,
            datospersona6: undefined,
            datospersona7: undefined,
            datospersona8: undefined,
        });

        if( ( ( value !== undefined ) && ( (Number(elementValues3.length) - 1) > 0) ) ){   

            const userIdSelected = value.split(',');

            let newoptions = elementValues3.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
            
            setElementValues4(newoptions);

        }
    };
    
    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona3"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect3]);    

    const onCheckboxChange4 = (e) => {
        
        if((checkSelect3) && (!!form.getFieldValue('datospersona3'))){

            if( ((Number(elementValues4.length)) === 0 ) && ( (Number(elementValues3.length) - 1) > 0 )){                

                const userIdSelected = form.getFieldValue('datospersona3').split(',');
    
                let newoptions = elementValues3.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                setElementValues4(newoptions);
    
            }

            setCheckSelect4(e.target.checked);

            form.setFieldsValue({
                datospersona4: undefined
            })            
            if(!e.target.checked){
                setCheckSelect5(false); //10
                setCheckSelect6(false);
                setCheckSelect7(false);
                setCheckSelect8(false);
                form.setFieldsValue({
                    datospersona5: undefined,
                    datospersona6: undefined,
                    datospersona7: undefined,
                    datospersona8: undefined,
                })
            } 
        }

        if(Number(elementValues3.length) === 0){
            setCheckSelect3(false);
        }
    }; 

    const handleElementValueChange4 = value => {
        
        setCheckSelect5(false); //11
        setCheckSelect6(false);
        setCheckSelect7(false);
        setCheckSelect8(false);

        form.setFieldsValue({
            datospersona5: undefined,
            datospersona6: undefined,
            datospersona7: undefined,
            datospersona8: undefined,
        });

        if( ( ( value !== undefined ) && ( (Number(elementValues4.length) - 1) > 0) ) ){   

            const userIdSelected = value.split(',');

            let newoptions = elementValues4.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
            
            setElementValues5(newoptions);

        }
    };
    
    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona4"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect4]);    

    const onCheckboxChange5 = (e) => {
        
        if((checkSelect4) && (!!form.getFieldValue('datospersona4'))){

            if( ((Number(elementValues5.length)) === 0 ) && ( (Number(elementValues4.length) - 1) > 0 )){                

                const userIdSelected = form.getFieldValue('datospersona4').split(',');
    
                let newoptions = elementValues4.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                setElementValues5(newoptions);
    
            }

            setCheckSelect5(e.target.checked);
            form.setFieldsValue({
                datospersona5: undefined
            })            
            if(!e.target.checked){;
                setCheckSelect6(false);
                setCheckSelect7(false);
                setCheckSelect8(false);
                form.setFieldsValue({
                    datospersona6: undefined,
                    datospersona7: undefined,
                    datospersona8: undefined,
                })
            }             
        }

        if(Number(elementValues4.length) === 0){
            setCheckSelect5(false);
        }

    };         
    
    const handleElementValueChange5 = value => {
        
        setCheckSelect6(false);
        setCheckSelect7(false);
        setCheckSelect8(false);
        form.setFieldsValue({
            datospersona6: undefined,
            datospersona7: undefined,
            datospersona8: undefined,
        });

        if( ( ( value !== undefined ) && ( (Number(elementValues5.length) - 1) > 0) ) ){   

            const userIdSelected = value.split(',');

            let newoptions = elementValues5.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
            
            setElementValues6(newoptions);

        }

    };

    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona5"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect5]);

    const onCheckboxChange6 = (e) => {
        
        if((checkSelect5) && (!!form.getFieldValue('datospersona5'))){
            
            if( ((Number(elementValues6.length)) === 0 ) && ( (Number(elementValues5.length) - 1) > 0 )){                

                const userIdSelected = form.getFieldValue('datospersona5').split(',');
    
                let newoptions = elementValues5.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                setElementValues6(newoptions);
    
            }

            setCheckSelect6(e.target.checked);
            form.setFieldsValue({
                datospersona6: undefined
            })            
            if(!e.target.checked){;
                setCheckSelect7(false);
                setCheckSelect8(false);
                form.setFieldsValue({
                    datospersona7: undefined,
                    datospersona8: undefined,
                })
            } 
        }

        if(Number(elementValues5.length) === 0){
            setCheckSelect6(false);
        }
        
    };   
    
    const handleElementValueChange6 = value => {
        
        setCheckSelect7(false);
        setCheckSelect8(false);
        form.setFieldsValue({
            datospersona7: undefined,
            datospersona8: undefined,
        });

        if( ( ( value !== undefined ) && ( (Number(elementValues6.length) - 1) > 0) ) ){   

            const userIdSelected = value.split(',');

            let newoptions = elementValues6.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
            
            setElementValues7(newoptions);

        }

    };

    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona6"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect6]);    

    const onCheckboxChange7 = (e) => {
        
        if((checkSelect6) && (!!form.getFieldValue('datospersona6'))){

            if( ((Number(elementValues7.length)) === 0 ) && ( (Number(elementValues6.length) - 1) > 0 )){                

                const userIdSelected = form.getFieldValue('datospersona6').split(',');
    
                let newoptions = elementValues6.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                setElementValues7(newoptions);
    
            }

            setCheckSelect7(e.target.checked);
            form.setFieldsValue({
                datospersona7: undefined
            })            
            if(!e.target.checked){;
                setCheckSelect8(false);
                form.setFieldsValue({
                    datospersona8: undefined,
                })
            } 
        }

        if(Number(elementValues6.length) === 0){
            setCheckSelect7(false);
        }

    };


    const handleElementValueChange7 = value => {
        
        setCheckSelect8(false);

        form.setFieldsValue({
            datospersona8: undefined,
        });

        if( ( ( value !== undefined ) && ( (Number(elementValues7.length) - 1) > 0) ) ){   

            const userIdSelected = value.split(',');

            let newoptions = elementValues7.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
            
            setElementValues8(newoptions);

        }

    };
    
    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona7"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect7]);   

    const onCheckboxChange8 = (e) => {

        if((checkSelect7) && (!!form.getFieldValue('datospersona7'))){

            if( ((Number(elementValues8.length)) === 0 ) && ( (Number(elementValues7.length) - 1) > 0 )){                

                const userIdSelected = form.getFieldValue('datospersona7').split(',');
    
                let newoptions = elementValues7.filter(itemInArray => itemInArray._id !== userIdSelected[0]);
                
                setElementValues8(newoptions);
    
            }

            setCheckSelect8(e.target.checked);
            form.setFieldsValue({
                datospersona8: undefined
            })  
        }

        if(Number(elementValues7.length) === 0){
            setCheckSelect8(false);
        }

    };      
    
    useEffect(() => {
        setTimeout(() => {
            form.validateFields(["datospersona8"]);
        }, 0);
        // eslint-disable-next-line
    }, [checkSelect8]);


    return (
        <>
            
            <div className="row g-4 custom-collapse-content" >              
                
                <div className="col">
                        
                    <Form.Item
                        name="datospersona1"
                        label={<Checkbox checked={checkSelect}  onChange={onCheckboxChange}>
                        <Tooltip title="">
                            1
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect,
                                message: "Personal 1 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            onChange={handleElementValueChange1}
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 1"
                            showSearch    
                            size="default"
                        >
                            {options1 ? options1.map(user => (
                                <Option 
                                    key={user._id} 
                                    value={user._id +','+ user.username}>
                                    {user.username}
                                </Option>
                            )): ''}                          
                        </Select>
                    </Form.Item>          
                </div>  
               
                <div className="col">
                        
                    <Form.Item
                        name="datospersona2"
                        label={<Checkbox checked={checkSelect2}  onChange={onCheckboxChange2}>
                        <Tooltip title="">
                            2
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect2,
                                message: "Personal 2 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect2}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            onChange={handleElementValueChange2}
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 2"
                            showSearch    
                            size="default"
                        >
                             {elementValues2 ?elementValues2.map((user) => (
                                <Option 
                                key={user._id} 
                                value={user._id +','+ user.username}>
                                {user.username}
                            </Option>
                            )): ''}   
                        </Select>
                    </Form.Item>          
                </div>           
            </div>
 
            <div className="row g-4 custom-collapse-content" >              
                
                <div className="col">
                        
                    <Form.Item
                        name="datospersona3"
                        label={<Checkbox checked={checkSelect3}  onChange={onCheckboxChange3}>
                        <Tooltip title="">
                            3
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect3,
                                message: "Personal 3 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect3}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            onChange={handleElementValueChange3}
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 3"
                            showSearch    
                            size="default"
                        >
                            { elementValues3 ? elementValues3.map(user => (
                                <Option 
                                    key={user._id} 
                                    value={user._id +','+ user.username}>
                                    {user.username}
                                </Option>
                            )) : ''}    
                        </Select>
                    </Form.Item>          
                </div>  
               
                <div className="col">
                        
                    <Form.Item
                        name="datospersona4"
                        label={ <Checkbox checked={checkSelect4}  onChange={onCheckboxChange4}>
                        <Tooltip title="">
                            4
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect4,
                                message: "Personal 4 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect4}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            onChange={handleElementValueChange4}
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 4"
                            showSearch    
                            size="default"
                        >
                            { elementValues4 ? elementValues4.map(user => (
                                <Option 
                                    key={user._id} 
                                    value={user._id +','+ user.username}>
                                    {user.username}
                                </Option>
                            )) : ''}  
                        </Select>
                    </Form.Item>         
                </div>           
            </div>

            <div className="row g-4 custom-collapse-content" >              
               
                <div className="col">
                        
                    <Form.Item
                        name="datospersona5"
                        label={<Checkbox checked={checkSelect5}  onChange={onCheckboxChange5}>
                        <Tooltip title="">
                            5
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect5,
                                message: "Personal 5 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect5}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            onChange={handleElementValueChange5}
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 5"
                            showSearch    
                            size="default"
                        >
                            { elementValues5 ? elementValues5.map(user => (
                                <Option 
                                    key={user._id} 
                                    value={user._id +','+ user.username}>
                                    {user.username}
                                </Option>
                            )) : ''}  
                        </Select>
                    </Form.Item>          
                </div>  
               
                <div className="col">
                        
                    <Form.Item
                        name="datospersona6"
                        label={<Checkbox checked={checkSelect6}  onChange={onCheckboxChange6}>
                        <Tooltip title="">
                            6
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect6,
                                message: "Personal 6 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect6}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            onChange={handleElementValueChange6}
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 6"
                            showSearch    
                            size="default"
                        >
                            { elementValues6 ? elementValues6.map(user => (
                                <Option 
                                    key={user._id} 
                                    value={user._id +','+ user.username}>
                                    {user.username}
                                </Option>
                            )) : ''}  
                        </Select>
                    </Form.Item>          
                </div>           
            </div>

            <div className="row g-4 custom-collapse-content" >              
                
                <div className="col">
                        
                    <Form.Item
                        name="datospersona7"
                        label={<Checkbox checked={checkSelect7}  onChange={onCheckboxChange7}>
                        <Tooltip title="">
                            7
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect7,
                                message: "Personal 7 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect7}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            onChange={handleElementValueChange7}
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 7"
                            showSearch    
                            size="default"
                        >
                            { elementValues7 ? elementValues7.map(user => (
                                <Option 
                                    key={user._id} 
                                    value={user._id +','+ user.username}>
                                    {user.username}
                                </Option>
                            )) : ''}  
                        </Select>
                    </Form.Item>          
                </div>  

                <div className="col">
                        
                    <Form.Item
                        name="datospersona8"
                        label={ <Checkbox checked={checkSelect8}  onChange={onCheckboxChange8}>
                        <Tooltip title="">
                            8
                        </Tooltip>
                        </Checkbox>}                    
                        rules={[
                            {
                                required:  checkSelect8,
                                message: "Personal 8 requerido"
                            },
                        ]}
                    >
                        <Select 
                            allowClear
                            disabled={!checkSelect8}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="children"
                            notFoundContent={"No hay coincidencias"}
                            placeholder="Seleccionar personal 8"
                            showSearch    
                            size="default"
                        >
                            { elementValues8 ? elementValues8.map(user => (
                                <Option 
                                    key={user._id} 
                                    value={user._id +','+ user.username}>
                                    {user.username}
                                </Option>
                            )) : ''}    
                        </Select>
                    </Form.Item>          
                </div>           
            </div>
            
        </>
    )
}



ElementosAsociados.propTypes = {
    getusers: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};
  
const mapStateToProps = (state) => ({
    usersdata: state.usersdata,
    loading: state.auth.loading
});
  
export default connect(mapStateToProps, { getusers })(ElementosAsociados);