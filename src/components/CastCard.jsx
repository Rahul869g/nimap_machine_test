import React from 'react';
import '../ComponentCss/CastCard.css';

const CastCard = ({ image, name, character }) => {
  return (
    <div className="cast-card">
      <img src={image} alt={name} className="cast-image" />
      <div className="cast-info">
        <p className="cast-name">{name}</p>
        <p className="cast-character">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
