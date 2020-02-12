import '../styles/Footer.scss';
import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <h3 className="attribution">
                Made possible with{' '}
                <a target="_blank" href="https://api-docs.igdb.com">
                    IGDB
                </a>
            </h3>
        </footer>
    );
};

export default Footer;
