import '../styles/Header.scss';
import React from 'react';
import SearchBar from './SearchBar';
import Loader from './Loader';

const Header = props => {
    return (
        <header className="main-header">
            <h1 className="title">Game Atlas</h1>
            <SearchBar onFormSubmit={props.onFormSubmit} />
            {props.loading ? <Loader /> : null}
        </header>
    );
};

export default Header;
