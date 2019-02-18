import _Vue from "vue";

export interface IAction {
    (...args: any[]): any
    actionName: string
    successActionName: string
    failActionName: string
    toString: () => string
}


export interface IActionFunction<R> extends IAction {
    (...args: any[]): R
}

export interface IContext {
    commit: (type: string, payload: any) => void
    dispatch: (type: string, payload: any) => void
    getters: {}
    rootGetters: {}
    rootState: {}
    state: {}
}

export function actionNameCreator(
    prefix?: string
) : (name: string) => string


export function actionTypePrefixCreator(
    prefix?: string
) : (name: string) => string


export function actionCreator<Payload, T>(
    actionName: string,
    payloadCreator?: (context: IContext, payload: any) => Payload,
): IActionFunction<T>

export function mutationCreator(
    actionFunction: () => void
): {
    [mutationName: string]: (payload: any) => void
}

type Dictionary<T> = { [key: string]: T };

export function mapPending(
  pendingActions: Dictionary<IAction | IAction[]>
): Dictionary<boolean>

declare function install(Vue: _Vue): void;

declare const _default: {
    install: typeof install;
};

export default _default