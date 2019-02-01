import mutationCreator from './mutation-creator';
import { actionCreator , actionCreators, actionNameCreator } from './action-creator';

const actionTypePrefixCreator = (...args) => {
	console.warn('vuex-actions: this methods is depleted')
  return actionNameCreator.call(this, ...args)
}

export {
	mutationCreator,
	actionCreator,
  actionCreators,
  actionNameCreator,
	actionTypePrefixCreator,
};


