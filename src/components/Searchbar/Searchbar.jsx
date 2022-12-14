import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import {
  Input,
  SearchbarHeader,
  FormWr,
  Button,
  Label,
} from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';
const initialValues = {
  search: '',
};

export const Searchbar = ({ onSubmit }) => {
  const submitSearch = (value, { resetForm }) => {
    if (value.search) {
      onSubmit(value.search);
      resetForm();
    } else toast.info('Please enter a word');
  };
  return (
    <SearchbarHeader>
      <Formik initialValues={initialValues} onSubmit={submitSearch}>
        <FormWr>
          <Button type="submit">
            <BiSearch />
            <Label>Search</Label>
          </Button>

          <Input
            name="search"
            type="text"
            autoComplete="true"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormWr>
      </Formik>
    </SearchbarHeader>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
