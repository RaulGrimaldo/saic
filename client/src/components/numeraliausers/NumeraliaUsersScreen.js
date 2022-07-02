import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import RegisterScreen from '../register/RegisterScreen';
import EditUserScreen from '../editposvalidation/EditUserScreen';
import { v4 as uuidv4 } from 'uuid';
import NavbarUsers from '../ui/NavbarUsers';

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();

const tabList = [
    {
        key: 'tab1',
        tab: 'Hoy',
    }
];

const tabListSub = [
    {
        key: 'tab1',
        tab: 'Hoy',
    }
];

const tabListDir = [
    {
        key: 'tab1',
        tab: 'Hoy',
    }
];
    

const NumeraliaUsersScreen = (
    {   user,  
}) => {


    const contentList = {
        tab1: <RegisterScreen key={id1}/>,
        tab4: <EditUserScreen key={id4}/>,
      };
    const [activeTabKey1, setActiveTabKey1] = useState("tab1");

    const onTab1Change = key => {
        setActiveTabKey1(key);
    };

    return (
        <>
        <NavbarUsers />
            <Card
                size='small'
                style={{ width: '100%' }}
                //extra={<a href="#">More</a>}
                tabList={user?(Number(user.Nivel) > 2)?tabList:(Number(user.Nivel) === 2)?tabListSub:tabListDir:''}
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

const mapStateToProps = (state) => ({
    user: state.auth.user,
  });

export default connect(mapStateToProps, { })(NumeraliaUsersScreen);
