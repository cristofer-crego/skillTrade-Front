import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAllUsers } from "../../services/services";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });
  const [noUserFounded, setNoUserFounded] = useState(false);
  const [professionCategorySelected, setProfessionCategorySelected] =
    useState(null);
  const [usersSelectedByProfession, setUsersSelectedByProfession] = useState(
    []
  );

  const [userLogged, setUserLogged] = useState(() => {
    const savedUserLogged = localStorage.getItem("userLogged");
    return savedUserLogged ? JSON.parse(savedUserLogged) : null;
  });

  const [acceptedUsers, setAcceptedUsers] = useState([]);
  


  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();

      if (response.status === 200) {
        setUserData(response.data);
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
    const checkToken = () => {
      const token = Cookies.get("token");
      setIsLogged(!!token); // Ajusta isLogged en base a la existencia del token
    };

    checkToken();
  }, [userLogged]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  useEffect(() => {
    if (userLogged) {
      localStorage.setItem("userLogged", JSON.stringify(userLogged));
    } else {
      localStorage.removeItem("userLogged");
    }
  }, [userLogged]);

  return (
    <AppContext.Provider
      value={{
        isLogged,
        setIsLogged,
        userData,
        setUserData,
        professionCategorySelected,
        setProfessionCategorySelected,
        usersSelectedByProfession,
        setUsersSelectedByProfession,
        noUserFounded,
        setNoUserFounded,
        userLogged,
        setUserLogged,
        acceptedUsers,
        setAcceptedUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
