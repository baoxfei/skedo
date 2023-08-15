import Emiter from './EventMiter'

type StateTransferFunction = (...args : Array<any>) => void

export default class StateMachine<S extends number | string, T extends number | string, A extends number | string> extends Emiter {
  private state: S
  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>
  constructor(initState: S) {
    super()
    this.state = initState
    this.transferTable = new Map();
  }

  public dispatch(action: A, ...data: any) {
    const adjTable = this.transferTable.get(this.state)
    if (!adjTable) return false 
    const [fn, state] = adjTable.get(action)!
    fn && fn(...data)
    this.state = state
    while(this.dispatch('<auto>' as A))
    return true
  }

  private addTransfer(from: S, to: T, action: A, fn: StateTransferFunction) {
    if (!this.transferTable.has(from)) {
      this.transferTable.set(from, new Map())
    }
    const adjTable = this.transferTable.get(from)
    adjTable?.set(action, [fn, to])
  }

  public  register(from: S | S[], to: T, action: A, fn: StateTransferFunction) {
    if (Array.isArray(from)) {
      from.forEach((n) => {
        this.addTransfer(n, to, action, fn)
      })
    } else {
      this.addTransfer(from , to, action, fn)
    }
  }

}