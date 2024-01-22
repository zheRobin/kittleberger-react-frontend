import { BrowserRouter} from 'react-router-dom';
import Router from 'router';
import 'assets/css/App.css';
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
