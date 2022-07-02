import React, { useState } from 'react';
import { Card } from 'antd';

import RubrosScreen from './RubrosScreen';
import NavbarUsers from '../ui/NavbarUsers';

const tabList = [
    
    {
        key: 'tab1',
        tab: 'Resumen de análisis',
    } 
];

const contentList = {     
    tab1: <RubrosScreen />, 
};

const AgreggateScreen = () => {
  
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

export default AgreggateScreen;