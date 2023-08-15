import StateManchine from './StateManchine'
import { States, Actions } from './editor.types'
import Node from '../object/node'
import { Topics } from './Topics'

export default class Editor extends StateManchine<States, States, Actions> {
  public root : Node
  constructor() {
    super(States.DragStart)
    this.root = new Node('root', 0, 0, 800, 800)
    this.describeDragMove()
    this.describeDrop()
  }

  describeDragMove() {
    let dragNode: Node
    this.register(States.DragStart, States.Moving, Actions.EvtDrag, (node) => {
      dragNode = node
    })
    this.register(States.Moving, States.PlacingComponent, Actions.EvtDragEnd, (vec) => {
      dragNode.setXY(vec)
      dragNode.emit(Topics.NodePositionMoved)
    })
    this.register(States.PlacingComponent, States.Stoped, Actions.AUTO, () => {})
  }

  describeDrop() {
    let meta = null
    let addVector = null
    this.register(States.Selected, States.PlacingComponent, Actions.StartAddComponent, (m) => {
      meta = m
    })
    this.register(States.PlacingComponent, States.PlacingComponent, Actions.EvtDrag, (vec) => {
      addVector = vec
    })
    this.register(States.PlacingComponent, States.AddingComponent, Actions.EvtDrop, () => {
      const { x, y, w, h } = meta
      const node = new Node('', x, y, w, h)
      this.root.add(node)
      this.root.emit(Topics.NodeChildrenUpdated)
    })
    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
      
    })
  }

  public getRoot() {
    return this.root
  }
}