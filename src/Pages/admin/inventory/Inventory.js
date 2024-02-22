import { useRef, useState } from 'react';
import { CategorySelect } from '../../../Components/categorySelect/CategorySelect';
import { ImageUpload } from '../../../Components/imageUpload/ImageUpload';
import { postFormApi } from '../../../utilities/fetchApi';

export function Inventory() {
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    product_name: '',
    price: '',
    quantity: '',
    description: '',
    categories: [],
    image: null,
  });
  const imageRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    // Display the values
    formData.append('product_name', form.product_name);
    formData.append('price', form.price);
    formData.append('quantity', form.quantity);
    formData.append('description', form.description);
    formData.append('image', form.image);
    formData.append(
      'categories',
      JSON.stringify(form.categories.map((category) => category.value))
    );

    try {
      postFormApi('http://localhost:5000/products', formData);
      console.log(imageRef);
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
      console.log(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      className='inventory'
      onSubmit={handleSubmit}
    >
      <h1>Inventory</h1>
      <label htmlFor='product-name'>Product Name</label>
      <input
        type='text'
        name='product_name'
        id='product-name'
        onChange={handleChange}
        value={form.product_name}
      />
      <ImageUpload
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        setFormData={setForm}
        image={form.image}
        imageRef={imageRef}
      />
      <label htmlFor='price'>Price</label>
      <input
        type='number'
        name='price'
        id='price'
        onChange={handleChange}
        value={form.price}
      />
      <label htmlFor='quantity'>Quantity</label>
      <input
        type='number'
        name='quantity'
        id='quantity'
        onChange={handleChange}
        value={form.quantity}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        name='description'
        id='description'
        rows='5'
        cols='50'
        onChange={handleChange}
        value={form.description}
      />
      <label htmlFor='categories'>Category</label>
      <CategorySelect
        form={form}
        setForm={setForm}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
