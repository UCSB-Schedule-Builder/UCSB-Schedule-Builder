import type { NextPage } from 'next';
import Head from 'next/head';
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

// fake data generator
const getItems = (count: number, offset = 0): Item[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
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
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function QuoteApp() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {({ droppableProps, innerRef, placeholder }, snapshot) => (
                <div
                  ref={innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...(droppableProps)}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
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
                              justifyContent: "space-around"
                            }}
                          >
                            {item.content}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
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
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>UCSB Schedule Builder</title>
        <meta name="description" content="Build conflict free UCSB class schedules!"/>
        <link rel="icon" href="/favicon.ico"/>
        <style>{'body { background-color: #f9f9f9; }'}</style>
      </Head>
      <h1>UCSB Schedule Builder 😎</h1>
      <div>
        <h2>Classes</h2>
        <NoSSR>
          <QuoteApp/>
        </NoSSR>
      </div>
      <h2>Calendar</h2>
      <h2>Alternates</h2>
      <style jsx>{`
        .container {
          margin: 2vh 15vw;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 150px);
        }

        h1 {
          font-size: 2.8rem;
          grid-column: 1/-1;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        h2 {
          font-size: 2.4rem;
          font-weight: 500;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        body {
          padding: 20px;
        }

        ul {
          list-style-type: none;
          border-radius: 10px;
          width: 200px;
          background-color: white;

          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.20);
        }

        li {
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }

        li:last-child {
          border-bottom: none;
        }

        span {
          float: right;
        }

      `}</style>
    </div>

  )
};

export default Home;

