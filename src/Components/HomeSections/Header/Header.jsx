import React, { useContext, useRef, useState } from "react";

import "./Header.css";
import { professionsList } from "./IconsList";
import SuggestedSearch from "../../suggestedSearch/SuggestedSearch";
import Selector from "../../Selector/Selector";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfessions, setFilteredProfessions] = useState("");
  const [typingTimer, setTypingTimer] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    const newTimer = setTimeout(() => {
      handleSearchClick();
    }, 500);

    setTypingTimer(newTimer);
  };
  const handleSearchClick = () => {
    const results = professionsList.filter((profession) =>
      profession.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfessions(results);
    setShowSuggestions(true);

    // if (results.length === 0) {
    // }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSuggestionClick = () => {
    setSearchTerm("");
    setShowSuggestions(false);
  };

  return (
    <header className="home-header">
      <h2>Donde tu conocimiento es buscado</h2>
      <div className="search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Busca un conocimiento que desees intercambiar"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <span className="icon" onClick={handleSearchClick}>
          🔍
        </span>
        {showSuggestions && filteredProfessions.length > 0 && (
          <SuggestedSearch
            filteredProfessions={filteredProfessions}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>

      <Selector />
    </header>
  );
};

export default Header;
