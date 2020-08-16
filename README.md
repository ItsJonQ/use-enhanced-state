# 🔄 use-enhanced-state

[![Build Status](https://travis-ci.org/ItsJonQ/use-enhanced-state.svg?branch=master)](https://travis-ci.org/ItsJonQ/use-enhanced-state)

> A collection of enhanced useState hooks for React.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
    -   [useControlledState](#usecontrolledstate)
    -   [useListState](#useliststate)
    -   [useBoolState](#useboolstate)
    -   [useLocalState](#uselocalstate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install --save use-enhanced-state
```

### useControlledState

```jsx
import React from 'react';
import { useControlledState } from 'use-enhanced-state';

const Control = ({ value: valueProp }) => {
	const [value, setValue] = useControlledState(valueProp);

	return <Input value={value} onChange={setValue} />;
};
```

### useListState

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
