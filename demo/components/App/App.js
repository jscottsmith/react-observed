import React, { Component } from 'react';
import Observed from 'react-observed';
import cx from 'classnames';
import styles from './App.scss';

export default class App extends Component {
    render() {
        return (
            <main>
                <section>
                    <Observed>
                        {({ isInView, mapRef }) => (
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
                        )}
                    </Observed>
                </section>
                <section>
                    <Observed>
                        {({ isInView, mapRef }) => (
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
                        )}
                    </Observed>
                </section>
                <section>
                    <Observed>
                        {({ isInView, mapRef }) => (
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
                        )}
                    </Observed>
                </section>
            </main>
        );
    }
}
