import React, { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../../services/services";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import { capitalizeFirstLetter } from "../../../utils/utils";
import "./Matching.css";
import Reviews from "../Reviews/Reviews";
import { AppContext } from "../../appContext/AppContext";
import { NavLink } from "react-router-dom";

const Matching = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [deniedUsers, setDeniedUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userActive, setUserActive] = useState(allUsersData[0]);
  const { isLogged, userLogged, acceptedUsers, setAcceptedUsers } = useContext(AppContext);

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
    if (allUsersData.length > 0 && currentIndex < allUsersData.length) {
      setUserActive(allUsersData[currentIndex]);
    }
  }, [currentIndex, allUsersData]);

  const handleAccepted = () => {
    const currentUser = allUsersData[currentIndex];
    setAcceptedUsers([...acceptedUsers, currentUser]);
    setCurrentIndex(currentIndex + 1); // Aumenta el índice después de aceptar
  };

  const handleDenied = () => {
    const currentUser = allUsersData[currentIndex];
    setDeniedUsers([...deniedUsers, currentUser]);
    setCurrentIndex(currentIndex + 1); // Aumenta el índice después de denegar
  };

  return (
    <>
      {isLogged ? (
        <section className="matching">
          <h3>¡Matchea tus conocimientos!</h3>
          <div className="matchingCard-container">
            <div className="matchingCard-left">
              {deniedUsers.slice(-1).map((user, index) => (
                <div
                  key={user?.id || index}
                  className="matchingCard-containerImage"
                >
                  <figure
                    className="matchingCard-containerImage"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.0)), url(${
                        user?.image || "default-image-url.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></figure>
                  <article className="matchingCard-info">
                    <p className="matchingCard-name">
                      {capitalizeFirstLetter(user?.name) ||
                        "Nombre no disponible"}
                    </p>
                    <p className="matchingCard-category">
                      {user?.Profession?.name || "Categoría no disponible"}
                    </p>
                    <article className="matchingCard-buttonsMatching">
                      <button
                        className="matchingCard-buttons close"
                        style={{ fontSize: "3rem", cursor: "auto" }}
                      >
                        <IoIosCloseCircle />
                      </button>
                    </article>
                  </article>
                </div>
              ))}
            </div>

            <div className="matchingCard-middle">
              {allUsersData.length > 0 && currentIndex < allUsersData.length ? (
                <div
                  key={allUsersData[currentIndex]?.id}
                  className="matchingCard-containerImage"
                >
                  <figure
                    className="matchingCard-containerImage"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.0)), url(${
                        allUsersData[currentIndex]?.image ||
                        "default-image-url.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></figure>
                  <article className="matchingCard-info">
                    <p className="matchingCard-name">
                      {capitalizeFirstLetter(
                        allUsersData[currentIndex]?.name
                      ) || "Nombre no disponible"}
                    </p>
                    <p className="matchingCard-category">
                      {allUsersData[currentIndex]?.Profession?.name ||
                        "Categoría no disponible"}
                    </p>
                    <article className="matchingCard-buttonsMatching">
                      <button
                        onClick={handleDenied}
                        className="matchingCard-buttons close"
                      >
                        <IoIosCloseCircle />
                      </button>
                      <button
                        onClick={handleAccepted}
                        className="matchingCard-buttons check"
                      >
                        <AiFillCheckCircle />
                      </button>
                    </article>
                  </article>
                </div>
              ) : (
                <div className="math-link">
                <p>¡Match completado!</p>
                <NavLink to='/match' className='matchBtn'>Ver Mi Match</NavLink>
                </div>
              )}
            </div>

            <div className="matchingCard-right">
              {acceptedUsers.slice(-1).map((user, index) => (
                <div
                  key={user?.id || index}
                  className="matchingCard-containerImage"
                >
                  <figure
                    className="matchingCard-containerImage"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.0)), url(${
                        user?.image || "default-image-url.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></figure>
                  <article className="matchingCard-info">
                    <p className="matchingCard-name">
                      {capitalizeFirstLetter(user?.name) ||
                        "Nombre no disponible"}
                    </p>
                    <p className="matchingCard-category">
                      {user?.Profession?.name || "Categoría no disponible"}
                    </p>
                    <article className="matchingCard-buttonsMatching">
                      <button
                        className="matchingCard-buttons check"
                        style={{ fontSize: "3rem", cursor:'auto' }}
                      >
                        <AiFillCheckCircle />
                      </button>
                    </article>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <Reviews userActive={userActive} className="matchingCard-reviews" />
        </section>
      ) : null}
    </>
  );
};

export default Matching;
