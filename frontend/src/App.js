import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Router from './Router';
import i18n from './i18n';

const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    </div>
  );
}

export default App;
