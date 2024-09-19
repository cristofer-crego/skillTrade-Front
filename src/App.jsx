import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { HomeScreen, RegisterScreen, LoginScreen, Profile } from "./index.js";
import { AppContext } from "./Components/appContext/AppContext.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Comunity from "./Components/Comunity/Comunity.jsx";
import MatchResults from "./Screens/MatchResults/MatchResults.jsx";


function App() {
const { userLogged } = useContext(AppContext);

  return (
    <Routes>
      <Route path={"/"} element={<HomeScreen />} />
      <Route path={"/login"} element={<LoginScreen />} />
      <Route path={"/sign-up"} element={<RegisterScreen />} />
	  <Route path={"/comunity"} element={<Comunity />} />
      {userLogged && <Route path={"/profile"} element={<Profile />} />}
      {userLogged && <Route path={"/match"} element={<MatchResults />} />}
	  <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
}

export default App;
