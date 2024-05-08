import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import {Rotas} from './routes'

// Instânciando elemento root e criando roteador 
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
<React.StrictMode>
  <Rotas/>
</React.StrictMode>
);