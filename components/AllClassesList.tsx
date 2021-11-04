import NoSSR from 'react-no-ssr';

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import useClassLists, { ClassListLocation, ClassListType } from '../stores/classLists';
import ClassList from './ClassList';

interface ClassMetadata {
  id: ClassListType,
  name: string
}

const classListOrder: ClassMetadata[] = [
  { id: "main", name: "Classes" },
  { id: "alternate", name: "Alternates" }
];

function AllClassesList() {
  const move = useClassLists(state => state.move);

  interface ClassDropResult extends DropResult {
    source: ClassListLocation,
    destination: ClassListLocation,
  }

  function onDragEnd(result: ClassDropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    move(source, destination);
  }

  return (
    <div className="container">
      <NoSSR>
        <DragDropContext onDragEnd={onDragEnd}>
          {classListOrder.map(({ id, name }, ind) => (
            <div key={ind}>
              <h2>{name}</h2>
              <div className="class-list">
                <ClassList classType={id}/>
              </div>
            </div>
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
          justify-content: center;
        }

        .class-list {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

export default AllClassesList;