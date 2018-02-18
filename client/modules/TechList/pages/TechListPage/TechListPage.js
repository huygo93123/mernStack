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
    componentDidMount() {
        // console.log("component did mount");
        // this.props.dispatch(fetchTechs());
    }

    handleDeletePost = post => {
        if (confirm('Do you want to delete this post')) { // eslint-disable-line
            this.props.dispatch(deleteTechRequest(post));
        }
    };

    handleAddPost = (name, title, content) => {
        // this.props.dispatch(toggleAddPost());
        this.props.dispatch(addTechRequest({ name, title, content }));
    };

    render() {
        console.log(this.props.techs);
        return (
            <div>
                <TechCreatForm addPost={this.handleAddPost} />
                {/*<TechList handleDeletePost={this.handleDeletePost} posts={this.props.techs} />*/}
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
        showAddPost: getShowAddPost(state),
        techs: getTechs(state),
    };
}

TechListPage.propTypes = {
    techs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    })).isRequired,
    showAddPost: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

TechListPage.contextTypes = {
    router: React.PropTypes.object,
};

export default connect(mapStateToProps)(TechListPage);
