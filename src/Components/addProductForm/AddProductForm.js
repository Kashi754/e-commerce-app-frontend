import { useEffect, useRef, useState } from 'react';
import { CategorySelect } from '../categorySelect/CategorySelect';
import { ImageUpload } from '../imageUpload/ImageUpload';
import { postFormApi } from '../../utilities/fetchApi';
import { CurrencyInput } from '../currencyInput/CurrencyInput';
import { unformat } from 'accounting-js';
import './addProductForm.css';

export function AddProductForm() {
  const [previewImage, setPreviewImage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({
    product_name: '',
    price: '',
    quantity: '',
    description: '',
    categories: [],
    image: null,
  });
  const imageRef = useRef(null);

  function checkFields() {
    if (
      !form.product_name &&
      !form.price &&
      !form.quantity &&
      !form.description &&
      !form.image &&
      form.categories.length === 0
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  useEffect(() => {
    checkFields();
  }, [form]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    // Display the values
    formData.append('product_name', form.product_name);
    formData.append('price', unformat(form.price));
    formData.append('quantity', form.quantity);
    formData.append('description', form.description);
    formData.append('image', form.image);
    formData.append(
      'categories',
      JSON.stringify(form.categories.map((category) => category.id))
    );

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    try {
      postFormApi(`${serverUrl}/products`, formData);
      imageRef.current.value = '';
      setForm({
        product_name: '',
        price: '',
        quantity: '',
        description: '',
        categories: [],
        image: null,
      });
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      className='add-product-form'
      onSubmit={handleSubmit}
    >
      <h5>Add a Product</h5>
      <fieldset className='product-fieldset'>
        <fieldset className='product-base-fieldset'>
          <div className='product-field'>
            <label htmlFor='product-name'>Product Name:</label>
            <input
              type='text'
              name='product_name'
              id='product-name'
              className='product-input'
              onChange={handleChange}
              value={form.product_name}
            />
          </div>
          <div className='product-field'>
            <label htmlFor='price'>Price:</label>
            <CurrencyInput
              id='price'
              className='product-input'
              name='price'
              placeholder='$0.00'
              onChange={handleChange}
              value={form.price}
            />
          </div>
          <div className='product-field'>
            <label htmlFor='quantity'>Quantity:</label>
            <input
              type='number'
              name='quantity'
              id='quantity'
              className='product-input'
              onChange={handleChange}
              value={form.quantity}
            />
          </div>
        </fieldset>
        <ImageUpload
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          setFormData={setForm}
          image={form.image}
          imageRef={imageRef}
        />
      </fieldset>
      <label htmlFor='description'>Description:</label>
      <textarea
        name='description'
        id='description'
        rows='5'
        cols='50'
        onChange={handleChange}
        value={form.description}
      />
      <label htmlFor='categories'>Categories:</label>
      <CategorySelect
        form={form}
        setForm={setForm}
      />
      <button
        type='submit'
        className='inventory-submit-button'
        disabled={disabled}
      >
        Submit
      </button>
    </form>
  );
}
