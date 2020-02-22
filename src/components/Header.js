import '../styles/Header.scss';
import React from 'react';
import SearchBar from './SearchBar';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <header className="main-header">
            <Link to="/">
                <h1 className="title">Game Atlas</h1>
            </Link>
            <SearchBar onFormSubmit={props.onFormSubmit} />
            {props.loading ? <Loader /> : null}
        </header>
    );
};

export default Header;
