import View from './features/weather-view/View'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { DetailView } from './features/weather-view/DetailView';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<View />} />
                    <Route path="/:id" element={<DetailView/>} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
