import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from "axios";
import "./Profile.css";
import { AppContext } from "../appContext/AppContext";
import { getProfessions, putUpdateUser } from "../../services/services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Botonera from "../Botonera/Botonera";
import { capitalizeFirstLetter, formatDate, getUserInitials } from "../../utils/utils";

const Profile = () => {
  const { isLogged, userLogged, setUserLogged } = useContext(AppContext);
  console.log(userLogged);
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl);
  //     console.log(selectedImage);
  //     document.querySelector(".profile-photo").src = imageUrl; // Actualizar la previsualización
  //   }
  // };
  const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);  // Actualiza el estado
  }
};

  const handleSubmit = async (values) => {
    console.log("first");
    console.log(values);
    const userData = {
      id: Number(userLogged.id),
      name: values.name || userLogged.name, 
      last_name: values.last_name || userLogged.last_name,
      image: selectedImage || userLogged.image,
      birthdate: values.birthdate || userLogged.birthdate,
      description:
        values.description ||
        userLogged.description ||
        `Soy ${userLogged.professionId}`,
      password: values.newPassword || userLogged.password,
      email: values.email || userLogged.email,
      tel: values.tel || userLogged.tel || "",
      Instagram:
        values.Instagram || userLogged.Instagram || `@${userLogged.name}`,
      professionId: values.professionId || userLogged.professionId, 
      // sexo: userLogged.sexo,
    };
    console.log(userData);

    try {
      const updateUserResponse = await putUpdateUser(userData);
      if (updateUserResponse.status === 200) {
        console.log(updateUserResponse.data.searchUpdateUser);
        setUserLogged(updateUserResponse.data.searchUpdateUser);
        Swal.fire({
          showCloseButton: true,
          icon: "success",
          title: "Actualización exitosa",
          text: "",
          showConfirmButton: false,
          timer: 5000,
        });
        //    navigate('/')
      }
    } catch (error) {
      console.error("Error en la actualizacion", error);
      Swal.fire({
        showCloseButton: true,
        icon: "error",
        title: error.response?.data?.error || "Fallo en la autenticación",
        text: "",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

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
    professionId: Yup.string().required("Las categorías son obligatorias"),
    //description: Yup.string().required("La descripción es obligatoria"),
    // birthdate: Yup.date().required("La fecha de nacimiento es obligatoria"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    // Instagram: Yup.string(),
    newPassword: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(15, "La contraseña no puede tener más de 15 caracteres")
      .matches(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .matches(/[0-9]/, "La contraseña debe contener al menos un número")
      .matches(/[\W_]/, "La contraseña debe contener al menos un símbolo"),
    repeatNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Las contraseñas deben coincidir"
    ),
  });

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-left">
          <h2>
            {capitalizeFirstLetter(userLogged?.name)}{" "}
            {capitalizeFirstLetter(userLogged?.last_name)}
          </h2>
          {selectedImage || userLogged?.image ? (
          <img
            src={selectedImage || userLogged?.image}
            alt="Imagen de perfil"
            className="profile-photo"
          />
        ) : (
          <div className="profile-initials-name">
            {getUserInitials(userLogged?.name, userLogged?.last_name)}
          </div>
        )}

        <button
          type="button"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Actualizar Foto
        </button>

        <input
          id="fileInput"
          type="file"
          name="image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
              <p className="memberSince"> Miembro desde {formatDate(userLogged.createdAt)}</p>
      </div>

        {/* <p>Miembro desde {user.joinDate}</p> */}

        <div className="profile-right">
          <h1>Editar Perfil</h1>
          <h2>Información de Usuario</h2>
          {userLogged && (
            <Formik
              initialValues={{
                name: userLogged.name || "",
                last_name: userLogged.last_name || "",
                professionId: userLogged.professionId || "",
                description: userLogged.description || "",
                birthdate: userLogged.birthdate || "",
                email: userLogged.email || "",
                Instagram: userLogged.Instagram || "",
                newPassword: "",
                repeatNewPassword: "",
              }}
              validationSchema={validationSchema}
              validateOnChange={true} // Asegura la validación al modificar un campo
              validateOnBlur={true} // Valida cuando el campo pierde el foco
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false); // Desactivar la espera del envío
              }}
            >
              {({ handleChange, isValid, touched, errors, values }) => (
                <Form>
                  <div className="form-profile">
                    <div className="columnLeft">
                      <label>Nombre</label>
                      <Field
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />

                      <label>Apellido</label>
                      <Field
                        type="text"
                        name="last_name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="error"
                      />

                      <div className="">
                        <label>Categoría</label>
                        <Field
                          as="select"
                          name="professionId"
                          className="selector1"
                          id="professionId"
                          onChange={handleChange}
                          value={userLogged.professionId} // Mostrar la categoría seleccionada
                        >
                          <option value="" label="Seleccione una categoría" />
                          {professions
                            ?.sort((a, b) => a.name.localeCompare(b.name))
                            .map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="professionId"
                          component="div"
                          className="error"
                        />
                      </div>
                      <label>Descripción</label>
                      <Field
                        as="textarea"
                        name="description"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="columnRight">
                      <label>Fecha de Nacimiento</label>
                      <Field
                        type="date"
                        name="birthdate"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="birthdate"
                        component="div"
                        className="error"
                      />

                      <label>Email</label>
                      <Field
                        type="email"
                        name="email"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />

                      <label>Instagram</label>
                      <Field
                        type="text"
                        name="Instagram"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="Instagram"
                        component="div"
                        className="error"
                      />

                      <label>Nueva Contraseña</label>
                      <Field
                        type="password"
                        name="newPassword"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="error"
                      />

                      <label>Repetir Nueva Contraseña</label>
                      <Field
                        type="password"
                        name="repeatNewPassword"
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="repeatNewPassword"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  {/* <button type="submit">Guardar Cambios</button> */}

                  {/* <button type="submit" disabled={!isValid || Object.keys(errors).length > 0}>
  Guardar Cambiosss
</button> */}

                  <Botonera
                    isValid={isValid && Object.keys(errors).length === 0}
                  />
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
