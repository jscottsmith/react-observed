/* global IntersectionObserver */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Observed extends Component {
    static defaultProps = {
        intersectionRatio: 1.0, // intersect ratio that the element is considered "in view"
        once: false, // remove after the el has intersected the view
        options: {
            root: null, // document.querySelector('#scrollArea')
            rootMargin: '0px', // margin around observed element
            threshold: [1.0], // callback is invoked when the intersection ratio reaches each threshold
        },
    };

    static propTypes = {
        children: PropTypes.func.isRequired,
        intersectionRatio: PropTypes.number.isRequired,
        once: PropTypes.bool.isRequired,
        options: PropTypes.shape({
            root: PropTypes.node,
            rootMargin: PropTypes.string.isRequired,
            threshold: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
        }),
    };

    state = {
        isInView: false,
    };

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

        this.observer = new IntersectionObserver(
            this.handleIntersection,
            this.props.options
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
            this.observer.disconnect();
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
        const { intersectionRatio, once } = this.props;

        entries.forEach(entry => {
            const isInView = entry.intersectionRatio >= intersectionRatio;

            if (isInView !== this.state.isInView) {
                // update if we've transitioned to a different state
                this.setState(() => ({ isInView }));
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
