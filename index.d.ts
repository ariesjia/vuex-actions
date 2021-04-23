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

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type Listener<State, Payload> = {
    (actionName: IActionFunction<Payload> | string, handler: (state: State, payload: Payload) => void ) :  void
    success(actionName: IActionFunction<Payload> | string, handler: (state: State, payload: Await<Payload>) => void ) :  void
    fail(actionName: IActionFunction<Payload> | string, handler: (state: State, payload: Error) => void ) :  void
}

export function mutationCreator<State>(
    actionFunction: (on: Listener<State, any>) => void
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
