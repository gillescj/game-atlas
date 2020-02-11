import '../styles/GameCard.scss';
import React from 'react';
import Popup from 'reactjs-popup';

const GameCard = ({ game }) => {
    let gameCard;

    const imageId = game.cover.image_id;
    const imageSize = 'cover_big';
    const imageURL = `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imageId}.jpg`;
    gameCard = <img src={imageURL} alt={game.name} />;

    return (
        <div className="item">
            <Popup
                trigger={<div className="game-card">{gameCard}</div>}
                position="top center"
                on="hover"
                repositionOnResize={true}
            >
                <div>
                    <h3>{game.name}</h3>
                    <h2>{game.rating ? Math.round(game.rating, 0) : null}</h2>
                </div>
            </Popup>
        </div>
    );
};

export default GameCard;
