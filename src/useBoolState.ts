import { is } from '@itsjonq/is';
import { useState } from 'react';
import warning from 'tiny-warning';

type BoolStateMethods = {
	/**
	 * Sets the state to false.
	 */
	false: () => void;
	/**
	 * Sets the state to false.
	 */
	falsy: () => void;
	/**
	 * Retrieves the state.
	 */
	get: () => boolean;
	/**
	 * Sets the state.
	 */
	set: React.Dispatch<React.SetStateAction<boolean>>;
	/**
	 * Sets the state.
	 */
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	/**
	 * Toggles the state.
	 */
	toggle: () => void;
	/**
	 * Sets the state to true.
	 */
	true: () => void;
	/**
	 * Sets the state to true.
	 */
	truthy: () => void;
};

type BoolStateHook = [boolean, BoolStateMethods];

/**
 * A enhanced hook for managing boolean states.
 *
 * @param {boolean} initialValue An initial state value.
 *
 * @example
 * const [state, stateFns] = useBoolState(false);
 * ...
 * stateFns.toggle(); // Toggles the state.
 */
export function useBoolState(initialState?: boolean): BoolStateHook {
	warning(
		is.boolean(initialState),
		['use-enhanced-state', 'useBoolState', 'State must be a boolean.'].join(
			'\n',
		),
	);

	const [state, setState] = useState(initialState || false);

	const truthy = () => setState(true);
	const falsy = () => setState(false);
	const toggle = () => setState(!state);

	const get = () => state;

	const methods = {
		false: falsy,
		falsy,
		get,
		set: setState,
		setState,
		toggle,
		true: truthy,
		truthy,
	};

	return [state, methods];
}
