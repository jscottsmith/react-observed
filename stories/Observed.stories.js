import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Element } from 'components';
import Observed from 'react-observed';

import {
    verticalScrollContainer,
    horizontalScrollContainer,
    overflowElement,
} from './styles.scss';

storiesOf('<Observed>', module)
    .add('with default props', () => (
        <div className={verticalScrollContainer}>
            <Observed>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('is true when partially in view', () => (
        <div className={verticalScrollContainer}>
            <Observed intersectionRatio={0}>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('is true when halfway in view', () => (
        <div className={verticalScrollContainer}>
            <Observed intersectionRatio={0.5}>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('is true when completely in view', () => (
        <div className={verticalScrollContainer}>
            <Observed intersectionRatio={1}>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('is true on initial mount', () => (
        <div className={verticalScrollContainer}>
            <Observed initialViewState>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('with onChange handler', () => (
        <div className={verticalScrollContainer}>
            <Observed onChange={state => action('onChange')(state)}>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('with onEnter handler', () => (
        <div className={verticalScrollContainer}>
            <Observed onEnter={action('onEnter')}>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('with onExit handler', () => (
        <div className={verticalScrollContainer}>
            <Observed onExit={action('onExit')}>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('with onIntersect handler', () => (
        <div className={verticalScrollContainer}>
            <Observed
                onIntersect={entry =>
                    action('onIntersect')(entry.intersectionRatio)
                }
                options={{
                    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
            >
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('with once prop', () => (
        <div className={verticalScrollContainer}>
            <Observed
                intersectionRatio={1}
                onChange={action('on change should be called once')}
                onEnter={action('on enter should be called once')}
                onExit={action('on exit should never be called')}
                once
            >
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('with horizontal overflow', () => (
        <div className={horizontalScrollContainer}>
            <Observed intersectionRatio={0}>
                {({ isInView, mapRef }) => (
                    <Element isInView={isInView} mapRef={mapRef} />
                )}
            </Observed>
        </div>
    ))
    .add('in a container with overflow', () => (
        <div
            className={overflowElement}
            id="overflow"
            options={{
                root: document.getElementById('overflow'),
            }}
        >
            <div className={verticalScrollContainer}>
                <Observed intersectionRatio={0}>
                    {({ isInView, mapRef }) => (
                        <Element isInView={isInView} mapRef={mapRef} />
                    )}
                </Observed>
            </div>
        </div>
    ));
