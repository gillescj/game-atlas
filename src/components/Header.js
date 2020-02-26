import '../styles/Header.scss';
import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import Categories from './Categories';

const Header = props => {
    const renderSearchType = () => {
        if (props.searchType === 'query') {
            return <SearchBar onFormSubmit={props.onFormSubmit} />;
        } else {
            return (
                <Categories
                    findPopularGames={props.findPopularGames}
                    findGenre={props.findGenre}
                />
            );
        }
    };

    return (
        <header className="main-header">
            <Link to="/">
                <h1 className="title">Game Atlas</h1>
            </Link>
            {renderSearchType()}
            <button
                className="change-search-type"
                onClick={() => props.onSearchTypeChange()}
            >
                {props.searchType === 'query' ? 'Search by Genre' : 'Search by Name'}
            </button>
        </header>
    );
};

export default Header;
