import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser, getProfessions, login } from "../../services/services.js";
import { BloqueInputLabel, Botonera } from "../index.js";
import "./RegisterScreen.css";
import { AppContext } from "../../Components/appContext/AppContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterScreen = () => {
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUserLogged } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const navigate = useNavigate();

  const handleGetProfessions = async () => {
    try {
      const response = await getProfessions();
      if (response.status === 200) {
        setProfessions(response.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching professions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProfessions();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    last_name: Yup.string().required("El apellido es obligatorio"),
    professionId: Yup.string().required("Seleccione una categoría"),
    sexo: Yup.string().required("Seleccione un género"),
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
    repetir: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Debe confirmar su contraseña"),
  });

  const handleSubmit = async (values) => {
    const userData = {
      name: values.name,
      last_name: values.last_name,
      image: "",
      birthdate: "",
      description: "",
      password: values.password,
      email: values.email,
      tel: "",
      Instagram: `@${values.name}`,
      professionId: values.professionId,
      sexo: values.sexo,
    };

    try {
      const createUserResponse = await createUser(userData);

      if (createUserResponse.status === 200) {
        const loginResponse = await login({
          email: values.email,
          password: values.password,
        });

        if (loginResponse.status === 200) {
          console.log("Login successful:", loginResponse.data);
          setUserLogged(loginResponse?.data?.user);
          navigate("/");
        } else {
          console.error(
            "Error logging in:",
            loginResponse.status,
            loginResponse.data
          );
        }
      } else {
        console.error(
          "Error creating user:",
          createUserResponse.status,
          createUserResponse.data
        );
      }
    } catch (error) {
      console.error("Error en el registro o inicio de sesión:", error);
    }
  };

  const initialValues = {
    name: "",
    last_name: "",
    image: "",
    birthdate: "",
    description: "",
    password: "",
    email: "",
    tel: "",
    Instagram: "",
    professionId: "",
    sexo: "",
    repetir: "",
  };

  return (
    <section className="register">
      {loading ? (
        <div className="loader">Cargando profesiones...</div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, isValid, touched, errors }) => (
            <Form>
              <h2>Registrarse</h2>
              <div className="bloqueSuperior">
                <BloqueSuperior
                  professions={professions}
                  handleChange={handleChange}
                />
              </div>
              <div>
                <BloqueInputLabel
                  label={"Email"}
                  name="email"
                  component={Field}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="password-container">
                <label>Contraseña</label>
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="password-container">
                <label>Repetir contraseña</label>
                <Field
                  type={showRepeatPassword ? "text" : "password"}
                  name="repetir"
                  as={BloqueInputLabel}
                  fontSize={"23px"}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage
                  name="repetir"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <span>{"¿Ya estás registrado? "}</span>
                <NavLink to={"/login"}>{"Iniciar sesión"}</NavLink>
              </div>
              <Botonera
                isValid={
                  isValid &&
                  Object.keys(errors).length === 0 &&
                  Object.keys(touched).length > 0
                }
                touched={touched}
              />
            </Form>
          )}
        </Formik>
      )}
    </section>
  );
};

export default RegisterScreen;

const BloqueSuperior = ({ professions, handleChange }) => (
  <>
    <div className="par">
      <BloqueInputLabel label={"Nombre"} name="name" component={Field} />
      <ErrorMessage name="name" component="div" className="error" />
      <div className="inputLabel">
        <label>Categoria</label>
        <Field
          as="select"
          name="professionId"
          className="selector1"
          id="professionId"
          onChange={handleChange}
        >
          <option value="" label="Seleccione una categoría" />
          {professions
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((profession, index) => (
              <option key={index} value={profession.name}>
                {profession.name}
              </option>
            ))}
        </Field>
        <ErrorMessage name="professionId" component="div" className="error" />
      </div>
    </div>
    <div className="par">
      <BloqueInputLabel label={"Apellido"} name="last_name" component={Field} />
      <ErrorMessage name="last_name" component="div" className="error" />
      <div className="inputLabel">
        <label>Sexo</label>
        <Field
          as="select"
          name="sexo"
          className="selector1"
          onChange={handleChange}
        >
          <option value="" label="Seleccione su género" />
          <option value="MASCULINO">Masculino</option>
          <option value="FEMENINO">Femenino</option>
          <option value="NO ME IDENTIFICO CON NINGUNA DE LAS ANTERIORES">
            No me identifico con ninguna de las anteriores
          </option>
        </Field>
        <ErrorMessage name="sexo" component="div" className="error" />
      </div>
    </div>
  </>
);
