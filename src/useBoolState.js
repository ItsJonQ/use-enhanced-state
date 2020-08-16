import { is } from '@itsjonq/is';
import { useState } from 'react';
import { warning } from 'reakit-warning';

export function useBoolState(initialState = false) {
	warning(
		!is.boolean(initialState),
		'use-enhanced-state',
		'useBoolState',
		'State must be a boolean.',
	);

	const [state, setState] = useState(initialState);

	const truthy = () => setState(true);
	const falsy = () => setState(false);
	const toggle = () => setState(!state);

	const get = () => state;

	const data = {
		false: falsy,
		falsy,
		get,
		set: setState,
		setState,
		toggle,
		true: truthy,
		truthy,
	};

	return [state, data];
}
