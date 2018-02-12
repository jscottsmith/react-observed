/* global IntersectionObserver */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Observed extends Component {
    static defaultProps = {
        initialViewState: false,
        intersectionRatio: 0, // intersect ratio that the element is considered "in view"
        once: false, // remove after the el has intersected the view
        options: {
            root: null, // document.querySelector('#scrollArea')
            rootMargin: '0px', // margin around observed element
            // threshold: 0, // default to props.intersectionRatio
        },
    };

    static propTypes = {
        children: PropTypes.func.isRequired,
        initialViewState: PropTypes.bool.isRequired,
        intersectionRatio: PropTypes.number.isRequired,
        once: PropTypes.bool.isRequired,
        onEnter: PropTypes.func,
        onExit: PropTypes.func,
        onChange: PropTypes.func,
        onIntersect: PropTypes.func,
        options: PropTypes.shape({
            root: PropTypes.instanceOf(Element),
            rootMargin: PropTypes.string,
            threshold: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            isInView: props.initialViewState,
        };
    }

    componentDidMount() {
        this.createObserver();
        this.observe();
    }

    componentWillUnmount() {
        this.disconnectObserver();
    }

    mapRef = ref => {
        this.el = ref;
    };

    createObserver() {
        this.checkForObserver();

        // merge options with defaults
        const defaultOptions = this.constructor.defaultProps.options;
        const options = Object.assign(
            {
                threshold: this.props.intersectionRatio, // default to intersectionRatio if no threshold is provided as an option
            },
            defaultOptions,
            this.props.options
        );

        this.observer = new IntersectionObserver(
            this.handleIntersection,
            options
        );
    }

    checkForObserver() {
        const hasObserver = 'IntersectionObserver' in window;
        if (!hasObserver) {
            throw new Error(
                'Must provide an IntersectionObserver polyfill for browsers that do not yet support the technology.'
            );
        }
    }

    disconnectObserver() {
        if (this.observer) {
            this.observer = this.observer.disconnect();
        }
    }

    observe() {
        if (!this.el) {
            throw new Error(
                'Must provide a ref to the DOM element to be observed.'
            );
        }

        const el = this.el;
        this.observer.observe(el);
    }

    handleIntersection = (entries, observer) => {
        const {
            intersectionRatio,
            once,
            onChange,
            onEnter,
            onExit,
            onIntersect,
        } = this.props;

        entries.forEach(entry => {
            const noIntersection = entry.intersectionRatio === 0;
            const isInView =
                entry.intersectionRatio >= intersectionRatio && !noIntersection;

            // Intersect handler
            onIntersect && onIntersect(entry);

            if (isInView !== this.state.isInView) {
                // update if we've transitioned to a different state
                this.setState(() => ({ isInView }));

                // Call handlers
                onChange && onChange(isInView);
                isInView && onEnter && onEnter();
                !isInView && onExit && onExit();
            }

            if (isInView && once) {
                // if once is true, disconnect after the element is in view.
                this.disconnectObserver();
            }
        });
    };

    render() {
        const { isInView } = this.state;
        const { mapRef } = this;

        return this.props.children({ isInView, mapRef });
    }
}

export default Observed;
