import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { Button, Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function PracticalExperience(props) {
  const [editClicked, setEditClicked] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [formExpData, setExpFormData] = React.useState({
    id: '',
    company: '',
    position: '',
    start: '',
    end: '',
    description: ''
  })

  React.useEffect(() => {
    console.log("formExpData ha cambiado:", formExpData);
  }, [formExpData]);

  const handleToggle = (event) => {
    setChecked(event.target.checked);
  };

  function handleMoreExpOnClick() {
    // eslint-disable-next-line react/prop-types
    props.moreExpClicked ? props.setMoreExpClicked(false) : props.setMoreExpClicked(true);
    setChecked(false)
  }

  function handleExpOnChange(e, datePickerName) {
    let value, name;
    //date picket name solo viene del date picker
    if (datePickerName) {
      value = e.format('YYYY/MM/DD')
      name = datePickerName;
    } else {
      name = e.target.name;
      value = e.target.value;
    }

    setExpFormData((prevExpValues => ({
      ...prevExpValues,
      [name]: value
    })))

  }

  function handleExpSubmit(e) {
    e.preventDefault();
    let { id, company, position, start, end, description } = formExpData;
    if (checked) end = 'currently';//its for "currently working"
    if (!company.trim() || !position.trim() || !start || !end || !description.trim()) {
      console.log('El campo es requerido');
      return;
    }
    // eslint-disable-next-line react/prop-types
    props.onAddExperience({ id, company, position, start, end, description });
    e ?? setExpFormData({
      id: '',
      company: '',
      position: '',
      start: '',
      end: '',
      description: ''
    });
    // eslint-disable-next-line react/prop-types
    props.setExpAdded(true)
    // eslint-disable-next-line react/prop-types
    props.setMoreExpClicked(false)

  }



  function addDataToFieldsToEdit(id) {
    // eslint-disable-next-line react/prop-types
    const newData = props.findExpById(id);
    newData.end === 'currently' ? setChecked(true) : setChecked(false)
    setExpFormData(prevExpValues => ({
      ...prevExpValues,
      id: newData.id,
      company: newData.company,
      position: newData.position,
      start: dayjs(newData.start),
      end: dayjs(newData.end),
      description: newData.description
    }))
    setEditClicked(true)
  }

  function handleExpEdit(e) {
    //objeto modificado
    e.preventDefault();
    let { id, company, position, start, end, description } = formExpData;
    if (typeof (start) === 'object') {
      start = start.format('YYYY/MM/DD');
    }
    if (typeof (end) === 'object') {
      if (checked) end = "currently"
      else end = end.format('YYYY/MM/DD');
    }
    // eslint-disable-next-line react/prop-types
    props.editExperience({ id, company, position, start, end, description })
    setExpFormData({
      id: '',
      company: '',
      position: '',
      start: '',
      end: '',
      description: ''
    });

    setEditClicked(false)
    // eslint-disable-next-line react/prop-types
    props.setMoreExpClicked(false)

  }


  return (
    <>
      {props.expAdded &&
        // eslint-disable-next-line react/prop-types
        props.jobexperiences.map((experience =>
          <Box key={experience.id}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography fontFamily={'lato'}>{experience.company}</Typography>

              </Grid>
              <Grid item style={{ marginLeft: 'auto', paddingRight: 20, paddingBottom: 8 }}>
                <Tooltip title="Delete">
                  <IconButton>
                    <ClearIcon onClick={() => props.onDeleteExperience(experience.id)} style={{ cursor: 'pointer', marginRight: 2 }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon onClick={() => addDataToFieldsToEdit(experience.id)} style={{ cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        ))
      }
      {props.moreExpClicked ?
        <form onSubmit={!editClicked ? handleExpSubmit : handleExpEdit}>
          <div>
            <FormControl fullWidth sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' }, paddingRight: 2, paddingTop: 2
            }} variant="filled" >

              <TextField value={formExpData.company} name="company" onChange={handleExpOnChange} label="company name" variant='outlined' required />
              <TextField value={formExpData.position} name="position" onChange={handleExpOnChange} label="position" variant='outlined' required />
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {editClicked ?
                    <>
                      <DatePicker label="start" value={formExpData.start} defaultValue={formExpData.start} onChange={(fecha) => handleExpOnChange(fecha, 'start')} />
                      {checked ?
                        <DatePicker disabled label="end" value={formExpData.end} defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                        :
                        <DatePicker label="end" value={formExpData.end} defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                      }
                      <FormControlLabel
                        value="Currently"
                        control={<Checkbox checked={checked} onChange={handleToggle} inputProps={{ 'aria-label': 'controlled' }} />}
                        label="Currently"
                        labelPlacement="end"
                      />
                    </>
                    :
                    <>
                      <DatePicker label="start" defaultValue={formExpData.start} onChange={(fecha) => handleExpOnChange(fecha, 'start')} />
                      {checked ?
                        <DatePicker disabled label="end" defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                        :
                        <DatePicker label="end" defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                      }
                      <Box paddingLeft={1}>
                        <FormControlLabel
                          value="Currently"
                          control={<Checkbox checked={checked} onChange={handleToggle} inputProps={{ 'aria-label': 'controlled' }} />}
                          label="Currently working"
                          labelPlacement="end"
                          style={{ marginVertical: 0, alignItems: 'center' }} // Ajusta el estilo aquí si es necesario
                        />
                      </Box>

                    </>
                  }
                </LocalizationProvider>

              </div>
              <TextField value={formExpData.description} name="description" label="description" onChange={handleExpOnChange} variant='outlined' multiline rows={4} required />
              {!editClicked ?
                <Button variant="text" type='submit'>Add experience</Button>

                :
                <Button variant="text" type='submit'>Edit experience</Button>
              }
            </FormControl>
          </div>
        </form>
        :
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
          <Fab color="primary" aria-label="add" size='small' onClick={handleMoreExpOnClick}>
            <AddIcon />
          </Fab>
        </div>
      }
    </>
  )
}