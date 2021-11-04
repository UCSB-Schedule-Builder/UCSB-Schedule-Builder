import grid from '../constants/classList';
import { ClassListType } from '../stores/classLists';
import useSearch from '../stores/classSearch';

function AddClassBtn({ classType }: { classType: ClassListType }) {
  const search = useSearch(state => state.search);

  function handleAddClass() {
    search(classType);
  }

  return <>
    <button onClick={handleAddClass}>+ Add Class</button>
    <style jsx>{`
      button {
        border-radius: 10px;
        background-color: #f9f9f9;
        color: #5e6c84;
        border: none;
        width: 100%;
        padding: 0.4rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: -${grid * .25}px 0 ${grid * .75}px;
      }

      button:hover {
        background-color: #091e4214;
        color: #172b4d;
      }
    `}</style>
  </>
}

export default AddClassBtn;