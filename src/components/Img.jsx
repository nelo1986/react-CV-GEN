export default function Img(props){
  const imgStyle = {
    maxWidth: '100%', // La imagen puede ser hasta el 100% del ancho del contenedor
    maxHeight: '100vh', // La imagen puede ser hasta el 100% de la altura de la ventana gráfica
    width: 'auto', // La anchura se ajusta automáticamente para mantener la relación de aspecto
    height: 'auto', // La altura se ajusta automáticamente para mantener la relación de aspecto
    display: 'block', // Esto evita que la imagen tenga espacio extra debajo
    objectFit: 'contain', // La imagen se ajustará dentro del contenedor sin cortarse
    margin: 'auto' // Centra la imagen dentro del contenedor si es más pequeña que el contenedor
  };

  return (
    <img src={props.src} style={imgStyle} alt={props.alt || 'I Love you'}/>
  );
}
