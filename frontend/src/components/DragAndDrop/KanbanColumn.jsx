import React from 'react'
import KanbanCard from './KanbanCard'

const KanbanColumn = ({ column }) => {
  return (
    <div className="kanban-column">
      <h2>{column.title}</h2>
      <div className="kanban-cards">
        {column.cards.map((card, index) => (
          <KanbanCard key={card.id} card={card} index={index} columnId={column.id} />
        ))}
      </div>
    </div>
  )
}

export default KanbanColumn
