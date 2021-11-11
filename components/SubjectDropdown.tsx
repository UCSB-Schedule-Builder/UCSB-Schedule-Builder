import SelectSearch, {
  fuzzySearch,
} from "react-select-search-nextjs-typescript";
import useSubjects from "../stores/subjects";

function SubjectDropdown() {
  const subjects = useSubjects(({ subjects }) => subjects);
  const options = subjects.map(({ code, name }) => ({ value: code, name }));
  return (
    <SelectSearch
      options={options}
      search
      filterOptions={fuzzySearch}
      emptyMessage="Not found"
      placeholder="Select subject"
    />
  );
}

export default SubjectDropdown;
