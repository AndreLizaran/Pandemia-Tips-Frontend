// Modules
import { BrowserRouter } from 'react-router-dom';

// States
import GeneralState from './states/GeneralState';

// Router
import Router from './Router';

export default function App() {
  //
  return (
    <BrowserRouter>
      <GeneralState>
        <Router />
      </GeneralState>
    </BrowserRouter>
  );
}
