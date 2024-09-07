import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/MainContent'
function App() {
    return (
        <div className="App">
            <div>
                <Header/>
            </div>
            <div>
                <Main/>
            </div>
        </div>

    );
}

export default App;
