import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { useBoolState } from '../useBoolState';

describe('useBoolState', () => {
	test('should adjust array state based on provided data methods', () => {
		const Component = () => {
			const [state, stateFns] = useBoolState(false);

			return (
				<div>
					<button onClick={() => stateFns.true()}>true</button>
					<button onClick={() => stateFns.false()}>false</button>
					<button onClick={() => stateFns.truthy()}>truthy</button>
					<button onClick={() => stateFns.falsy()}>falsy</button>
					<button onClick={() => stateFns.toggle()}>toggle</button>
					<button onClick={() => stateFns.set(true)}>set</button>
					<button onClick={() => stateFns.setState(false)}>
						setState
					</button>
					<div>get: {stateFns.get() ? 'true' : 'false'}</div>
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
