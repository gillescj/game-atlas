import '../styles/GameDetail.scss';
import React from 'react';

const GameDetail = props => {
    // console.log(props);
    const game = props.location.game;
    // console.log(game.id);

    let renderedScreenshot;
    if (game.screenshots) {
        const screenshotId = game.screenshots[0].image_id;
        const screenshotSize = 'screenshot_big';
        const screenshotURL = `https://images.igdb.com/igdb/image/upload/t_${screenshotSize}/${screenshotId}.jpg`;

        renderedScreenshot = <img src={screenshotURL} alt={`${game.name} Gameplay`} />;
    } else {
        renderedScreenshot = null;
    }

    let renderedGenres;

    if (game.genres) {
        renderedGenres = game.genres.map(genre => {
            return <div key={genre.id}>{genre.name}</div>;
        });
    } else {
        renderedGenres = null;
    }

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'Septemper',
        'October',
        'November',
        'December'
    ];

    let releaseDateString;
    if (game.first_release_date) {
        const releaseDate = new Date(game.first_release_date * 1000);
        releaseDateString = `${releaseDate.getDate()} ${months[releaseDate.getMonth()]} 
        ${releaseDate.getFullYear()}`;
    } else {
        releaseDateString = 'Unknown';
    }

    return (
        <div className="game-detail">
            <header>
                <h1>{game.name}</h1>
            </header>
            <div className="game-modal-top-info">
                <div className="genres">{renderedGenres}</div>
                <div className="rating">
                    Rating: {game.rating ? Math.round(game.rating, 0) : '0'}
                </div>
                <div className="release-date">Released: {releaseDateString}</div>
            </div>
            <p className="summary">{game.summary}</p>
            <div className="screenshot">{renderedScreenshot}</div>
        </div>
    );
};

export default GameDetail;
