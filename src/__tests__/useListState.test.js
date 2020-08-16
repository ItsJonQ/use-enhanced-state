import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { useListState } from '../useListState';

describe('useListState', () => {
	test('should adjust array state based on provided data methods', () => {
		const Component = () => {
			const [state, data] = useListState([
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
			]);

			return (
				<div>
					<button onClick={() => data.add({ id: state.length + 1 })}>
						add
					</button>
					<button
						onClick={() => data.remove({ at: state.length - 1 })}
					>
						remove
					</button>
					<button onClick={() => data.append({ id: 'append' })}>
						append
					</button>
					<button onClick={() => data.prepend({ id: 'prepend' })}>
						prepend
					</button>
					<button onClick={() => data.move(state.length - 1, 0)}>
						move
					</button>
					<button
						onClick={() =>
							data.insert({ at: 2, item: { id: 'insert' } })
						}
					>
						insert
					</button>
					<button onClick={() => data.set([])}>set</button>
					<button onClick={() => data.setState([{ id: 1 }])}>
						setState
					</button>
					<div>{data.has({ id: 1 }) ? 'has' : 'no'}</div>
					<div>{data.find({ id: 1 }) ? 'find' : 'no'}</div>
					<div>{data.get({ at: 1 }) ? 'get' : 'no'}</div>
					<ul>
						{state.map((item) => (
							<li key={item.id}>{item.id}</li>
						))}
					</ul>
				</div>
			);
		};

		const { container, getByText } = render(<Component />);

		const list = container.querySelector('ul');
		const add = getByText('add');
		const append = getByText('append');
		const prepend = getByText('prepend');
		const remove = getByText('remove');
		const move = getByText('move');
		const insert = getByText('insert');
		const has = getByText('has');
		const find = getByText('find');
		const get = getByText('get');
		const set = getByText('set');
		const setState = getByText('setState');

		// get
		expect(get).toBeTruthy();

		// find
		expect(find).toBeTruthy();

		// has
		expect(has).toBeTruthy();

		// add
		fireEvent.click(add);
		expect(list.children).toHaveLength(4);
		fireEvent.click(add);
		expect(list.children).toHaveLength(5);

		// remove
		fireEvent.click(remove);
		expect(list.children).toHaveLength(4);
		fireEvent.click(remove);
		expect(list.children).toHaveLength(3);

		// append
		fireEvent.click(append);
		expect(list.children).toHaveLength(4);
		expect(list.children[list.children.length - 1].innerHTML).toContain(
			'append',
		);

		// prepend
		fireEvent.click(prepend);
		expect(list.children).toHaveLength(5);
		expect(list.children[0].innerHTML).toContain('prepend');

		// move
		fireEvent.click(move);
		expect(list.children).toHaveLength(5);
		expect(list.children[0].innerHTML).toContain('append');

		fireEvent.click(move);
		expect(list.children).toHaveLength(5);
		expect(list.children[0].innerHTML).toContain('3');

		fireEvent.click(move);
		expect(list.children).toHaveLength(5);
		expect(list.children[0].innerHTML).toContain('2');

		fireEvent.click(move);
		expect(list.children).toHaveLength(5);
		expect(list.children[0].innerHTML).toContain('1');

		fireEvent.click(move);
		expect(list.children).toHaveLength(5);
		expect(list.children[0].innerHTML).toContain('prepend');

		// insert
		fireEvent.click(insert);
		expect(list.children).toHaveLength(6);
		expect(list.children[2].innerHTML).toContain('insert');

		// set
		fireEvent.click(set);
		expect(list.children).toHaveLength(0);

		// setState
		fireEvent.click(setState);
		expect(list.children).toHaveLength(1);
	});
});
