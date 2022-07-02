import React from 'react';
import { SelectInd } from '../../selectors/SelectInd';

const JudElement = ({form, user}) => {
    return (
        <>
            <SelectInd
                form={form}
                direccion="DVC"
                message="JUD/SUB/DIR es requerido"
                placeholder="Seleccionar JUD/SUB/DIR"
                name="JUD"
                label="JUD/SUB/DIR"
                JUD={user ? user.jud : ''}
            />
        </>
    )
}

export default JudElement;
