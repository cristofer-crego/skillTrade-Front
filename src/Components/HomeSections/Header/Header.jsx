import React, { useState, useContext } from "react";
import "./Header.css";
import { AppContext } from "../../appContext/AppContext";
import Swal from "sweetalert2";
import Selector from "../../Selector/Selector";
import { getUsersByNameDescripProf } from "../../../services/services";

const Header = () => {
  const { setNoUserFounded, setUsersSelectedByProfession } =
    useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para manejar el valor del input
  const [typingTimer, setTypingTimer] = useState(null); // Timer para manejar debounce

  const handleSearchChange = (e) => {
    let valor = e.target.value;
    setSearchTerm(valor); // Actualiza el valor del input

    if (typingTimer) {
      clearTimeout(typingTimer); // Limpiar el temporizador anterior
    }

    const newTimer = setTimeout(async () => {
      try {
        const response = await getUsersByNameDescripProf(valor);
        if (response.status === 200 && response.data.length > 0) {
          setUsersSelectedByProfession(response.data);
          setNoUserFounded(false);
        } else {
          setUsersSelectedByProfession([]);
          setNoUserFounded(true);
          showNoResultsAlert();
        }
        setSearchTerm(""); // Elimina el contenido del input después de la búsqueda
      } catch (error) {
        console.error("Error:", error);
        setUsersSelectedByProfession([]);
        setNoUserFounded(true);
        showNoResultsAlert();
        setSearchTerm(""); // Elimina el contenido del input incluso si hay un error
      }
    }, 500); // Esperar 500ms antes de ejecutar la búsqueda

    setTypingTimer(newTimer);
  };

  const showNoResultsAlert = () => {
    Swal.fire({
      showCloseButton: true,
      icon: "info",
      title: "No se encontraron usuarios disponibles",
      text: "Para la categoría seleccionada.",
      showConfirmButton: false,
      timer: 5000,
    });
  };

  return (
    <header className="home-header">
      <h2>Donde tu conocimiento es buscado</h2>
      <div className="search">
        <input
          type="text"
          placeholder="Busca un conocimiento que desees intercambiar"
          value={searchTerm} // Vínculo al valor del estado
          onChange={handleSearchChange}
        />
        {/* <span className="icon">🔍</span> */}
      </div>
      <Selector />
    </header>
  );
};

export default Header;
