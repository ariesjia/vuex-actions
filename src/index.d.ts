export interface IActionFunction<R>{
    (...args: any[]): R
    actionName: string
    successActionName: string
    failActionName: string
    toString: () => string
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