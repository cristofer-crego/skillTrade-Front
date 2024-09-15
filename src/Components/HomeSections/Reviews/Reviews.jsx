import React from "react";
import "./Reviews.css";
import Masonry from "react-masonry-css";

function Card({ text, name, color }) {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      {/* <p className="card-name">{name}</p> */}
      <p className="card-text">{text}</p>
    </div>
  );
}

const Reviews = ({userActive}) => {

  const colors = ["rgba(2,0,36,1)", "rgba(0,212,255,1)", "#E3B55B", "rgba(57, 27, 148, 1)", "#444444"]; 
  const breakpointColumnsObj = {
    default: 5,
    1440: 6,
    1100: 5,
    700: 3,
    500: 2,
  };

  return (
    <div className="reviews">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {userActive?.Reviews?.map((review, index) => (
          <div        key={`${review.userId}-${index}`}  className="my-masonry-grid_item">
            <Card
              text={review.review}
              color={colors[index % colors.length]}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Reviews;
