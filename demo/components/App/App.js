import React, { Component } from 'react';
import Observed from 'react-observed';
import cx from 'classnames';
import { Element } from 'components';
import styles from './App.scss';

class App extends Component {
    render() {
        return (
            <main>
                <section>
                    <Observed>
                        {({ isInView, mapRef }) => (
                            <Element isInView={isInView} mapRef={mapRef} />
                        )}
                    </Observed>
                </section>
            </main>
        );
    }
}

export default App;
