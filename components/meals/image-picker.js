'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function onPickClick() {
    imageInput.current.click();
  }

  function onImageChange(event) {
    const file = event.target.files[0];
    // console.log('file: ', file);

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      // console.log('dataUrl: ', fileReader.result);
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label form={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image Picked Yet</p>}
          {pickedImage && <Image src={pickedImage} alt='The image selected by the user.' fill />}
        </div>
        <input
          required
          onChange={onImageChange}
          ref={imageInput}
          className={classes.input}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          name={name}
        />
        <button className={classes.button} type='button' onClick={onPickClick}>
          Pick an image
        </button>
      </div>
    </div>
  );
}
