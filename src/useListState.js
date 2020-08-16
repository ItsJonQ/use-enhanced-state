import { is } from '@itsjonq/is';
import arrayMove from 'array-move';
import { useState } from 'react';
import warning from 'tiny-warning';

export function useListState(initialState = []) {
	warning(
		is.array(initialState),
		['use-enhanced-state', 'useListState', 'State must be an array.'].join(
			'\n',
		),
	);

	const [state, setState] = useState(initialState);

	const prepend = (next) => {
		return setState((prev) => [next, ...prev]);
	};

	const append = (next) => {
		return setState((prev) => [...prev, next]);
	};

	const insert = ({ at, item }) => {
		if (!is.number(at)) {
			warning(
				false,
				[
					'use-enhanced-state',
					'useListState',
					'insert',
					'at should be a number.',
				].join('\n'),
			);
		}

		return setState((prev) => {
			const next = [...prev];
			next.splice(at, 0, item);
			return next;
		});
	};

	const find = ({ at, id }) => {
		if (is.defined(at)) {
			if (!is.number(at)) {
				warning(
					false,
					[
						'use-enhanced-state',
						'useListState',
						'find',
						'at should be a number.',
					].join('\n'),
				);
				return undefined;
			}

			return state.find((item, index) => index === at);
		}

		if (is.defined(id)) {
			return state.find((item) => item?.id === id);
		}

		return undefined;
	};

	const remove = ({ at, id }) => {
		if (is.defined(at)) {
			if (!is.number(at)) {
				warning(
					false,
					[
						'use-enhanced-state',
						'useListState',
						'remove',
						'at should be a number.',
					].join('\n'),
				);
				return undefined;
			}

			return setState((prev) => {
				return prev.filter((item, index) => index !== at);
			});
		}

		if (is.defined(id)) {
			return setState((prev) => {
				return prev.filter((item) => item?.id !== id);
			});
		}

		return undefined;
	};

	const has = ({ id }) => !!find({ id });

	const move = (from, to) => {
		if (!is.number(from)) {
			warning(
				false,
				[
					'use-enhanced-state',
					'useListState',
					'move',
					'from must be an index number value',
				].join('\n'),
			);
			return;
		}

		if (!is.number(to)) {
			warning(
				false,
				[
					'use-enhanced-state',
					'useListState',
					'move',
					'to must be an index number value',
				].join('\n'),
			);
			return;
		}

		return setState((prev) => {
			return arrayMove(prev, from, to);
		});
	};

	const data = {
		add: append,
		append,
		find,
		get: find,
		has,
		insert,
		move,
		prepend,
		remove,
		set: setState,
		setState,
	};

	return [state, data];
}
