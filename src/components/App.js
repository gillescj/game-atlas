import '../styles/App.scss';

import React from 'react';
import { HashRouter, BrowserRouter, Route } from 'react-router-dom';
import igdb from '../apis/igdb';
import Header from './Header';
import GameCardList from './GameCardList';
import Footer from './Footer';
import GameDetail from './GameDetail';

export default class App extends React.Component {
    state = { games: [], loading: false };

    componentDidMount() {
        // this.onFormSubmit('witcher');
        this.findPopularGames();
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

    findPopularGames = async () => {
        try {
            this.setState({ loading: true });
            const response = await igdb('games', {
                method: 'POST',
                data: `fields name, rating, popularity, cover.*, screenshots.*, genres.name, first_release_date, summary;
                limit 50; sort rating desc; where rating >= 88 & rating_count >= 300;`
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
                <HashRouter>
                    <Header
                        onFormSubmit={this.onFormSubmit}
                        loading={this.state.loading}
                    />
                    <Route
                        path="/"
                        exact
                        render={props => <GameCardList games={this.state.games} />}
                    />
                    <Route path="/games/:id" component={GameDetail} />

                    <Footer />
                </HashRouter>
            </div>
        );
    }
}
