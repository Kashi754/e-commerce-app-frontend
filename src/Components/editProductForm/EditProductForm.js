import { useEffect, useRef, useState } from 'react';
import { CategorySelect } from '../categorySelect/CategorySelect';
import { putFormApi } from '../../utilities/fetchApi';
import { CurrencyInput } from '../currencyInput/CurrencyInput';
import { unformat } from 'accounting-js';
import { ImageUpload } from '../imageUpload/ImageUpload';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { loadProductsData } from '../../Pages/products/productsSlice';

export function EditProductForm({ product, handleCancel }) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [previewImage, setPreviewImage] = useState(
    `${serverUrl}/assets/images/products/${product.image_file || product.id + '.jpg'}`
  );
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({
    product_name: product.name,
    price: product.price,
    quantity: product.qty_in_stock,
    description: product.description || '',
    categories: product.categories,
    image: null,
  });
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  function checkFields() {
    if (
      form.product_name === product.name &&
      form.price === product.price &&
      form.quantity === product.qty_in_stock &&
      form.description === product.description &&
      !form.image &&
      JSON.stringify(form.categories) === JSON.stringify(product.categories)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  useEffect(() => {
    checkFields();
  }, [form]);

  useEffect(() => {
    setForm({
      product_name: product.name,
      price: product.price,
      quantity: product.qty_in_stock,
      description: product.description || '',
      categories: product.categories,
      image: null,
    });
  }, [product]);

  async function handleSubmit(e) {
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
    if (!form.image) {
      formData.append('image_file', product.image_file);
    }

    try {
      await putFormApi(`${serverUrl}/products/${product.id}`, formData);
      imageRef.current.value = '';
      dispatch(loadProductsData('?' + searchParams.toString()));
      handleCancel();
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
      <h5>Edit Product</h5>
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
      <button
        type='button'
        className='inventory-submit-button'
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
}
