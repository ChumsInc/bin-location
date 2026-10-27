import {StrictMode} from 'react';
import {Provider} from 'react-redux';
import App from '@/app/App';
import store from '@/app/configureStore'
import {createRoot} from "react-dom/client";

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>
);
