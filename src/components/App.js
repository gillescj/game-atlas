import React from 'react';
import igdb from '../apis/igdb';
import Header from './Header';
import GameCardList from './GameCardList';
import Footer from './Footer';

export default class App extends React.Component {
    state = { games: [], loading: false };

    componentDidMount() {
        this.onFormSubmit('witcher');
    }

    onFormSubmit = async query => {
        if (!query) return;
        try {
            this.setState({ loading: true });
            const response = await igdb('games', {
                method: 'POST',
                data: `search "${query}"; fields name, rating, popularity, cover.*, screenshots.*, genres.name, first_release_date, summary;
                limit 50;`
            });
            this.setState({ loading: false, games: response.data });
            console.log(this.state);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className="container">
                <Header onFormSubmit={this.onFormSubmit} loading={this.state.loading} />
                <GameCardList games={this.state.games} />
                <Footer />
            </div>
        );
    }
}
