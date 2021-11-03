import NoSSR from 'react-no-ssr';

import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DraggingStyle,
  Droppable,
  DroppableId,
  DropResult,
  NotDraggingStyle
} from "react-beautiful-dnd";
import { CSSProperties, useState } from "react";

interface Item {
  id: string;
  content: string;
}

const classTypeOrder = ["Classes", "Alternates"];

// fake data generator
const getItems = (count: number, offset = 0): Item[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}\nlecture times\nsection times`
  }));

const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source: Item[], destination: Item[],
              droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: DroppableId]: Item[]; } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

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
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "#f9f9f9",
  padding: `${grid * 1.5}px ${grid * 1.5}px ${grid * 0.25}px`,
  width: 500,
  borderRadius: 10
});

function ClassList() {
  const [classes, setClasses] = useState([getItems(3), getItems(5, 3)]);
  const [alternates, setAlternates] = useState([]);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(classes[sInd], source.index, destination.index);
      const newState = [...classes];
      newState[sInd] = items;
      setClasses(newState);
    } else {
      const result = move(classes[sInd], classes[dInd], source, destination);
      const newState = [...classes];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setClasses(newState.filter(group => group.length));
    }
  }

  return (
    <div className="container">
      {/*<button*/}
      {/*  type="button"*/}
      {/*  onClick={() => {*/}
      {/*    setClasses([...classes, getItems(1)]);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Add new item*/}
      {/*</button>*/}
      <NoSSR>
        <DragDropContext onDragEnd={onDragEnd}>
          {classes.map((el, ind) => (
            <>
              <h2>{classTypeOrder[ind]}</h2>
              <div className="class-list">
                <Droppable key={ind} droppableId={`${ind}`}>
                  {({ droppableProps, innerRef, placeholder }, snapshot) => (
                    <div
                      ref={innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...(droppableProps)}
                    >
                      {el.map(({ content, id }, index) => (
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
                                    const newState = [...classes];
                                    newState[ind].splice(index, 1);
                                    setClasses(
                                      newState.filter(group => group.length)
                                    );
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
                </Droppable>
              </div>
            </>
          ))}
        </DragDropContext>
      </NoSSR>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          grid-row: 2 / 4;
          grid-column: 1;
        }

        h2 {
          margin: 0 auto 0.4rem;

          color: white;

          font-size: 2.4rem;
          font-weight: 500;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .class-list {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

export default ClassList;