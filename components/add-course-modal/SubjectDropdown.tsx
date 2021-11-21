import SelectSearch, {
  fuzzySearch,
  SelectedOptionValue,
} from "react-select-search-nextjs-typescript";
import useCourseMetadata from "../stores/courseMetadata";

export type Selection = string | SelectedOptionValue | SelectedOptionValue[];

interface SubjectDropdownProps {
  value: string;
  onChange: (subject: Selection) => void;
}

function SubjectDropdown({ value, onChange }: SubjectDropdownProps) {
  const subjects = useCourseMetadata(({ subjects }) => subjects);
  const options = subjects.map(({ code, name }) => ({ value: code, name }));
  return (
    <SelectSearch
      options={options}
      search
      value={value}
      onChange={onChange}
      filterOptions={fuzzySearch}
      emptyMessage="Not found"
      placeholder="Select subject"
    />
  );
}

export default SubjectDropdown;
