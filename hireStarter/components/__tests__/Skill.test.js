import React from 'react';
import renderer from 'react-test-renderer';
import Skill from '../Skill';

it('Skill renders correctly', () => {
  const tree = renderer
    .create(<Skill skill={'Test'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
