import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/TechListItem/TechListItem.css';

// Import Actions
import { updateTechRequest, fetchTech, deleteTechRequest } from '../../TechAction';

// Import Selectors
import { getTech } from '../../TechReducer';

class TechEditPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.tech.content,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ content: event.target.value });
    }

    handleSubmit(event) {
        const cuid = this.props.tech.cuid;
        const content = this.state.content;
        this.props.dispatch(updateTechRequest({ cuid, content }));
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className={`${styles['single-post']} ${styles['post-detail']}`}>
                        <h3 className={styles['post-title']}>{this.props.tech.title}</h3>
                        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.tech.name}</p>
                        <textarea name={'body'} onChange={this.handleChange} value={this.state.content}></textarea>
                        <button type={'submit'} onSubmit={this.handleSubmit}><FormattedMessage id="saveTech" /></button>
                    </div>
                </form>
            </div>
        );
    }
}

// Actions required to provide data for this component to render in server side.
// call to store push data into finalState in server/server.js
TechEditPage.need = [params => {
    return fetchTech(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
    return {
        tech: getTech(state, props.params.cuid),
    };
}

TechEditPage.propTypes = {
    tech: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TechEditPage);
