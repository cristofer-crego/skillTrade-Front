import React from "react";
import { NavLink } from "react-router-dom";
import "./Botonera.css";

const Botonera = ({ isValid, touched }) => {
  const allFieldsTouched =
    Object.keys(touched).length > 0 &&
    Object.values(touched).every((field) => field === true);

  const isButtonEnabled = isValid && allFieldsTouched;


  return (
    <div className="botonera">
      <NavLink to={"/"} className="boton">
        Volver
      </NavLink>
      <button
        className={`${
          isButtonEnabled ? "boton aceptar" : "boton boton-desactivado"
        }`}
        type="submit"
        disabled={!isButtonEnabled}
      >
        Aceptar
      </button>
    </div>
  );
};

export default Botonera;
