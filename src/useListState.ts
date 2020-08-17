import { is } from '@itsjonq/is';
import arrayMove from 'array-move';
import { useState } from 'react';
import warning from 'tiny-warning';

type ListFilter<T> = (item: T, index: number) => boolean;
type ListStateData<T> = {
	/**
	 * Adds a new item (to the end) to the Array state.
	 *
	 * @example
	 * data.add({ id: 'a', ...})
	 */
	add: (next: T) => void;
	/**
	 * Adds a new item to the end of the Array state.
	 *
	 * @example
	 * data.add({ id: 'a', ...})
	 */
	append: (next: T) => void;
	/**
	 * Retrieves an item from the Array state.
	 *
	 * @example
	 * data.find({ id: 'a' })
	 */
	find: ({ at, id }: { at?: number; id?: any }) => any;
	/**
	 * Retrieves an item from the Array state.
	 *
	 * @example
	 * data.find({ id: 'a' })
	 */
	get: ({ at, id }: { at?: number; id?: any }) => any;
	/**
	 * Checks to see if the Array state contains an item.
	 *
	 * @example
	 * data.has({ id: 'a' })
	 */
	has: ({ id }: { id?: any }) => boolean;
	/**
	 * Checks the index of an item.
	 *
	 * @example
	 * data.indexOf({ id: 'a' })
	 */
	indexOf: ({ id }: { id?: any }) => number | undefined;
	/**
	 * Adds a new item to a specific index of the Array state.
	 *
	 * @example
	 * data.insert({ at: 3, item: {...} })
	 */
	insert: ({ at, item }: { at?: number; item: T }) => void;
	/**
	 * Moves an item within the the Array state, using the previous
	 * (from) index to the next (to) index.
	 *
	 * @example
	 * data.move(1, 3)
	 */
	move: (from: number, to: number) => void;
	/**
	 * Adds a new item to the beginning of the Array state.
	 *
	 * @example
	 * data.add({ id: 'a', ...})
	 */
	prepend: (next: T) => void;
	/**
	 * Removes an item from the Array state.
	 *
	 * @example
	 * data.remove({ id: 'a' })
	 */
	remove: ({ at, id }: { at?: number; id?: any }) => void;
	/**
	 * Removes all items from the Array state, based on a filter match.
	 *
	 * @example
	 * data.removeAll((item) => item.value > 50)
	 */
	removeAll: (filter: ListFilter<T>) => void;
	/**
	 * Removes an item from the Array state, based on a filter match.
	 *
	 * @example
	 * data.removeOne((item) => item.id === 'a')
	 */
	removeOne: (filter: ListFilter<T>) => void;
	/**
	 * Sets the state.
	 *
	 * @example
	 * data.set([{ id: 'a' }])
	 */
	set: React.Dispatch<React.SetStateAction<unknown[]>>;
	/**
	 * Sets the state.
	 *
	 * @example
	 * data.set([{ id: 'a' }])
	 */
	setState: React.Dispatch<React.SetStateAction<unknown[]>>;
};

type ListStateHook<T> = [Array<T>, ListStateData<T>];

/**
 * A enhanced hook for managing flat Array states.
 *
 * @param {Array<any>} initialValue An initial state value.
 *
 * @example
 * const [state, data] = useListState([...]);
 * ...
 * data.move(1, 5); // Moves an item from index of 1 to 5.
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

	const remove = ({ at, id }) => {
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

	const removeOne = (filter) => {
		let found = false;
		return setState((prev) =>
			prev.filter((item, index) => {
				if (!found) {
					found = !!filter(item, index);
					return false;
				}
				return true;
			}),
		);
	};

	const removeAll = (filter) =>
		setState((prev) => prev.filter((item, index) => !filter(item, index)));

	const data = {
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
		removeOne,
		set: setState,
		setState,
	};

	return [state, data];
}
