import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Element } from 'components';
import Observed from 'react-observed';

storiesOf('Observed Element', module)
    .add('with default props', () => (
        <Observed>
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('true when partially in view', () => (
        <Observed
            intersectionRatio={0.01}
            options={{
                root: null,
                rootMargin: '0px',
                threshold: [0.01, 0.25, 0.5, 0.75, 1],
            }}
        >
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('true when halfway in view', () => (
        <Observed
            intersectionRatio={0.5}
            options={{
                root: null,
                rootMargin: '0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }}
        >
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('true on initial mount', () => (
        <Observed initialViewState>
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ));
