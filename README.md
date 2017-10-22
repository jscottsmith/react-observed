# React Observed

React component using the browser's Intersection Observer API to watch for when an element is within -- or partially within -- the viewport. 

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
            {isInView ?
                <span>I'm in view!</span> :
                <span>I'm not in view</span>}
        </div>
    )}
</Observed>
```

## Component Props

`<Observed>` takes three props as shown by the following example:

```jsx
<Observed
    intersectionRatio={0.5} // target's visibility must pass the 50% threshold to be considered visible
    once // discontinue observing the target once it's become visible
    options={{
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }} // IntersectionObserver constuctor options
/>
```

**`intersectionRatio`** 

Type: `number`
Default: `1`

The intersection ratio (a value between `0`–`1`) that when `>=` to the target's intersect ration will be considered in view.

**`once`**

Type: `boolean`
Default: `false`

If once is `true` the observer will disconnect after the target element has entered the view. Useful for triggering something when in view for a single time.

**`options`**

Type: `object`
Default:

```js
options: {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
}
```

These are the options passed to the [IntersectionObserver constructor](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer). The following is as described on MDN:

`options.root`

The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if `null`.

`options.rootMargin`

Margin around the root. Can have values similar to the CSS margin property, e.g. `10px 20px 30px 40px` (top, right, bottom, left). If the root element is specified, the values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.

`options.threshold`

Either a single `number` or an `array` of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of `0.5`. If you want the callback run every time visibility passes another 25%, you would specify the array `[0, 0.25, 0.5, 0.75, 1]`. The default is `0` (meaning as soon as even one pixel is visible, the callback will be run). A value of `1.0` means that the threshold isn't considered passed until every pixel is visible.

## Render Callback

The child function takes one object parameter like such `{ isInView, mapRef }`.

The keys of which are:

**`isInView`** 

Type: `boolean`

This is `true` when the observed element's `intersectionRatio` is `>=` the `<Observed>` prop `intersectionRatio`.

**`mapRef`** 

This a `function` that is declared as the `ref` of the DOM element to be observed.


## Run the Demo

Install dependencies:

```
yarn install
```

Run the webpack dev server:

```
yarn start
```

Open a browser @ [localhost:3000](http://localhost:3000/)
