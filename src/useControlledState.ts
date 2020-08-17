import { is } from '@itsjonq/is';
import { useState } from 'react';

type ControlledStateHook<S> = [S | undefined, (next: S) => void];

type ControlledStateOptions<S> = {
	/**
	 * An initial value for the controlled state. This state is used
	 * if there is no currentState (from props).
	 */
	initial?: S;
};

const defaultOptions = {
	initial: undefined,
};

/**
 * A enhanced hook for managing and coordinating internal state and
 * state from props. This hook is useful for creating controlled components,
 * such as a custom <Input />.
 *
 * @param {any} initialValue An initial state value.
 *
 * @example
 * const [value, setValue] = useControlledState(valueFromProps);
 */
export function useControlledState<S>(
	currentState?: S,
	options?: ControlledStateOptions<S>,
): ControlledStateHook<S> {
	const { initial } = { ...defaultOptions, ...options };
	const [internalState, setInternalState] = useState(initial);
	const hasCurrentState = is.defined(currentState);

	const setState = (nextState) => {
		if (!hasCurrentState) {
			setInternalState(nextState);
		}
	};

	const state = hasCurrentState ? currentState : internalState;

	return [state, setState];
}
