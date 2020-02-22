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

    // let renderedScreenshot;
    // if (game.screenshots) {
    //     const screenshotId = game.screenshots[0].image_id;
    //     const screenshotSize = 'screenshot_big';
    //     const screenshotURL = `https://images.igdb.com/igdb/image/upload/t_${screenshotSize}/${screenshotId}.jpg`;

    //     renderedScreenshot = <img src={screenshotURL} alt={`${game.name} Gameplay`} />;
    // } else {
    //     renderedScreenshot = null;
    // }

    // let renderedGenres;

    // if (game.genres) {
    //     renderedGenres = game.genres.map(genre => {
    //         return <div key={genre.id}>{genre.name}</div>;
    //     });
    // } else {
    //     renderedGenres = null;
    // }

    // const months = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July',
    //     'August',
    //     'Septemper',
    //     'October',
    //     'November',
    //     'December'
    // ];

    // let releaseDateString;
    // if (game.first_release_date) {
    //     const releaseDate = new Date(game.first_release_date * 1000);
    //     releaseDateString = `${releaseDate.getDate()} ${months[releaseDate.getMonth()]}
    //     ${releaseDate.getFullYear()}`;
    // } else {
    //     releaseDateString = 'Unknown';
    // }

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
