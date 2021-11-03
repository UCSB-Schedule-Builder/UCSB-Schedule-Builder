import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { CSSProperties } from 'react';
import useClassLists, { ClassListType } from '../store/ClassLists';

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "#f9f9f9",
  padding: `${grid * 1.5}px ${grid * 1.5}px ${grid * 0.25}px`,
  width: 500,
  borderRadius: 10
});

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

function ClassList({ classType }: { classType: ClassListType }) {
  const classes = useClassLists(state => state[classType]);
  const remove = useClassLists(state => state.remove);

  const removeAt = (index: number) => remove({ droppableId: classType, index });

  return <Droppable droppableId={classType}>
    {({ droppableProps, innerRef, placeholder }, snapshot) => (
      <div
        ref={innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
        {...(droppableProps)}
      >
        {classes.map(({ content, id }, index) => (
          <Draggable
            key={id}
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
        ))}
        {placeholder}
      </div>
    )}
  </Droppable>;
}

export default ClassList;