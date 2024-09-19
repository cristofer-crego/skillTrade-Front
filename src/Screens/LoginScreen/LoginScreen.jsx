import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BloqueInputLabel, Botonera } from "../index.js";
import "./LoginScreen.css";
import { login } from "../../services/services.js";
import { AppContext } from "../../Components/appContext/AppContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { setUserLogged, isLogged } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  
const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido")
      .min(8, "El email debe tener al menos 8 caracteres")
      .max(25, "El email no puede tener más de 25 caracteres")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(15, "La contraseña no puede tener más de 15 caracteres")
      .matches(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .matches(/[0-9]/, "La contraseña debe contener al menos un número")
      .matches(/[\W_]/, "La contraseña debe contener al menos un símbolo")
      .required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values);

      if (response.status === 200) {
        setUserLogged(response.data.user)
        navigate("/");
      } else {
        console.log("Error:", response.statusText);
        Swal.fire({
          showCloseButton: true,
          icon: "error",
          title: response.data.error || "Error de autenticación",
          text: "",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        showCloseButton: true,
        icon: "error",
        title: error.response?.data?.error || "Fallo en la autenticación",
        text: "",
        showConfirmButton: false,
        timer: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <div className="login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
       {({ handleChange, isValid, errors, touched, setTouched }) => {
          useEffect(() => {
            setTouched({
              email: true,
              password: true,
            });
          }, [setTouched]);

          return (
         
         <Form>
            <h2>Inicio de Sesión</h2>
            <div className="bloqueCentro">
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  as={BloqueInputLabel}
                  fontSize={"23px"}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div>
              <div className="password-container">
                <label htmlFor="password">Contraseña</label>
                <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    as={BloqueInputLabel}
                    fontSize={"23px"}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <span>{"¿No estás registrado? "}</span>
                <NavLink to={"/sign-up"}>{"Regístrate"}</NavLink>
              </div>
              <div>
                <NavLink
                  style={{ color: "black", textAlign: "start" }}
                  to={"/sign-up"}
                >
                  {"¿Olvidaste tu contraseña? "}
                </NavLink>
              </div>
            </div>
            <Botonera
              isValid={
                isValid &&
                Object.keys(errors).length === 0 &&
                Object.keys(touched).length > 0
              }
            />
          </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default LoginScreen;
