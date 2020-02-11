import React from 'react';

export default class SearchBar extends React.Component {
    state = { query: '' };

    onInputChange = event => {
        this.setState({ query: event.target.value });
    };

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.query);
    };

    render() {
        return (
            <div className="search-form-container">
                <form className="search-form" onSubmit={this.onFormSubmit}>
                    <div className="search">
                        <input
                            onChange={this.onInputChange}
                            value={this.state.query}
                            type="text"
                            placeholder="Search Games..."
                        />
                    </div>
                </form>
            </div>
        );
    }
}
