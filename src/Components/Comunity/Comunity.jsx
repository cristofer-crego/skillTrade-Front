import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../appContext/AppContext";
import UserCard from "../HomeSections/userCard/UserCard";
import { NavHeader } from "../../Screens";
import "./Comunity.css";
import { getAllUsers } from "../../services/services";

const Comunity = () => {
  // const { userData, setUserData } = useContext(AppContext);
  const [allUsersData, setAllUsersData] = useState([]);
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
  return (
    <>
      <NavHeader />
      <section className="SectionUserCards" style={{ marginTop: "3rem" }}>
        <h3 className="comunity-title">
          Explora y conecta con los miembros que hacen <br /> nuestra comunidad
          increíble
        </h3>
        <div className="SectionUserCards-container">
          {allUsersData?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Comunity;
