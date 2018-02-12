import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import TechList from '../../components/TechList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

class TechListPage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPosts());
    }

    handleDeletePost = post => {
        if (confirm('Do you want to delete this post')) { // eslint-disable-line
            this.props.dispatch(deletePostRequest(post));
        }
    };

    handleAddPost = (name, title, content) => {
        this.props.dispatch(toggleAddPost());
        this.props.dispatch(addPostRequest({ name, title, content }));
    };

    render() {
        return (
            <div>
                <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
                <TechList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
TechListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        showAddPost: getShowAddPost(state),
        posts: getPosts(state),
    };
}

TechListPage.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
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
