import React from 'react';

import { Menu, Icon } from 'semantic-ui-react';

const Navigation = () => (
  <Menu stackable>
    <Menu.Item header>
      <Icon name="chess" size="big" />
      Chessify
    </Menu.Item>

    <Menu.Item
      position="right"
      href="https://github.com/artrnh/chess"
      target="_blank"
    >
      <Icon name="github" size="big" fitted />
    </Menu.Item>
  </Menu>
);

export default Navigation;
