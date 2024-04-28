'use client';
import CardItem from './_components/CardItem';

import { CSSProperties, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableStyle } from '@hello-pangea/dnd';

type Item = {
  id: string;
  content: string;
};

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableStyle) =>
  ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? 'lightgreen' : 'grey',

    ...draggableStyle,
  }) as CSSProperties;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const LandingPage = () => {
  const [items, setItems] = useState<Item[]>(getItems(10));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(items, result.source.index, result.destination.index);

    setItems(reorderedItems);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(dropProvided, snapshot) => (
            <div
              {...dropProvided.droppableProps}
              ref={dropProvided.innerRef}
              className='w-fit overflow-hidden text-nowrap border-2 border-red-400 bg-black text-red-200 first-letter:uppercase hover:text-clip hover:bg-slate-50'
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot1) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='mb-4'
                    >
                      <CardItem content={item.content} />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LandingPage;
