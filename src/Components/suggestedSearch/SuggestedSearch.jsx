import React, { useContext } from "react";
import "./SuggestedSearch.css";
import { AppContext } from "../appContext/AppContext";
import Swal from "sweetalert2";
import { getUsersByProfesion } from "../../services/services";
const SuggestedSearch = ({ filteredProfessions, onSuggestionClick }) => {
  const { setNoUserFounded, setUsersSelectedByProfession } =
    useContext(AppContext);

  const handleGetUsersByProfession = async (professionCategorySelected) => {
    try {
      const response = await getUsersByProfesion(professionCategorySelected);
      if (response.status === 200 && response.data.length > 0) {
        setUsersSelectedByProfession(response.data);
      } else {
        setUsersSelectedByProfession([]);
        setNoUserFounded(true);
        Swal.fire({
          showCloseButton: true,
          icon: "info",
          title: "No se encontraron usuarios disponibles",
          text: "Para la categoría seleccionada.",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setUsersSelectedByProfession([]);
      setNoUserFounded(true);
      Swal.fire({
        showCloseButton: true,
        icon: "info",
        title: "No se encontraron usuarios disponibles",
        text: "Para la categoría seleccionada.",
        showConfirmButton: false,
        timer: 5000,
      });
    }
    onSuggestionClick();
  };

  return (
    <>
      {filteredProfessions && filteredProfessions.length > 0 && (
        <div className="suggestion">
          {filteredProfessions.length > 0 && (
            <ul className="suggestion-ul">
              {filteredProfessions.map((profession, index) => (
                <li
                  key={index}
                  onClick={() => handleGetUsersByProfession(profession.name)}
                  className="suggestion-li"
                >
                  <figure>{profession.icon}</figure>
                  <p>{profession.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SuggestedSearch;
