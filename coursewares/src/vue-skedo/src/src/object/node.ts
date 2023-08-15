import { Map as ImmutableMap, List } from 'immutable'
import Emiter from './EventMiter'
import { Topics } from './Topics'

export default class Node extends Emiter{
  private nodeData: ImmutableMap<string, any>
  constructor(type: string, x: number, y: number, w: number, h: number) {
    super()
    this.nodeData = ImmutableMap({
      x,y,w,h,type,
      children: List<Node>()
    })
  }

  public getType() {
		return this.nodeData.get('type')
	}

	public getX(){
		return this.nodeData.get('x')
	}

	public getY(){
		return this.nodeData.get('y')
	}

	public getW(){
		return this.nodeData.get('w')
	}

	public getH() {
		return this.nodeData.get('h')
	}

  public getChildren() {
    return this.nodeData.get('children').toJS()
  }

  public addChild(n: Node) {
    this.nodeData = this.nodeData.update('children', (children) => {
      return  children.push(n)
    })
  }

  public setXY(vec : [number, number]) {
    this.nodeData = this.nodeData
      .set("x", vec[0] + this.nodeData.get("x"))
      .set("y", vec[1] + this.nodeData.get("y"))
  }
}