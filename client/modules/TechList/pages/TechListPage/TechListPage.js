import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import TechList from '../../components/TechList';
import TechCreatForm from '../../components/TechCreateForm/TechCreatForm';

// Import Actions
import { addTechRequest, fetchTechs, deleteTechRequest } from '../../TechAction';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getTechs } from '../../TechReducer';

class TechListPage extends Component {
    constructor(props) {
        super(props);
        this.state = { showAddPost: false };

        this.handleShowAddPost = this.handleShowAddPost.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchTechs());
    }

    handleDeletePost = post => {
        if (confirm('Do you want to delete this post')) { // eslint-disable-line
            this.props.dispatch(deleteTechRequest(post));
        }
    };

    handleAddPost = (name, title, content) => {
        this.setState(prevState => ({
            showAddPost: !prevState.showAddPost
        }));
        this.props.dispatch(addTechRequest({ name, title, content }));
    };

    handleShowAddPost = () => {
        this.setState(prevState => ({
            showAddPost: !prevState.showAddPost
        }));
    }

    render() {
        return (
            <div>
                <button onClick={this.handleShowAddPost}>Add</button>
                {this.state.showAddPost ? <TechCreatForm addPost={this.handleAddPost} /> : null}
                <TechList handleDeletePost={this.handleDeletePost} techs={this.props.techs} />
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
TechListPage.need = [() => {
    return fetchTechs();
}];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        techs: getTechs(state),
    };
}

TechListPage.propTypes = {
    techs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
};

TechListPage.contextTypes = {
    router: React.PropTypes.object,
};

export default connect(mapStateToProps)(TechListPage);
