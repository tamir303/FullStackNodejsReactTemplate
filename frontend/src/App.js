import './styles/App.css';
import LoginPage from "./pages/LoginPage/LoginPage.js"
import TodoListPage from './pages/TodoListPage/TodoListPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/todos" element={<TodoListPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
