import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import cx from 'classnames';
import styles from './Element.scss';

class Element extends Component {
    static propTypes = {
        mapRef: func,
        isInView: bool,
    };

    render() {
        const { mapRef, isInView } = this.props;

        return (
            <div
                ref={mapRef}
                className={cx(styles.observed, {
                    [styles.isInView]: isInView,
                })}
            >
                {isInView ? (
                    <span>I'm observed and in view!</span>
                ) : (
                    <span>I'm observed and not in view.</span>
                )}
            </div>
        );
    }
}

export default Element;
