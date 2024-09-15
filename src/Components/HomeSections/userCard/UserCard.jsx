import React, { useContext, useEffect, useState } from "react";
import "./userCard.css";
import { GoHeart } from "react-icons/go";
import { PiHeartDuotone } from "react-icons/pi";
import { capitalizeFirstLetter, truncate } from "../../../utils/utils";
import ModalComponent from "../../ModalComponent/ModalComponent";
import { useLocation, useNavigate } from "react-router-dom";
import UserModalProfile from "../UserModalProfile/UserModalProfile";
import { AppContext } from "../../appContext/AppContext";

const UserCard = ({ user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLogged } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(location.pathname);
  };
  const handleToProfile = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="userCard-container">
        <div className="userCard-containerImage"  onClick={() => handleToProfile()}>
          <figure
            className="userCard-containerImage"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.0)), url(${user?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></figure>
          <article className="userCard-info">
            <p className="userCard-name">{capitalizeFirstLetter(user?.name)}</p>
            <p className="userCard-category">
              {capitalizeFirstLetter(user?.Profession?.name)}
            </p>
          </article>
        </div>
        <article className="userCard-details">
          <p className="userCard-rating">
            {user?.Reviews?.length > 0 ? user.Reviews.length : "Sin"}{" "}
            <span>opiniones</span>
          </p>

          <p className="userCard-description">
            {user?.description
              ? capitalizeFirstLetter(truncate(user.description, 65))
              : null}
          </p>
        </article>
        {isLogged ? (
        <PiHeartDuotone
          className={
            isFavorite ? "userCard-heartIconActive" : "userCard-heartIcon"
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          
        /> ) : (
          null
                )}
      </div> 
      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}>
        <UserModalProfile user={user} />
      </ModalComponent>
    </>
  );
};

export default UserCard;
