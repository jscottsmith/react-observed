import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Element } from 'components';
import Observed from 'react-observed';

storiesOf('<Observed>', module)
    .add('with default props', () => (
        <Observed>
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('is true when partially in view', () => (
        <Observed intersectionRatio={0}>
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('is true when halfway in view', () => (
        <Observed intersectionRatio={0.5}>
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('is true when completely in view', () => (
        <Observed intersectionRatio={1}>
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('is true on initial mount', () => (
        <Observed initialViewState>
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ))
    .add('with handlers', () => (
        <Observed
            onChange={action('on change')}
            onEnter={action('on enter')}
            onExit={action('on exit')}
        >
            {({ isInView, mapRef }) => (
                <Element isInView={isInView} mapRef={mapRef} />
            )}
        </Observed>
    ));
