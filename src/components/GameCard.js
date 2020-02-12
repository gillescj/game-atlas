import '../styles/GameCard.scss';
import React from 'react';
import Popup from 'reactjs-popup';

const GameCard = ({ game }) => {
    const coverId = game.cover.image_id;
    const coverSize = 'cover_big';
    const coverURL = `https://images.igdb.com/igdb/image/upload/t_${coverSize}/${coverId}.jpg`;

    const gameCard = <img src={coverURL} alt={game.name} />;

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

    const renderedGameModal = (
        <Popup
            trigger={
                <div>
                    {
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
                    }
                </div>
            }
            modal
            closeOnDocumentClick
            lockScroll
            contentStyle={{ width: '85%', overflowY: 'auto', maxHeight: '90vh' }}
        >
            {close => (
                <div className="game-modal">
                    <header>
                        <a className="close" onClick={close}>
                            &times;
                        </a>
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
            )}
        </Popup>
    );

    return <div className="game-card-container">{renderedGameModal}</div>;
};

export default GameCard;
