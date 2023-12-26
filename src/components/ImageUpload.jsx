import * as React from 'react';
import Input from '@mui/material/Input';

export default function ImageUpload(props) {
  const [selectedImage, setSelectedImage] = React.useState('');

  React.useEffect(() => {
    props.addPicture(selectedImage);
  }, [selectedImage])


  const handleImageChange = (e) => {
    // Revocar la URL del objeto anterior si existe
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    // Guarda el primer archivo seleccionado
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };


  return (

    <div>
        <Input type='file' onChange={handleImageChange} />
    </div>
  );
}
