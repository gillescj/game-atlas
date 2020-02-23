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
                data: `fields name, rating, popularity, cover.*, screenshots.*, artworks.*, videos.video_id, genres.name, first_release_date, summary;
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
            const screenshotIndex = Math.floor(Math.random() * game.screenshots.length);
            const screenshotId = game.screenshots[screenshotIndex].image_id;
            const screenshotSize = '720p';
            const screenshotURL = `https://images.igdb.com/igdb/image/upload/t_${screenshotSize}/${screenshotId}.jpg`;

            renderedScreenshot = (
                <img src={screenshotURL} alt={`${game.name} Screenshot`} />
            );
        } else {
            renderedScreenshot = null;
        }

        let renderedGenres;

        if (game.genres) {
            const genresList = game.genres.map(genre => {
                return <li key={genre.id}>{genre.name}</li>;
            });
            renderedGenres = (
                <>
                    <h1>Genre</h1>
                    <ul>{genresList}</ul>
                </>
            );
        } else {
            renderedGenres = null;
        }

        let renderedRating;
        if (game.rating) {
            renderedRating = (
                <>
                    <h1>Rating</h1>
                    <h2>{Math.round(game.rating, 0)}</h2>
                </>
            );
        } else {
            renderedRating = null;
        }

        let renderedReleaseDate;
        if (game.first_release_date) {
            const releaseDate = new Date(game.first_release_date * 1000);
            const releaseDateString = `${releaseDate.getDate()} ${
                this.months[releaseDate.getMonth()]
            } ${releaseDate.getFullYear()}`;

            renderedReleaseDate = (
                <>
                    <h1>Release Date</h1>
                    <h2>{releaseDateString}</h2>
                </>
            );
        } else {
            renderedReleaseDate = null;
        }

        let renderedArtwork;
        if (game.artworks) {
            const artworkSize = 'screenshot_med';
            const artworkList = game.artworks.slice(0, 6).map(artwork => {
                const artworkURL = `https://images.igdb.com/igdb/image/upload/t_${artworkSize}/${artwork.image_id}.jpg`;
                return (
                    <img
                        key={artwork.image_id}
                        src={artworkURL}
                        alt={`${game.name} Artwork`}
                    />
                );
            });

            renderedArtwork = (
                <>
                    <h1>Artwork</h1>
                    <div className="artwork-list">{artworkList}</div>
                </>
            );
        }

        let renderedVideos;
        if (game.videos) {
            const videoList = game.videos.slice(0, 4).map(video => {
                const videoSrc = `https://www.youtube.com/embed/${video.video_id}`;
                return (
                    <iframe
                        key={video.video_id}
                        title="video player"
                        src={videoSrc}
                    ></iframe>
                );
            });
            renderedVideos = (
                <>
                    <h1>Videos</h1>
                    <div className="video-list">{videoList}</div>
                </>
            );
        } else {
            renderedVideos = null;
        }

        return (
            <>
                <header>
                    <h1>{game.name}</h1>
                </header>
                <div className="screenshot">{renderedScreenshot}</div>
                <div className="summary">
                    <h1>Summary</h1>
                    <p className="summary">{game.summary}</p>
                </div>
                <div className="genres">{renderedGenres}</div>
                <div className="rating">{renderedRating}</div>
                <div className="release-date">{renderedReleaseDate}</div>
                <div className="artwork">{renderedArtwork}</div>
                <div className="videos">{renderedVideos}</div>
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
