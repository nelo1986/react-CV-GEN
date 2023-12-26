import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0: '',
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Proficient',
  5: 'Native',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating(props) {
  const [value, setValue] = React.useState(props.rating ?? 2);
  const [hover, setHover] = React.useState(-1);


  // Actualiza el estado local cuando la prop rating cambia.
  // Esto solo debe ocurrir cuando el componente padre indique un cambio de rating,
  // por ejemplo, después de añadir un lenguaje.
  React.useEffect(() => {
    setValue(props.rating);
  }, [props.rating]);

  // Este efecto secundario comunica el valor de la calificación al componente padre.
  // Debe ejecutarse solo cuando el valor local cambie y no debe ser el resultado de
  // una actualización de la prop rating para evitar el bucle.
  const handleRatingChange = (newValue) => {
    setValue(newValue);
    if (props.rating !== newValue) {
      props.getrating(newValue);
    }
  };

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          handleRatingChange(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
