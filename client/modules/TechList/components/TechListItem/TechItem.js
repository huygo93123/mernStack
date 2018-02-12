import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './TechListItem.css';

function TechListItem(props) {
    return (
        <div className={styles['single-post']}>
            <h3 className={styles['post-title']}>
                <Link to={`/techs/${props.tech.slug}-${props.tech.cuid}`} >
                    {props.tech.title}
                </Link>
            </h3>
            <p className={styles['author-name']}><FormattedMessage id="by" /> {props.tech.name}</p>
            <p className={styles['post-desc']}>{props.tech.content}</p>
            <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
            <hr className={styles.divider} />
        </div>
    );
}

TechListItem.propTypes = {
    tech: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TechListItem;
