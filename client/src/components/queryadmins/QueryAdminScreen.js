import React, { useState } from 'react';
import { Card } from 'antd';

import QueryScreen from '../numeralia/Registros/QueryScreen';
import QueryFullScreen from '../numeralia/Registros/QueryFullScreen';
import QueryWorkForce from '../numeralia/Registros/QueryWorkForce';
import NavbarUsers from '../ui/NavbarUsers';

const tabList = [
    
    {
        key: 'tab1',
        tab: 'Consulta homologada',
    },
    {
        key: 'tab2',
        tab: 'Consulta completa',
    },
    {
        key: 'tab3',
        tab: 'Consulta de personal',
    },   
];

const contentList = {     
    tab1: <QueryScreen />,  
    tab2: <QueryFullScreen />, 
    tab3: <QueryWorkForce />,
};

const QueryAdminScreen = () => {
  
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');

    const onTab1Change = key => {
        setActiveTabKey1(key);
    };

    return (
        <>
            <NavbarUsers />
            <Card
                style={{ width: '100%' }}
                //extra={<a href="#">More</a>}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={key => {
                onTab1Change(key);
                }}
            >
                {contentList[activeTabKey1]}
            </Card>
        </>
    )
}

export default QueryAdminScreen;