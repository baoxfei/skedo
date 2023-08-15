import { defineComponent, ref } from 'vue'
import { deepMerge } from '../../util/deepMerge'
import { DragValue } from '../object/dragValue'
import type {VNode, PropType} from 'vue'

const useDrag = ({ onDragend, onDragstart }) => {
  const value = new DragValue()
  const diffX = ref(value.getDiffX())
  const diffY = ref(value.getDiffY())
  const handles = {
    onDragstart: (e) => {
      onDragstart && onDragstart(e)
      value.start([e.clientX, e.clientY])
    },
    onDragend : (e : DragEvent) => {
      value.update(e)
      onDragend && onDragend([value.getDiffX(), value.getDiffY()])
    },
    onDrag: (e) => {
      value.update([e.clientX, e.clientY])
      diffX.value = value.getDiffX()
      diffY.value = value.getDiffY()
    }
  }

  return {
    handles,
    diffX,
    diffY,
  }
}


const addPropsToVNode = (vNode: VNode, props: Record<string, any>) => {
  vNode.props = deepMerge(vNode.props, props)
  return vNode
}


export default defineComponent({
  props: {
    onDragstart: {
      type: Function as PropType<() => void>,
    },
    onDragend: {
      type: Function as PropType<() => void>,
    },
    initPosition: {
      type: Array as any as PropType<[number, number]> 
    }
  },
  setup({ onDragstart, onDragend, initPosition }, ctx) {
    const { handles, diffX, diffY } = useDrag({ onDragstart, onDragend })

    return () => {
      let vNode = ctx.slots.default!()[0]
      vNode = addPropsToVNode(vNode, {
        ...handles,
        draggable: true,
        style : {
          position : 'absolute',
          left : (initPosition?.[0] || 0) + "px",
          top: (initPosition?.[1] || 0) + "px",
          transform : `translate(${diffX.value}px, ${diffY.value}px)`
        }
      })
      return vNode
    }
  }
})