import { is } from '@itsjonq/is';
import { useState } from 'react';

const defaultOptions = {
	initial: undefined,
};

export function useControlledState(currentState, options = defaultOptions) {
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
