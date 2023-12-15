export default function Img(props){
  const imgStyle = {
    width: '250px', // Un tamaño fijo para el ancho
    height: '250px', // Un tamaño fijo para el alto, igual al ancho para hacerlo cuadrado
    display: 'block',
    objectFit: 'cover', // Esto asegura que la imagen cubra completamente el área, pero podría recortarla
    margin: 'auto',
    borderRadius: '50%' // Esto hará que el cuadrado parezca un círculo
  };
  

  return (
    <img src={props.src} style={imgStyle} alt={props.alt || 'I Love you'}/>
  );
}
