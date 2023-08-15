import { defineComponent, inject } from 'vue'
import Render from './Render'
import { Actions } from '../object/editor.types'

export default ({ editor }) => {
  return (
    <div
      onDragover={(e) => {
        editor.dispatch(Actions.EvtDrag, [e.clientX, e.clientY])
      }}
      onDrop={() => {
        editor.dispatch(Actions.EvtDrop)
      }}
    >
      <Render root={editor.getRoot()}></Render>
    </div>
  )
}