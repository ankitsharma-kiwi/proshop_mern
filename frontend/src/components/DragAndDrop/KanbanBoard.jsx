import React, { useEffect, useState } from 'react';
import { createSwapy } from 'swapy';
import KanbanCard from './KanbanCard';

const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', content: 'Task 1' },
        { id: 'card-2', content: 'Task 2' },
      ],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', content: 'Task 3' },
      ],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      cards: [
        { id: 'card-4', content: 'Task 4' },
      ],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const KanbanBoard = () => {
  const [boardData, setBoardData] = useState(initialData);

  const { SwapyProvider, Droppable, Draggable } = createSwapy();

  const onDragEnd = (source, destination) => {
    if (!destination) return;

    const sourceColumn = boardData.columns[source.droppableId];
    const destinationColumn = boardData.columns[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const newCardOrder = Array.from(sourceColumn.cards);
      const [removed] = newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, removed);

      const newColumn = {
        ...sourceColumn,
        cards: newCardOrder,
      };

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const sourceCards = Array.from(sourceColumn.cards);
      const [removed] = sourceCards.splice(source.index, 1);
      const destinationCards = Array.from(destinationColumn.cards);
      destinationCards.splice(destination.index, 0, removed);

      const newSourceColumn = {
        ...sourceColumn,
        cards: sourceCards,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        cards: destinationCards,
      };

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        },
      });
    }
  };

  useEffect(() => {
    const container = document.querySelector('.kanban-board')
    const swapy = createSwapy(container)
    swapy.onSwap(({ data }) => {
      localStorage.setItem('slotItem', JSON.stringify(data.object))
    })

    return () => {
      swapy.destroy()
    }
  }, [])

  return (
    <SwapyProvider onDrop={onDragEnd}>
      <div className="kanban-board">
        {boardData.columnOrder.map((columnId) => {
          const column = boardData.columns[columnId];
          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef} // Make sure ref is set correctly
                  {...provided.droppableProps} // Bind droppable props
                >
                  <h2>{column.title}</h2>
                  <div className="kanban-cards">
                    {column.cards.map((card, index) => (
                      <KanbanCard key={card.id} card={card} index={index} />
                    ))}
                    {provided.placeholder} {/* Placeholder required for Swapy */}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </SwapyProvider>
  );
};

export default KanbanBoard;
