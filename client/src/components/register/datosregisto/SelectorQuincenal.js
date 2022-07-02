import React from 'react'
import { DatePickerRM } from '../../datepickers/DatePickerRM'

const SelectorQuincenal = ({form, QuincenaYear}) => {
    return ( 
        <>
            <DatePickerRM form={form} QuincenaYear={QuincenaYear}/>
        </>
    )   
}

export default SelectorQuincenal
