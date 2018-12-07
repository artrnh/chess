import React from 'react';

import Navigation from 'Common/Navigation';
import Layout from 'Common/Layout';
import Game from 'Pages/Game';

const App = () => (
  <>
    <Navigation />
    <Layout>
      <Game />
    </Layout>
  </>
);

export default App;
