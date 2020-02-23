import '../styles/GameDetail.scss';
import React from 'react';
import igdb from '../apis/igdb';
import Loader from './Loader';

class GameDetail extends React.Component {
    state = { game: {}, loading: false };

    months = [
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

    componentDidMount() {
        this.searchGameId(this.props.match.params.id);
    }

    searchGameId = async gameId => {
        try {
            this.setState({ loading: true });
            const response = await igdb('games', {
                method: 'POST',
                data: `fields name, rating, popularity, cover.*, screenshots.*, genres.name, first_release_date, summary;
                where id=${gameId};`
            });
            this.setState({ game: response.data[0], loading: false });
        } catch (error) {
            console.log(error);
        }
    };

    renderGameDetail = game => {
        let renderedScreenshot;
        if (game.screenshots) {
            const screenshotId = game.screenshots[0].image_id;
            const screenshotSize = 'screenshot_big';
            const screenshotURL = `https://images.igdb.com/igdb/image/upload/t_${screenshotSize}/${screenshotId}.jpg`;

            renderedScreenshot = (
                <img src={screenshotURL} alt={`${game.name} Gameplay`} />
            );
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

        let releaseDateString;
        if (game.first_release_date) {
            const releaseDate = new Date(game.first_release_date * 1000);
            releaseDateString = `${releaseDate.getDate()} ${
                this.months[releaseDate.getMonth()]
            }
        ${releaseDate.getFullYear()}`;
        } else {
            releaseDateString = 'Unknown';
        }

        return (
            <>
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
            </>
        );
    };
    render() {
        return (
            <div className="game-detail">
                {this.state.loading ? <Loader /> : this.renderGameDetail(this.state.game)}
            </div>
        );
    }
}

export default GameDetail;
