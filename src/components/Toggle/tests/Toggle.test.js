import React from 'react';
import { mount } from 'enzyme';

import Toggle from '../index';

const defaultProps = {
  name: 'toggle',
  type: 'checkbox',
};
const renderComponent = (props = defaultProps) => {
  const wrapper = mount(<Toggle {...props} />);

  return wrapper;
};

describe('<Toggle />', () => {
  it('should not crash', () => {
    renderComponent();
  });

  it('should send a boolean', () => {
    const onChange = jest.fn();
    const value = false;
    const renderedComponent = renderComponent({
      ...defaultProps,
      onChange,
      value,
    });
    const element = renderedComponent.find('input');

    element.simulate('change');
    const expected = {
      target: {
        name: 'toggle',
        type: 'checkbox',
        value: true,
      },
    };
    expect(onChange).toHaveBeenLastCalledWith(expected);
  });

  it('should use the defaultProps', () => {
    const {
      defaultProps: { onChange },
    } = Toggle;

    expect(onChange).toBeDefined();
    expect(onChange({ preventDefault: jest.fn() })).toBe(undefined);
  });
});
