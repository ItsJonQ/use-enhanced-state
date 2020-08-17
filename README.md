# 🔄 use-enhanced-state

[![npm version](https://badge.fury.io/js/use-enhanced-state.svg)](https://badge.fury.io/js/use-enhanced-state)
[![Build Status](https://travis-ci.org/ItsJonQ/use-enhanced-state.svg?branch=master)](https://travis-ci.org/ItsJonQ/use-enhanced-state)

> A collection of enhanced useState hooks for React.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Hooks](#hooks)
    -   [useControlledState](#usecontrolledstate)
    -   [useListState](#useliststate)
    -   [useBoolState](#useboolstate)
    -   [useLocalState](#uselocalstate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install --save use-enhanced-state
```

## Hooks

### useControlledState

Used to sync local component state and incoming state from props. This is useful for creating controlled components, like a custom `<Input />`.

```jsx
import React from 'react';
import { useControlledState } from 'use-enhanced-state';

const Control = ({ value: valueProp }) => {
	const [value, setValue] = useControlledState(valueProp);

	return <Input value={value} onChange={setValue} />;
};
```

##### useControlledState(initialState?: any, { initial?: any })

`useControlledState` has options as a second argument. `initial` from options can be used to set the initial value for the internal controlled state.

### useListState

Used for a **flat** array.

```jsx
import React from 'react';
import { useListState } from 'use-enhanced-state';

const ListComponent = () => {
	const [items, itemsData] = useListState([{ id: 1 }, { id: 2 }]);

	return (
		<ul>
			{items.map((item) => (
				<li key={item.id}>{item.id}</li>
			))}
		</ul>
	);
};
```

#### Methods

There are a handful of convenient methods provided by the second argument of `useListState()`.

##### `.add(data)`

_Alias: `.append()`_

Adds a new item to the array (at the end).

```js
const [items, itemsData] = useListState([...]);

itemsData.add({ id: 'a' });
```

##### `.find({ at: number, id: any })`

_Alias: `.get()`_

Finds an item from the array, using either an index value (`at`) or an `id`.

```js
const [items, itemsData] = useListState([...]);

itemsData.find({ id: 'a' });
itemsData.find({ at: 9 });
```

##### `.has({ at: number, id: any })`

Checks to see if the array contains an item.

```js
const [items, itemsData] = useListState([...]);

itemsData.has({ id: 'a' });
```

##### `.indexOf({ id: any })`

Checks an index of an item based on an id.

```js
const [items, itemsData] = useListState([...]);

itemsData.indexOf({ id: 'a' });
```

##### `.insert({ at: number, item: any })`

Adds new data an a specific index.

```js
const [items, itemsData] = useListState([...]);

itemsData.insert({at: 3, item: { id: 'a' }});
```

##### `.move(source: number, destination: number)`

Moves an item from a previous index (`source`) to a new index (`destination`).

```js
const [items, itemsData] = useListState([...]);

itemsData.move(3, 5);
```

##### `.prepend(data)`

Adds a new item to the array (at the start).

```js
const [items, itemsData] = useListState([...]);

itemsData.prepend({ id: 'a' });
```

##### `.remove({ at: number, id: any })`

Removes an item from the array, given an index value (`at`) or an `id`.

```js
const [items, itemsData] = useListState([...]);

itemsData.remove({ id: 'a' });
```

##### `.removeOne((item: any, index: number) => boolean)`

Removes an item from the array based on a filter match.

```js
const [items, itemsData] = useListState([...]);

itemsData.removeOne((item) => item.id === 'a');
```

##### `.removeWhere((item: any, index: number) => boolean)`

Removes all items from the array based on a filter match.

```js
const [items, itemsData] = useListState([...]);

itemsData.removeWhere((item) => item.value > 50);
```

##### `.set(Array | Function)`

_Alias: `.setState()`_

The original React `setState` callback from `useState`.

```js
const [items, itemsData] = useListState([...]);

itemsData.set([{ id: 'a' }]);
```

### useBoolState

Used for a `boolean` state.

```jsx
import React from 'react';
import { useListState } from 'use-enhanced-state';

const ListComponent = () => {
	const [show, showData] = useBoolState(false);

	return <div>{show ? 'Show' : 'Hide'}</div>;
};
```

#### Methods

There are a handful of convenient methods provided by the second argument of `useBoolState()`.

##### `.true()`

_Alias: `.truthy()`_

Sets the value to `true`.

```js
const [value, valueData] = useBoolState(false);

valueData.true();
```

##### `.false()`

_Alias: `.falsy()`_

Sets the value to `false`.

```js
const [value, valueData] = useBoolState(true);

valueData.false();
```

##### `.toggle()`

Toggles the value between `true` and `false`.

```js
const [value, valueData] = useBoolState(true);

valueData.toggle();
```

##### `.set(Array | Function)`

_Alias: `.setState()`_

The original React `setState` callback from `useState`.

```js
const [value, valueData] = useBoolState(false);

valueData.set(true);
```

### useLocalState

Used to read/write state to localStorage.

```jsx
import React from 'react';
import { useListState } from 'use-enhanced-state';

const ListComponent = () => {
	const [config, setConfig] = useLocalState('items', {...});

	return (
		<div>{config.dark ? 'Dark' : 'Light'}</div>
	);
};
```

##### useLocalState(key: string, state: any)

The `key` will be used as the localState key for your data.
