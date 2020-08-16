import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { useBoolState } from '../useBoolState';

describe('useBoolState', () => {
	test('should adjust array state based on provided data methods', () => {
		const Component = () => {
			const [state, data] = useBoolState(false);

			return (
				<div>
					<button onClick={() => data.true()}>true</button>
					<button onClick={() => data.false()}>false</button>
					<button onClick={() => data.truthy()}>truthy</button>
					<button onClick={() => data.falsy()}>falsy</button>
					<button onClick={() => data.toggle()}>toggle</button>
					<button onClick={() => data.set(true)}>set</button>
					<button onClick={() => data.setState(false)}>
						setState
					</button>
					<div>get: {data.get() ? 'true' : 'false'}</div>
					<div>state: {state ? 'true' : 'false'}</div>
				</div>
			);
		};

		const { getByText } = render(<Component />);

		fireEvent.click(getByText('true'));
		expect(getByText(/state/).innerHTML).toContain('true');

		fireEvent.click(getByText('false'));
		expect(getByText(/state/).innerHTML).toContain('false');

		fireEvent.click(getByText('truthy'));
		expect(getByText(/state/).innerHTML).toContain('true');

		fireEvent.click(getByText('falsy'));
		expect(getByText(/state/).innerHTML).toContain('false');

		fireEvent.click(getByText('toggle'));
		expect(getByText(/state/).innerHTML).toContain('true');
		fireEvent.click(getByText('toggle'));
		expect(getByText(/state/).innerHTML).toContain('false');
		fireEvent.click(getByText('toggle'));
		expect(getByText(/state/).innerHTML).toContain('true');
		fireEvent.click(getByText('toggle'));
		expect(getByText(/state/).innerHTML).toContain('false');

		fireEvent.click(getByText('set'));
		expect(getByText(/state/).innerHTML).toContain('true');

		fireEvent.click(getByText('setState'));
		expect(getByText(/state/).innerHTML).toContain('false');
	});
});
