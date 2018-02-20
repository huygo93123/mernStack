import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/TechListItem/TechListItem.css';

// Import Actions
import { updateTechRequest, fetchTech, fetchTechs } from '../../TechAction';

// Import Selectors
import { getTech } from '../../TechReducer';

class PostDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showUpdateTech: false,
        };
        this.toogleShowUpdate = this.toogleShowUpdate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state.content = '';
    }


    toogleShowUpdate() {
        this.setState({ showUpdateTech: true });
    }

    handleUpdate(cuid) {
        const content = this.state.content;
        this.props.dispatch(updateTechRequest({ cuid, content }));
        // this.setState(prevState => ({
        //     showUpdateTech: !prevState.showUpdateTech,
        // }));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        if (this.state.showUpdateTech) {
            return (
                <div>
                    <Helmet title={this.props.tech.title} />
                    <div className={`${styles['single-post']} ${styles['post-detail']}`}>
                        <h3 className={styles['post-title']}>{this.props.tech.title}</h3>
                        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.tech.name}</p>
                        <textarea value={this.props.tech.content} onChange={this.handleChange} />
                    </div>
                    <button onClick={this.handleUpdate(this.props.tech.cuid)}>Update</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Helmet title={this.props.tech.title} />
                    <div className={`${styles['single-post']} ${styles['post-detail']}`}>
                        <h3 className={styles['post-title']}>{this.props.tech.title}</h3>
                        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.tech.name}</p>
                        <p className={styles['post-desc']}>{this.props.tech.content}</p>
                    </div>
                    <button onClick={this.toogleShowUpdate}>Edit</button>
                </div>
            );
        }
    }
}

// Actions required to provide data for this component to render in server side.
// call to store push data into finalState in server/server.js
PostDetailPage.need = [params => {
    return fetchTech(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
    return {
        tech: getTech(state, props.params.cuid),
    };
}

PostDetailPage.propTypes = {
    tech: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
