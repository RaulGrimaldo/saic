import React from 'react';
import { Image } from 'antd';

const RecursosScreen = () => {
  return (

    <>
    <div className='col text-center'>
        <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/d/edit?mid=1lGS11BTFwqbUKBcUVfIynzcwUEfXZw9G&usp=sharing">
            <Image
            preview={false}
                width={50}
                src="https://seeklogo.com/images/N/new-google-maps-icon-logo-263A01C734-seeklogo.com.png"
            />
            <h6><p style={{color: "blue"}}>ETAPA 3</p></h6>
        </a>
    </div>
      
    </>

  )
}

export default RecursosScreen;