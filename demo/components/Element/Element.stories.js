import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Element } from 'components';
import Observed from 'react-observed';

storiesOf('Observed Element', module).add('with default props', () => (
    <Observed>
        {({ isInView, mapRef }) => (
            <Element isInView={isInView} mapRef={mapRef} />
        )}
    </Observed>
));
