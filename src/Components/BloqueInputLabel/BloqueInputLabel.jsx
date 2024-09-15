import React from "react";
import { Field } from 'formik';
import './BloqueInputLabel.css';

const BloqueInputLabel = ({ label, type = 'text', name, fontSize }) => {
    return (
        <div className='inputLabel'>
            <label htmlFor={name} style={{ fontSize }}>{label}</label>
            <Field
                type={type}
                name={name}
                id={name}
                className='inputField'
            />
        </div>
    );
}

export default BloqueInputLabel;
