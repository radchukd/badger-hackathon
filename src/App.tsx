import { createContext } from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import store, { RootStore } from './mobx/store';
import { MobxRouter } from 'mobx-router';


export interface AppProps {
	store: typeof store;
}

export const StoreContext = createContext({} as RootStore);
export const StoreProvider = StoreContext.Provider;

function App(props: AppProps) {
	return (
		<StoreProvider value={props.store}>
				<CssBaseline />
					<Container maxWidth={false} style={{ height: '100%' }}>
						<MobxRouter store={props.store} />
					</Container>
		</StoreProvider>
	);
}

export default App;
