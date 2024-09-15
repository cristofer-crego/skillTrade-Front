import { BsWhatsapp } from "react-icons/bs";
import UserCard from "../userCard/UserCard";
import "./mainUserCards.css";
import { getAllUsers } from "../../../services/services";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { AppContext } from "../../appContext/AppContext";

const MainUserCards = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const {
    usersSelectedByProfession,
    setUsersSelectedByProfession,
    noUserFounded,
  } = useContext(AppContext);
  const sectionRef = useRef(null);

  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();

      if (response.status === 200) {
        setAllUsersData(response.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    if (usersSelectedByProfession.length > 0 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" }); // Desplazar con un efecto suave
    }
  }, [usersSelectedByProfession]);

  const usersToDisplay =
    usersSelectedByProfession.length > 0
      ? usersSelectedByProfession
      : allUsersData;

  return (
    <section ref={sectionRef} className="SectionUserCards">
      <h2>¡Busca, interactúa y aprende!</h2>
      <div className="SectionUserCards-container">
        {usersToDisplay.slice(0, 6).map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default MainUserCards;
