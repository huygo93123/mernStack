import React, { PropTypes } from 'react';

// Import Components
import TechListItem from './TechListItem/TechItem';

function TechList(props) {
    return (
    <div className="listView">
      {
          props.techs.map(post => (
              <TechListItem
                  post={post}
                  key={post.cuid}
                  onDelete={() => props.handleDeletePost(post.cuid)}
              />
          ))
      }
    </div>
  );
}

TechList.propTypes = {
    techs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    })).isRequired,
    handleDeletePost: PropTypes.func.isRequired,
};

export default TechList;
