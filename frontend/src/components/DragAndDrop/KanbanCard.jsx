import React from 'react'
import { createSwapy } from 'swapy'

const KanbanCard = ({ card, index }) => {
    const { Draggable } = createSwapy()

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="kanban-card"
          ref={provided.innerRef} // Ensure ref is properly passed
          {...provided.draggableProps} // Bind draggable props
          {...provided.dragHandleProps} // Bind drag handle
        >
          {card.content}
        </div>
      )}
    </Draggable>
  )
}

export default KanbanCard
