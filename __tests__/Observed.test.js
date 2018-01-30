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

        expect(render).toThrow(
            'Must provide a ref to the DOM element to be observed.'
        );
    });

    it('to create a new IntersectionObserver instance on mount', () => {
        require('intersection-observer');

        const node = document.createElement('div');

        let instance = null;

        ReactDOM.render(
            <Observed ref={ref => (instance = ref)}>
                {({ mapRef }) => {
                    return <div ref={mapRef} />;
                }}
            </Observed>,
            node
        );

        expect(instance.observer).toBeInstanceOf(IntersectionObserver);
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

        expect(func).toBe(true);
    });

    it('to call a child function with an object argument containing {mapRef} and {isInView} properties', () => {
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

        expect(testParam).toEqual(
            expect.objectContaining({
                mapRef: expect.any(Function),
                isInView: expect.any(Boolean),
            })
        );
    });

    it('to have an initial {isInView} state of {false} by default', () => {
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

        expect(testIsInView).toEqual(false);
    });

    it('to have an initial {isInView} state of {true} when set', () => {
        require('intersection-observer');

        const node = document.createElement('div');

        let testIsInView = null;

        ReactDOM.render(
            <Observed initialViewState>
                {({ isInView, mapRef }) => {
                    testIsInView = isInView;
                    return <div ref={mapRef} />;
                }}
            </Observed>,
            node
        );

        expect(testIsInView).toEqual(true);
    });

    it('to switch {isInView} state to {true} when the intersection ratio is met', () => {
        require('intersection-observer');
        const node = document.createElement('div');
        const fakeEntries = [
            { intersectionRatio: 0 },
            { intersectionRatio: 0.1 },
            { intersectionRatio: 0.2 },
        ];

        let instance;

        ReactDOM.render(
            <Observed ref={ref => (instance = ref)} intersectionRatio={0.1}>
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        expect(instance.state.isInView).toEqual(false);
        instance.handleIntersection(fakeEntries);
        expect(instance.state.isInView).toEqual(true);
    });

    it('to call onEnter handler when {isInView} changes to {true}', () => {
        require('intersection-observer');
        const node = document.createElement('div');
        const fakeEntries = [
            { intersectionRatio: 0 },
            { intersectionRatio: 0.1 },
            { intersectionRatio: 0.2 },
        ];

        const onEnterSpy = jest.fn();

        let instance;
        ReactDOM.render(
            <Observed
                ref={ref => (instance = ref)}
                intersectionRatio={0.1}
                onEnter={onEnterSpy}
            >
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        instance.handleIntersection(fakeEntries);
        expect(onEnterSpy).toBeCalled();
    });

    it('to call onExit handler when {isInView} changes to {false}', () => {
        require('intersection-observer');
        const node = document.createElement('div');
        const fakeEntries = [
            { intersectionRatio: 0.1 },
            { intersectionRatio: 0.5 },
            { intersectionRatio: 0.2 },
        ];

        const onExitSpy = jest.fn();

        let instance;

        ReactDOM.render(
            <Observed
                ref={ref => (instance = ref)}
                initialViewState
                intersectionRatio={1}
                onExit={onExitSpy}
            >
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        instance.handleIntersection(fakeEntries);
        expect(onExitSpy).toBeCalled();
    });

    it('to call onChange handler with state when {isInView} changes', () => {
        require('intersection-observer');
        const node = document.createElement('div');
        const fakeEntries = [
            { intersectionRatio: 1 },
            { intersectionRatio: 0.4 },
            { intersectionRatio: 1 },
        ];

        const onChangeSpy = jest.fn();

        let instance;
        ReactDOM.render(
            <Observed
                ref={ref => (instance = ref)}
                intersectionRatio={0.5}
                onChange={onChangeSpy}
            >
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        instance.handleIntersection(fakeEntries);
        expect(onChangeSpy.mock.calls.length).toBe(3);
        expect(onChangeSpy.mock.calls[0][0]).toBe(true);
        expect(onChangeSpy.mock.calls[1][0]).toBe(false);
        expect(onChangeSpy.mock.calls[2][0]).toBe(true);
    });

    it('to switch {isInView} state to {false} when the intersection ratio is NOT met', () => {
        require('intersection-observer');
        const node = document.createElement('div');
        const fakeEntries = [
            { intersectionRatio: 0.9 },
            { intersectionRatio: 0.7 },
            { intersectionRatio: 0.8 },
        ];

        let instance;

        ReactDOM.render(
            <Observed
                ref={ref => (instance = ref)}
                intersectionRatio={1}
                initialViewState
            >
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        expect(instance.state.isInView).toEqual(true);
        instance.handleIntersection(fakeEntries);
        expect(instance.state.isInView).toEqual(false);
    });

    it('to disconnect the observer when {once} prop is {true} and the intersection ratio is met', () => {
        require('intersection-observer');
        const node = document.createElement('div');
        const fakeEntries = [
            { intersectionRatio: 0.3 },
            { intersectionRatio: 0.4 },
            { intersectionRatio: 0.5 },
        ];

        let instance;

        ReactDOM.render(
            <Observed
                ref={ref => (instance = ref)}
                intersectionRatio={0.5}
                once
            >
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        const disconnectObserverMock = jest.fn();

        instance.disconnectObserver = disconnectObserverMock;
        instance.handleIntersection(fakeEntries);
        expect(disconnectObserverMock).toBeCalled();
    });

    it('to disconnect the IntersectionObserver', () => {
        require('intersection-observer');
        const node = document.createElement('div');

        let instance;

        ReactDOM.render(
            <Observed ref={ref => (instance = ref)} intersectionRatio={0.5}>
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        instance.disconnectObserver();
        expect(instance.observer).toEqual(undefined);
    });

    it('to disconnect the observer when the component will unmount', () => {
        require('intersection-observer');
        const node = document.createElement('div');

        let instance;

        ReactDOM.render(
            <Observed ref={ref => (instance = ref)} intersectionRatio={0.5}>
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        const disconnectObserverMock = jest.fn();
        instance.disconnectObserver = disconnectObserverMock;

        ReactDOM.unmountComponentAtNode(node);

        expect(disconnectObserverMock).toBeCalled();
    });
});
