import '../styles/Header.scss';
import React from 'react';
import SearchBar from './SearchBar';

const Header = props => {
    return (
        <header className="main-header">
            <h1 className="title">Game Atlas</h1>
            <SearchBar onFormSubmit={props.onFormSubmit} />
        </header>
    );
};

export default Header;
