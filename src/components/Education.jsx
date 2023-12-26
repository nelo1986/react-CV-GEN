import * as React from 'react';
import { FormControl, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';


export default function Education(props) {
  const [formEducation, setFormEducation] = React.useState({
    id: '',
    start_year: '',
    end_year: '',
    degree_and_field: '',
    center: ''
  })

  React.useEffect(() => {
    console.log("formEducation ha cambiado:", formEducation);
  }, [formEducation]);


  function handleMoreEdOnClick() {
    props.moreEdClicked ? props.setMoreEdClicked(false) : props.setMoreEdClicked(true);
  }

  function handleChange(e, datePickerName) {
    let value, name;
    if (datePickerName) {
      value = e.format('YYYY')
      name = datePickerName
    } else {
      name = e.target.name;
      value = e.target.value;
    }

    setFormEducation((prevEdValues => ({
      ...prevEdValues,
      [name]: value
    })))

    console.log(formEducation)
  }

  function handleSubmit(e){
    e.preventDefault();
    let id = uuidv4();
    let {start_year, end_year, degree_and_field, center} = formEducation;
    if (!start_year || !end_year || !degree_and_field.trim() || !center.trim()){
      console.log('El campo es requerido');
      return;
    }

    props.addEducation({id,start_year, end_year, degree_and_field, center})
    props.setMoreEdClicked(false)
    setFormEducation('')
    
  }

  return (
    <>
      {props.educationAdded &&
        props.generalInfo.education.map((ed =>
          <Box key={ed.id}>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs>
                <Typography fontFamily={'lato'}>{ed.degree_and_field}</Typography>
              </Grid>
              <Grid item style={{ marginLeft: 'auto', paddingRight: 20, paddingBottom: 8 }}>
                <Tooltip title="Delete">
                  <IconButton>
                    <ClearIcon onClick={() => props.deleteEducation(ed.id)} style={{ cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        ))
      }
      {props.moreEdClicked ?
        <form onSubmit={handleSubmit}>

          <FormControl fullWidth sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' }, paddingRight: 2, paddingTop: 2
          }} variant="filled" >

            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <Grid container spacing={1}>
                <Grid item xs>
                  <DatePicker
                    label={'Start year'}
                    views={['year']}
                    onChange={(fecha) => handleChange(fecha, 'start_year')}
                  />
                </Grid>
                <Grid item xs>
                  <DatePicker
                    label={'End year'}
                    views={['year']}
                    onChange={(fecha) => handleChange(fecha, 'end_year')}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <TextField
                    value={props.generalInfo.education.degree_and_field}
                    name="degree_and_field"
                    id="degree_and_field"
                    label="Degree and Field Study"
                    onChange={handleChange}
                    variant='outlined' />
                  <TextField
                    value={props.generalInfo.education.center}
                    name="center"
                    id="center"
                    label="School or University"
                    onChange={handleChange}
                    variant='outlined' />
                </Grid>

              </Grid>
              <Button variant="text" type='submit'>Add</Button>

            </LocalizationProvider>
          </FormControl>
        </form>
        :
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
          <Fab color="primary" aria-label="add" size='small' onClick={handleMoreEdOnClick}>
            <AddIcon />
          </Fab>
        </div>
      }
    </>
  );


}