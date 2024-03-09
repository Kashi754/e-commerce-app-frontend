export function ImageUpload({
  previewImage,
  setPreviewImage,
  setFormData,
  image,
  imageRef,
}) {
  function handleImageChange(e) {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className='image-upload'>
      <input
        type='file'
        ref={imageRef}
        id='image'
        name='image'
        key={image}
        accept='image/*'
        onChange={handleImageChange}
      />
      {previewImage && (
        <img
          className='preview'
          src={previewImage}
          alt='preview'
        />
      )}
      <p className='image-upload-text'>Max image size: 1MB</p>
    </div>
  );
}
