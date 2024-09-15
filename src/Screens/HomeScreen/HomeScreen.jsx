import React from "react";

import {
  NavHeader,
  Header,
  MainUserCards,
  Matching,
  Footer,
} from "../index.js";

const HomeScreen = () => {
  return (
    <>
      <NavHeader />
      <main>
        <Header />
        <MainUserCards />
        <Matching />
      </main>
      <Footer />
    </>
  );
};

export default HomeScreen;
