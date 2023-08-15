import Metas from '../object/Metas'
import styles from './drag-drop.module.scss'
import { Actions } from '../object/editor.types'

export default ({ editor }) => {
  return Metas.map(n => {
    <div
      class={styles['item-list']}
    >
      {
        Metas.map(n => (
          <div
            draggable={true}
            onDragstart={() => {
              editor.dispatch(Actions.StartAddComponent, n)
            }}
            class={styles["item"]}
            key={n.type}
          >
            {n.title}
          </div>
        ))
      }
    </div>
  })
}
