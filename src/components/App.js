import '../styles/App.scss';

import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import igdb from '../apis/igdb';
import Header from './Header';
import GameCardList from './GameCardList';
import Footer from './Footer';
import GameDetail from './GameDetail';

export default class App extends React.Component {
    state = { games: [], searchType: 'query', loading: false };

    componentDidMount() {
        this.findPopularGames();
    }

    onSearchTypeChange = () => {
        this.setState(prevState => ({
            searchType: prevState.searchType === 'query' ? 'genreSelect' : 'query'
        }));
    };

    onFormSubmit = async query => {
        if (!query) return;
        try {
            this.setState({ loading: true });
            const response = await igdb('games', {
                method: 'POST',
                data: `search "${query}"; 
                fields name, rating, cover.*, genres.*;
                limit 40;
                where rating >= 0 & rating_count >= 0;`
            });
            this.setState({ loading: false, games: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    findPopularGames = async () => {
        try {
            this.setState({ loading: true });
            const response = await igdb('games', {
                method: 'POST',
                data: `fields name, rating, cover.*;
                limit 40;
                sort rating desc;
                where rating >= 88 & rating_count >= 200;`
            });
            this.setState({ loading: false, games: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    findGenre = async genreId => {
        try {
            this.setState({ loading: true });
            const response = await igdb('games', {
                method: 'POST',
                data: `fields name, rating, cover.*;
                limit 40;
                sort rating desc;
                where genres = (${genreId}) & rating_count >= 80;`
            });
            this.setState({ loading: false, games: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className="container">
                <HashRouter>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => (
                                <>
                                    <Header
                                        onFormSubmit={this.onFormSubmit}
                                        loading={this.state.loading}
                                        findPopularGames={this.findPopularGames}
                                        findGenre={this.findGenre}
                                        searchType={this.state.searchType}
                                        onSearchTypeChange={this.onSearchTypeChange}
                                    />
                                    <GameCardList
                                        games={this.state.games}
                                        loading={this.state.loading}
                                    />
                                </>
                            )}
                        />
                        <Route path="/games/:id" component={GameDetail} />
                    </Switch>
                    <Footer />
                </HashRouter>
            </div>
        );
    }
}
