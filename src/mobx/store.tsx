import { RouterStore } from 'mobx-router';

export class RootStore {
	public router: RouterStore<RootStore>;


	constructor() {
		this.router = new RouterStore<RootStore>(this);
	}

}

const store = new RootStore();

export default store;
