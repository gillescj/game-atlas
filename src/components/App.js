import React from 'react';
import igdb from '../apis/igdb';
import SearchBar from './SearchBar';
import Header from './Header';
import GameCardList from './GameCardList';

export default class App extends React.Component {
    state = { games: [] };

    componentDidMount() {
        this.onFormSubmit('witcher');
    }

    onFormSubmit = async query => {
        if (!query) return;
        try {
            const response = await igdb('games', {
                method: 'POST',
                data: `search "${query}"; fields name, rating, popularity, cover.*, screenshots.*, genres.name, first_release_date;
                limit 50;`
            });

            this.setState({ games: response.data });
            console.log(this.state.games);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className="container">
                <Header onFormSubmit={this.onFormSubmit} />
                <GameCardList games={this.state.games} />
            </div>
        );
    }
}
