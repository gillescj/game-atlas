import '../styles/GameCard.scss';
import React from 'react';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    const coverId = game.cover.image_id;
    const coverSize = 'cover_big';
    const coverURL = `https://images.igdb.com/igdb/image/upload/t_${coverSize}/${coverId}.jpg`;

    const gameCard = (
        <Link to={{ pathname: `/games/${game.id}`, game: game }}>
            <img src={coverURL} alt={game.name} />
        </Link>
    );

    const renderedGamePopup = (
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
    );

    return <div className="game-card-container">{renderedGamePopup}</div>;
};

export default GameCard;
