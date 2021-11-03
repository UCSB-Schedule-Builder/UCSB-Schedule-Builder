import { Droppable } from 'react-beautiful-dnd';

import useClassLists, { ClassListType } from '../store/ClassLists';
import ClassCard from './ClassCard';
import grid from '../constants/classList';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "#f9f9f9",
  padding: `${grid * 1.5}px ${grid * 1.5}px ${grid * 0.25}px`,
  width: 500,
  borderRadius: 10
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
        {classes.map((theClass, index) => (
          <ClassCard classData={theClass} index={index} removeAt={removeAt} key={theClass.id}/>
        ))}
        {placeholder}
      </div>
    )}
  </Droppable>;
}

export default ClassList;