import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { professionsList } from "../HomeSections/Header/IconsList";
import { AppContext } from "../appContext/AppContext";
import Swal from "sweetalert2";
import { getAllUsers, getUsersByProfesion } from "../../services/services";

const Selector = () => {
  const listRef = useRef(null);
  const [allUsersData, setAllUsersData] = useState([]);
  const [orderedProfessionsList, setOrderedProfessionsList] = useState(
    professionsList
  );

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const {
    setNoUserFounded,
    setUsersSelectedByProfession,
  } = useContext(AppContext);

  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.status === 200) {
        setAllUsersData(response.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    if (allUsersData.length > 0) {
      const associatedProfessions = allUsersData
        .map((user) => user.Profession?.name)
        .filter(Boolean);

      const orderedList = [...professionsList].sort((a, b) => {
        const isAInAssociated = associatedProfessions.includes(a.name);
        const isBInAssociated = associatedProfessions.includes(b.name);

        if (isAInAssociated && isBInAssociated) return 0;
        if (isAInAssociated) return -1;
        if (isBInAssociated) return 1;
        return 0;
      });

      setOrderedProfessionsList(orderedList);
    }
  }, [allUsersData]); 

  useEffect(() => {
    handleGetAllUsers();
  }, []);

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
  };


  return (
    <div className="selector">
      <button
        className="selector__arrow selector__arrow--left"
        onClick={scrollLeft}
      >
        <IoIosArrowBack />
      </button>
      <ul className="selector__list" ref={listRef}>
        {orderedProfessionsList.map((profession, index) => (
          <li
            className="selector__item"
            key={index}
            onClick={() => handleGetUsersByProfession(profession.name)}
          >
            <span className="selector__icon">{profession.icon}</span>
            <span className="selector__name">{profession.name}</span>
          </li>
        ))}
      </ul>
      <button
        className="selector__arrow selector__arrow--right"
        onClick={scrollRight}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Selector;
