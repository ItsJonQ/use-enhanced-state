# 🔄 use-enhanced-state

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

There are a handful of convenient methods provided by the second argument of `useListState()`

##### `.add(data)`

_Alias: `.append()`_

Adds a new item to the array (at the end).

```js
const [items, itemsData] = useListState([...]);

itemsData.add({ id: 'a' });
```

##### `.append(data)`

_Alias: `.add()`_

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

##### `.get({ at: number, id: any })`

_Alias: `.find()`_

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

##### `.set(Array | Function)`

_Alias: `.setState()`_

The original React `setState` callback from `useState`.

```js
const [items, itemsData] = useListState([...]);

itemsData.set([{ id: 'a' }]);
```

##### `.setState(Array | Function)`

_Alias: `.set()`_

The original React `setState` callback from `useState`.

```js
const [items, itemsData] = useListState([...]);

itemsData.set([{ id: 'a' }]);
```

### useBoolState

```jsx
import React from 'react';
import { useListState } from 'use-enhanced-state';

const ListComponent = () => {
	const [show, showData] = useBoolState(false);

	return <div>{show ? 'Show' : 'Hide'}</div>;
};
```

### useLocalState

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
