import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import {
  loadProductCategories,
  selectCategories,
  selectIsLoading,
} from '../../Pages/home/homeSlice';
import { useEffect } from 'react';
import { postApi } from '../../utilities/fetchApi';

export function CategorySelect({ form, setForm }) {
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_SERVER_URL;
  const serverUrl = `http://${url}/products/categories`;

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(loadProductCategories());
    }
  }, [categories, dispatch]);

  async function createOption(label) {
    const newOption = await postApi(serverUrl, { name: label });
    console.log(newOption);
    if (newOption) {
      return {
        value: newOption.id,
        label: newOption.name,
      };
    }
  }
  async function handleCreate(inputValue) {
    const newOption = await createOption(inputValue);
    dispatch(loadProductCategories());
    setForm((prev) => ({
      ...prev,
      categories: [...prev.categories, newOption],
    }));
  }

  return (
    <>
      <CreatableSelect
        id='categories'
        isClearable
        isMulti
        onChange={(newValue) =>
          setForm((prev) => ({ ...prev, categories: newValue }))
        }
        onCreateOption={handleCreate}
        value={form.categories}
        isDisabled={isLoading}
        isLoading={isLoading}
        name='categories'
        options={[...options]}
        className='basic-multi-select'
        classNamePrefix='select'
      />
      <span className='select-note'>
        Select or add categories for the product.
      </span>
    </>
  );
}
