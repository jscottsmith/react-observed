import React, { Component, Fragment } from 'react';
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
            <Fragment>
                <div
                    ref={mapRef}
                    className={cx(styles.observed, {
                        [styles.isInView]: isInView,
                    })}
                >
                    <h2 className={styles.name}>
                        <span className={styles.bracket}>&lt;</span>
                        Observed
                        <span className={styles.bracket}>&gt;</span>
                    </h2>
                    {isInView ? (
                        <span className={styles.elState}>In view!</span>
                    ) : (
                        <span className={styles.elState}>Not in view.</span>
                    )}
                </div>
                <div
                    className={cx(styles.state, {
                        [styles.isInView]: isInView,
                    })}
                >
                    <span className={styles.text}>is in view</span>
                    <span className={styles.indicator} />
                </div>
            </Fragment>
        );
    }
}

export default Element;
