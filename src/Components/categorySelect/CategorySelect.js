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

    if (newOption) {
      return {
        id: newOption.id,
        name: newOption.name,
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

  const styles = {
    clearIndicator: (provided) => ({
      ...provided,
      color: 'red',
      cursor: 'pointer',
    }),
    container: (provided) => ({
      ...provided,
      border: 'var(--border-style)',
      borderRadius: '0.5rem',
    }),
    control: (provided) => ({
      ...provided,
      width: '100%',
      zIndex: '0',
      borderRadius: '0.5rem',
      border: 'none',
      borderColor: 'none',
      boxShadow: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--purple)',
      cursor: 'pointer',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: 'var(--purple)',
    }),
    input: (provided) => ({
      ...provided,
      color: 'var(--purple)',
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: 'var(--purple-placeholder)',
    }),
    loadingMessage: (provided) => ({
      ...provided,
      color: 'var(--purple-placeholder)',
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: 'var(--pink)',
      border: 'var(--border-style)',
      borderRadius: '0.25rem',
      padding: '0.5rem',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--purple)',
      borderRadius: '0.25rem',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--pink)',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'red',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'var(--purple-placeholder)',
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: 'var(--purple)',
    }),
    option: (provided, { isDisabled, isFocused }) => ({
      ...provided,
      backgroundColor: isDisabled
        ? undefined
        : isFocused
          ? 'var(--purple)'
          : undefined,
      color: isDisabled
        ? 'var(--purple-placeholder)'
        : isFocused
          ? 'var(--pink)'
          : 'var(--purple)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      borderRadius: '0.25rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--purple-placeholder)',
    }),
  };

  return (
    <>
      <CreatableSelect
        id='categories'
        isClearable
        isMulti
        onChange={(newValue) =>
          setForm((prev) => ({
            ...prev,
            categories: newValue.map((category) => {
              return { id: category.value, name: category.label };
            }),
          }))
        }
        onCreateOption={handleCreate}
        value={form.categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        isDisabled={isLoading}
        isLoading={isLoading}
        name='categories'
        options={[...options]}
        styles={styles}
        className='basic-multi-select'
        classNamePrefix='select'
        placeholder='Select or add categories for the product...'
      />
    </>
  );
}
