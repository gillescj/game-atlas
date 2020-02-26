import '../styles/GameCard.scss';
import React from 'react';
// import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    const coverId = game.cover.image_id;
    const coverSize = 'cover_big';
    const coverURL = `https://images.igdb.com/igdb/image/upload/t_${coverSize}/${coverId}.jpg`;

    const gameCard = (
        <Link to={{ pathname: `/games/${game.id}` }} className="game-card-link">
            <div className="game-card-content">
                <img src={coverURL} alt={game.name} />
                <div className="overlay">
                    <div className="overlay-content">
                        <h3 className="game-name">{game.name}</h3>
                        <h2 className="game-rating">
                            {game.rating ? Math.round(game.rating, 0) : null}
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    );

    const renderedGamePopup = <div className="game-card">{gameCard}</div>;

    return <div className="game-card-container">{renderedGamePopup}</div>;
};

export default GameCard;
