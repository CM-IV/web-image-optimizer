import { render } from 'preact'
import App from './app'

render(<App />, document.body);

postMessage({ payload: 'removeLoading' }, '*')
