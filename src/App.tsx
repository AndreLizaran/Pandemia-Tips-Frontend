// Modules
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// States
import GeneralState from './states/GeneralState';

// Screens
import Home from './screens/Home';

export default function App() {
  //
  return (
    <BrowserRouter>
      <GeneralState>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </GeneralState>
    </BrowserRouter>
  );
}
