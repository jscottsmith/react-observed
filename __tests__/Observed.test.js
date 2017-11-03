/* global describe, it, IntersectionObserver */

import React from 'react';
import ReactDOM from 'react-dom';
import Observed from 'Observed.js';

describe('Expect an <Observed> component', () => {
    it('to throw if no IntersectionObserver is found in the window', () => {
        const node = document.createElement('div');

        const render = () => {
            ReactDOM.render(
                <Observed>
                    {({ mapRef }) => {
                        return <div ref={mapRef} />;
                    }}
                </Observed>,
                node
            );
        };

        // Expected
        expect(render).toThrow(
            'Must provide an IntersectionObserver polyfill for browsers that do not yet support the technology.'
        );
    });

    it('to throw if no ref is mapped', () => {
        require('intersection-observer');

        const node = document.createElement('div');

        const render = () => {
            ReactDOM.render(
                <Observed>
                    {() => {
                        return <div />;
                    }}
                </Observed>,
                node
            );
        };

        // Expected
        expect(render).toThrow(
            'Must provide a ref to the DOM element to be observed.'
        );
    });

    it('to create an IntersectionObserver instance on mount', () => {
        require('intersection-observer');

        const node = document.createElement('div');

        let component = null;

        ReactDOM.render(
            <Observed ref={ref => (component = ref)}>
                {({ mapRef }) => {
                    return <div ref={mapRef} />;
                }}
            </Observed>,
            node
        );

        // Expected
        expect(component.observer).toBeInstanceOf(IntersectionObserver);
    });

    it('to take a function as a child', () => {
        require('intersection-observer');

        const node = document.createElement('div');

        let func = false;

        ReactDOM.render(
            <Observed>
                {({ mapRef }) => {
                    func = true;
                    return <div ref={mapRef} />;
                }}
            </Observed>,
            node
        );

        // Expected
        expect(func).toBe(true);
    });

    it('to call a child function with an object argument containing mapRef and isInView properties', () => {
        require('intersection-observer');

        const node = document.createElement('div');

        let testParam = null;

        ReactDOM.render(
            <Observed>
                {param => {
                    testParam = param;
                    return <div ref={param.mapRef} />;
                }}
            </Observed>,
            node
        );

        // Expected
        expect(testParam).toEqual(
            expect.objectContaining({
                mapRef: expect.any(Function),
                isInView: expect.any(Boolean),
            })
        );
    });

    it('to have an initial isInView state of false', () => {
        require('intersection-observer');

        const node = document.createElement('div');

        let testIsInView = null;

        ReactDOM.render(
            <Observed>
                {({ isInView, mapRef }) => {
                    testIsInView = isInView;
                    return <div ref={mapRef} />;
                }}
            </Observed>,
            node
        );

        // Expected
        expect(testIsInView).toEqual(false);
    });
});
