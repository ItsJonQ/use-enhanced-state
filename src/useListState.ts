import { is } from '@itsjonq/is';
import arrayMove from 'array-move';
import { useState } from 'react';
import warning from 'tiny-warning';

type ListFilter<T> = (item: T, index: number) => boolean;
type ListStateMethods<T> = {
	/**
	 * Adds a new item (to the end) to the Array state.
	 *
	 * @example
	 * stateFns.add({ id: 'a', ...})
	 */
	add: (next: T) => void;
	/**
	 * Adds a new item to the end of the Array state.
	 *
	 * @example
	 * stateFns.add({ id: 'a', ...})
	 */
	append: (next: T) => void;
	/**
	 * Retrieves an item from the Array state.
	 *
	 * @example
	 * stateFns.find({ id: 'a' })
	 */
	find: ({ at, id }: { at?: number; id?: any }) => any;
	/**
	 * Retrieves an item from the Array state.
	 *
	 * @example
	 * stateFns.find({ id: 'a' })
	 */
	get: ({ at, id }: { at?: number; id?: any }) => any;
	/**
	 * Checks to see if the Array state contains an item.
	 *
	 * @example
	 * stateFns.has({ id: 'a' })
	 */
	has: ({ id }: { id?: any }) => boolean;
	/**
	 * Checks the index of an item.
	 *
	 * @example
	 * stateFns.indexOf({ id: 'a' })
	 */
	indexOf: ({ id }: { id?: any }) => number | undefined;
	/**
	 * Adds a new item to a specific index of the Array state.
	 *
	 * @example
	 * stateFns.insert({ at: 3, item: {...} })
	 */
	insert: ({ at, item }: { at?: number; item: T }) => void;
	/**
	 * Moves an item within the the Array state, using the previous
	 * (from) index to the next (to) index.
	 *
	 * @example
	 * stateFns.move(1, 3)
	 */
	move: (from: number, to: number) => void;
	/**
	 * Adds a new item to the beginning of the Array state.
	 *
	 * @example
	 * stateFns.add({ id: 'a', ...})
	 */
	prepend: (next: T) => void;
	/**
	 * Removes an item from the Array state. Item can be removed by matching
	 * an index (at) or an id. Alternatively, a filter match (function) can
	 * be provided.
	 *
	 * @example
	 * stateFns.remove({ id: 'a' })
	 * stateFns.remove(item) => item.id === 'a')
	 */
	remove: (props: { at?: number; id?: any } | ListFilter<T>) => void;
	/**
	 * Removes all items from the Array state, based on a filter match.
	 *
	 * @example
	 * stateFns.removeAll((item) => item.value > 50)
	 */
	removeAll: (filter: ListFilter<T>) => void;
	/**
	 * Sets the state.
	 *
	 * @example
	 * stateFns.set([{ id: 'a' }])
	 */
	set: React.Dispatch<React.SetStateAction<T[]>>;
	/**
	 * Sets the state.
	 *
	 * @example
	 * stateFns.set([{ id: 'a' }])
	 */
	setState: React.Dispatch<React.SetStateAction<T[]>>;
	/**
	 * Update an item, based on an id match.
	 *
	 * @example
	 * stateFns.update({ id: 'a', title 'b'})
	 */
	update: (props: any) => void;
};

type ListStateHook<T> = [Array<T>, ListStateMethods<T>];

/**
 * A enhanced hook for managing flat Array states.
 *
 * @param {Array<any>} initialValue An initial state value.
 *
 * @example
 * const [state, stateFns] = useListState([...]);
 * ...
 * stateFns.move(1, 5); // Moves an item from index of 1 to 5.
 */
export function useListState<T>(initialState?: T[]): ListStateHook<T> {
	warning(
		is.array(initialState),
		['use-enhanced-state', 'useListState', 'State must be an array.'].join(
			'\n',
		),
	);

	const [state, setState] = useState(
		/* istanbul ignore next */
		is.array(initialState) ? (initialState as T[]) : [],
	);

	const prepend = (next) => setState((prev) => [next, ...prev]);
	const append = (next) => setState((prev) => [...prev, next]);

	const insert = ({ at, item }) => {
		/* istanbul ignore if */
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
		/* istanbul ignore if */
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

		/* istanbul ignore else */
		if (is.defined(id)) {
			// @ts-ignore
			return state.find((item) => item?.id === id);
		}

		return undefined;
	};

	// @ts-ignore
	const has = ({ id }) => !!find({ id });

	const indexOf = ({ id }) => {
		// @ts-ignore
		const item = find({ id });
		return state.indexOf(item as T);
	};

	const move = (from, to) => {
		/* istanbul ignore if */
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

		/* istanbul ignore if */
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

	const remove = (arg) => {
		/* istanbul ignore if */
		if (!is.function(arg) && !is.plainObject(arg)) {
			warning(
				false,
				[
					'use-enhanced-state',
					'useListState',
					'remove',
					'argument should be either a function or props (Object).',
				].join('\n'),
			);

			return;
		}

		if (is.function(arg)) {
			let found = false;
			return setState((prev) =>
				prev.filter((item, index) => {
					if (!found) {
						found = !!arg(item, index);
						return false;
					}
					return true;
				}),
			);
		}

		const { at, id } = arg;

		/* istanbul ignore else */
		if (is.defined(at)) {
			/* istanbul ignore if */
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

		/* istanbul ignore else */
		if (is.defined(id)) {
			return setState((prev) => {
				// @ts-ignore
				return prev.filter((item) => item?.id !== id);
			});
		}

		/* istanbul ignore next */
		return undefined;
	};

	const removeAll = (filter) =>
		setState((prev) => prev.filter((item, index) => !filter(item, index)));

	const update = ({ id, ...rest }) => {
		// @ts-ignore
		const item = find({ id });
		if (item) {
			return setState((prev) =>
				prev.map((item) => {
					// @ts-ignore
					if (item?.id === id) {
						return { ...item, ...rest };
					}
					return item;
				}),
			);
		}
	};

	const methods = {
		add: append,
		append,
		find,
		get: find,
		has,
		indexOf,
		insert,
		move,
		prepend,
		remove,
		removeAll,
		set: setState,
		setState,
		update,
	};

	return [state, methods];
}
