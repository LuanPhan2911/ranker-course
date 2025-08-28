import React from 'react';
import { devtools } from 'valtio/utils';
import './index.css';

import Pages from './pages';
import { state } from './state';

devtools(state, 'app state');
const App: React.FC = () => <Pages />;

export default App;
