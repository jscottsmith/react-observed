# React Observed

[![Build Status](https://travis-ci.org/jscottsmith/react-observed.svg?branch=master)](https://travis-ci.org/jscottsmith/react-observed) [![codecov](https://codecov.io/gh/jscottsmith/react-observed/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-observed)

React component using the browser's Intersection Observer API to watch for when an element is within -- or partially within -- the viewport.

## Example

[Storybook Demos](http://react-observed.surge.sh/)

## Install

```
npm install react-observed
```

**Note:** For complete browser support you must also provide an Intersection Observer polyfill.

```
npm install intersection-observer
```

## Usage

`<Observed>` takes a function as a child which gives you access to the `isInView` and `mapRef` properties.

`mapRef` is the ref function callback that must be declared on the observed target element like `<div ref={mapRef} />`. Then `isInView` will give you the current state of the observed element.

Here's an example:

```jsx
<Observed>
    {({ isInView, mapRef }) => (
        <div ref={mapRef}>
            {isInView ? (
                <span>I'm in view!</span>
            ) : (
                <span>I'm not in view</span>
            )}
        </div>
    )}
</Observed>
```

## \<Observed> Props

`<Observed>` takes the props as shown by the following example:

```jsx
<Observed
    initialViewState            // the initial view state state; defaults to `false`
    intersectionRatio={0.5}     // target's visibility must pass the 50% threshold to be considered visible
    once                        // discontinue observing the target once it's become visible
    onChange={isInView => {}}   // handler called with the current `isInView` state whenever it changes
    onEnter={() => {}}          // handler called when the observed element enters
    onExit={() => {}}           // handler called when the observed element exits
    onIntersect={(entry) => {}} // handler called when each threshold is met with the entry data
    options={{                  // IntersectionObserver constuctor options
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }}
/>
```

| Name                  |    Type    | Default     | Description                                                                                                                                                   |
| --------------------- | :--------: | :---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **initialViewState**  | `Boolean`  | `false`     | Optionally sets the initial `isInView` state. By default this is `false` until the observer updates the state.                                                |
| **intersectionRatio** |  `Number`  | `0`         | The intersection ratio (a value between `0–1`) that when `>=` to the target's intersect ratio and not equal to `0` will be considered in view.                |
| **once**              | `Boolean`  | `false`     | If once is `true` the observer will disconnect after the target element has entered the view. Useful for triggering something when in view for a single time. |
| **onChange**          | `Function` |             | Handler to be called with the current `isInView` state whenever it changes.                                                                                   |
| **onEnter**           | `Function` |             | Handler to be called when the `isInView` state changes to `true`.                                                                                             |
| **onExit**            | `Function` |             | Handler to be called when the `isInView` state changes to `false`.                                                                                            |
| **onIntersect**       | `Function` |             | Handler to be called when each threshold is met with the current [entry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) data.    |
| **options**           |  `Object`  | \*see below | Options passed to the IntersectionObserver constructor.                                                                                                       |

### \*IntersectionObserver Options

These are the options passed to the [IntersectionObserver constructor](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer). The default `options` to the `<Observed>` component are:

```js
options: {
    root: null,
    rootMargin: '0px',
    threshold: [0],
}
```

The following is as described on MDN:

| Name           |        Type         | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | :-----------------: | :------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **root**       |      `Element`      | `null`  | The DOM element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if `null`.                                                                                                                                                                                                                                                                                                                                                                                              |
| **rootMargin** |      `String`       | `0px`   | Margin around the root. Can have values similar to the CSS margin property, e.g. `10px 20px 30px 40px` (top, right, bottom, left). If the root element is specified, the values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.                                                                                                                                                                                                                                 |
| **threshold**  | `Number` or `Array` | `[0]`   | Either a single `Number` or an `Array` of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of `0.5`. If you want the callback run every time visibility passes another 25%, you would specify the array `[0, 0.25, 0.5, 0.75, 1]`. The default is `0` (meaning as soon as even one pixel is visible, the callback will be run). A value of `1.0` means that the threshold isn't considered passed until every pixel is visible. |

## Render Callback

The child function takes one object parameter like such `{ isInView, mapRef }`.

The keys of which are:

**`isInView`**

Type: `boolean`

This is `true` when the observed element's `intersectionRatio` is `>=` the `<Observed>` prop `intersectionRatio`.

**`mapRef`**

This a `function` that is declared as the `ref` of the DOM element to be observed.

