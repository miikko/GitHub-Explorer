import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ProjectSortOption } from '../../interfaces';

interface Props {
  value: ProjectSortOption;
  onChange: (value: ProjectSortOption) => void;
}

const ProjectSorter = (props: Props) => (
  <FormControl>
    <InputLabel>Sort by</InputLabel>
    <Select
      native
      value={props.value}
      onChange={(e) => props.onChange(e.target.value as ProjectSortOption)}
    >
      <option value={ProjectSortOption.DEFAULT} />
      <option value={ProjectSortOption.RATING_ASC}>Rating (ASC)</option>
      <option value={ProjectSortOption.RATING_DESC}>Rating (DESC)</option>
      <option value={ProjectSortOption.CREATED_ASC}>Created (ASC)</option>
      <option value={ProjectSortOption.CREATED_DESC}>Created (DESC)</option>
    </Select>
  </FormControl>
);

export default ProjectSorter;
