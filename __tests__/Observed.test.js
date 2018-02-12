/* global describe, it, IntersectionObserver */

import React from 'react';
import ReactDOM from 'react-dom';
import Observed from 'Observed.js';

// keep a global reference of the observer
let IntersectionObserver;

describe('Expect an <Observed> component', () => {
    beforeAll(() => {
        require('intersection-observer');
        IntersectionObserver = global.IntersectionObserver;
    });

    it('to throw if no IntersectionObserver is found in the window', () => {
        // NOTE: hide error and react warning
        // see issue: https://github.com/facebook/jest/issues/4597
        const preventError = e => e.preventDefault();
        window.addEventListener('error', preventError, true);
        Error.prototype.suppressReactErrorLogging = true;

        delete global.IntersectionObserver;

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

        window.removeEventListener('error', preventError, true);
        Error.prototype.suppressReactErrorLogging = false;

        global.IntersectionObserver = IntersectionObserver;
    });

    it('to throw if no ref is mapped', () => {
        const node = document.createElement('div');

        // NOTE: hide error and react warning
        // see issue: https://github.com/facebook/jest/issues/4597
        const preventError = e => e.preventDefault();
        window.addEventListener('error', preventError, true);
        Error.prototype.suppressReactErrorLogging = true;

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

        window.removeEventListener('error', preventError, true);
        Error.prototype.suppressReactErrorLogging = false;
    });

    it('to call createObserver() method on mount with default observer options', () => {
        window.IntersectionObserver = jest.fn(() => ({
            observe: () => {},
        }));
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
        expect(window.IntersectionObserver).toBeCalledWith(
            instance.handleIntersection,
            {
                root: Observed.defaultProps.options.root,
                rootMargin: Observed.defaultProps.options.rootMargin,
                threshold: Observed.defaultProps.intersectionRatio,
            }
        );
        window.IntersectionObserver = IntersectionObserver;
    });

    it('to merge default observer options with props when calling createObserver()', () => {
        window.IntersectionObserver = jest.fn(() => ({
            observe: () => {},
        }));
        const node = document.createElement('div');
        let instance = null;
        ReactDOM.render(
            <Observed
                ref={ref => (instance = ref)}
                options={{
                    root: node,
                }}
            >
                {({ mapRef }) => {
                    return <div ref={mapRef} />;
                }}
            </Observed>,
            node
        );
        expect(window.IntersectionObserver).toBeCalledWith(
            instance.handleIntersection,
            {
                root: node,
                rootMargin: Observed.defaultProps.options.rootMargin,
                threshold: Observed.defaultProps.intersectionRatio,
            }
        );
        window.IntersectionObserver = IntersectionObserver;
    });

    it("to use intersectionRatio as threshold if one isn't provided", () => {
        window.IntersectionObserver = jest.fn(() => ({
            observe: () => {},
        }));
        const node = document.createElement('div');
        let instance = null;
        const expectedRatio = 0.75;
        ReactDOM.render(
            <Observed
                intersectionRatio={expectedRatio}
                ref={ref => (instance = ref)}
                options={{
                    root: node,
                }}
            >
                {({ mapRef }) => {
                    return <div ref={mapRef} />;
                }}
            </Observed>,
            node
        );
        expect(window.IntersectionObserver).toBeCalledWith(
            instance.handleIntersection,
            {
                root: node,
                rootMargin: Observed.defaultProps.options.rootMargin,
                threshold: expectedRatio,
            }
        );
        window.IntersectionObserver = IntersectionObserver;
    });

    it('to call observe() method on mount', () => {
        const spy = jest.fn();
        window.IntersectionObserver = jest.fn(() => ({
            observe: spy,
        }));
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
        expect(spy).toBeCalledWith(instance.el);
        window.IntersectionObserver = IntersectionObserver;
    });

    it('to create a new IntersectionObserver instance on mount', () => {
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

    it('to call the onIntersect handler when a threshold is met', () => {
        const node = document.createElement('div');
        const fakeEntries = [
            { intersectionRatio: 0 },
            { intersectionRatio: 0.1 },
            { intersectionRatio: 0.2 },
        ];

        const intersectSpy = jest.fn();

        let instance;

        ReactDOM.render(
            <Observed ref={ref => (instance = ref)} intersectionRatio={1} onIntersect={intersectSpy}>
                {({ mapRef }) => <div ref={mapRef} />}
            </Observed>,
            node
        );

        instance.handleIntersection(fakeEntries);

        expect(intersectSpy.mock.calls.length).toBe(3);
        expect(intersectSpy.mock.calls[0][0].intersectionRatio).toBe(0);
        expect(intersectSpy.mock.calls[1][0].intersectionRatio).toBe(0.1);
        expect(intersectSpy.mock.calls[2][0].intersectionRatio).toBe(0.2);

    });

    it('to call onEnter handler when {isInView} changes to {true}', () => {
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
