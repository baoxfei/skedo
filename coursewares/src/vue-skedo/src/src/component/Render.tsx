import { defineComponent, ref } from 'vue'
import { Topics } from '../../object/Topics'
import Node from '../object/node'
import Draggable from './Draggable'

type SkedoComponent = {
  node: Node
}

const render = (node: Node) => {
  switch(node.getType()) {
    case 'root':
      return <Root node={node}></Root>
    case 'img':
    case 'rect':
    case 'text':
      return <DraggableItem node={node}></DraggableItem>
    default:
      throw new Error(`not support this type: ${node.getType()}`)
  }
}

function renderItem(node: Node) {
  switch (node.getType()) {
    case "image":
      return (
        <img
          src={
            "https://doc.gongwuyun.net/117007b352e8471ba2e803cf60e11c6e.png"
          }
        />
      )
    case "rect":
      return (
        <div
          style={{
            backgroundColor: "yellow",
            width: 100,
            height: 100
          }}
        />
      )
    case "text":
      return <h2>这里是文本</h2>
  }
}



const DraggableItem = (props: SkedoComponent) => {
  return <Draggable>
    {renderItem(props.node)}
  </Draggable>
}



const Render = defineComponent({
  props: {
    node: {
      type: Node,
      required: true,
    }
  },
  setup({ node }) {
    const ver = ref(0)
    node.on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved])
      .subscribe(() => {
        ver.value++
      })
    return () => {
      return <Dummy key={ver.value} render={() => render(node)} />
    }
  },
})


const Dummy = ({ render }: { render: () => JSX.Element }) => {
  return render()
}


const Root = ({ node }: SkedoComponent) => {
  return <div skedo-type="root">
    {
      node.getChildren().map((n, i) => <Render key={i} node={n} />)
    }
  </div>
}