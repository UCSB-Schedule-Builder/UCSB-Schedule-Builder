import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { CSSProperties } from 'react';

import { Class } from '../store/ClassLists';
import grid from '../constants/classList';

const getItemStyle =
  (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid * 1.5}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.20)",

    borderRadius: 10,

    // styles we need to apply on draggables
    ...draggableStyle
  });

function ClassCard({
                     classData,
                     index,
                     removeAt
                   }: { classData: Class, index: number, removeAt: (index: number) => void }) {
  const { id, content } = classData;
  return <Draggable
    draggableId={id}
    index={index}
  >
    {({ dragHandleProps, draggableProps, innerRef }, snapshot) => (
      <div
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          draggableProps.style
        )}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            whiteSpace: "pre-wrap"
          }}
        >
          {content}
          <button
            type="button"
            onClick={() => {
              removeAt(index);
            }}
          >
            delete
          </button>
        </div>
      </div>
    )}
  </Draggable>
}

export default ClassCard;