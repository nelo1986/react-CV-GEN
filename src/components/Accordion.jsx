import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HoverRating from './HoverRating';
import { Button, Box, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Lang from './Lang';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [moreLangClicked, setMoreLangClicked] = React.useState(false);
  const [editClicked, setEditClicked] = React.useState(false);
  const [rating, setRating] = React.useState(2);
  const [language, setLanguage] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [hability, setHability] = React.useState('');

  const handleHabilityChange = (event) => {
    setHability(event.target.value);
  };

  const [formExpData, setExpFormData] = React.useState({
    id: '',
    company: '',
    position: '',
    start: '',
    end: '',
    description: ''
  })
  const [checked, setChecked] = React.useState(false);

  const handleToggle = (event) => {
    setChecked(event.target.checked);
  };
  React.useEffect(() => {
    console.log("formExpData ha cambiado:", formExpData);
  }, [formExpData]);



  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    props.setMoreExpClicked(false)
    setMoreLangClicked(false)

  };


  function handleOnChange(e) {
    // eslint-disable-next-line react/prop-types
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        // eslint-disable-next-line react/prop-types
        props.onAdd(value);
        break;
      case 'email':
        // eslint-disable-next-line react/prop-types
        props.onAddEmail(value);
        break;
      case 'phone':
        // eslint-disable-next-line react/prop-types
        props.onAddPhone(value);
        break;
      case 'address':
        // eslint-disable-next-line react/prop-types
        props.onAddAddress(value);
        break;
      case 'profile_description':
        // eslint-disable-next-line react/prop-types
        props.onAddProfile(value);
        break;
      case 'profession':
        // eslint-disable-next-line react/prop-types
        props.onAddProfession(value);
    }
  }

  function handleMoreLangOnClick() {
    moreLangClicked ? setMoreLangClicked(false) : setMoreLangClicked(true);
  }
  function handleMoreExpOnClick() {
    // eslint-disable-next-line react/prop-types
    props.moreExpClicked ? props.setMoreExpClicked(false) : props.setMoreExpClicked(true);
    setChecked(false)
  }

  function handleMoreSkillOnClick() {
    // eslint-disable-next-line react/prop-types
    props.moreSkillClicked ? props.setMoreSkillClicked(false) : props.setMoreSkillClicked(true);
    setChecked(false)
  }

  function handleSkillChange(event) {
    let skill = event.target.value;
    setSkill(skill);
  }

  function handleSkillSubmit(e) {
    e.preventDefault();
    const id = uuidv4();
    if (!skill.trim()) {
      console.log('El campo Skill es requerido');
      return;
    }
    // eslint-disable-next-line react/prop-types
    props.addSkill({ id, skill, hability })
    // eslint-disable-next-line 
    console.log(id,skill, hability)
    setSkill('')

  }
  function getRating(rating) {
    setRating(rating);
  }
  function handleLanguageChange(event) {
    let lang = event.target.value;
    setLanguage(lang)
  }

  function handleLangSubmit(e) {
    e.preventDefault();
    const id = uuidv4();
    if (!language.trim()) {
      console.log('El campo Language es requerido');
      return;
    }
    // eslint-disable-next-line react/prop-types
    props.onAddLanguage({ id, language, rating })
    // eslint-disable-next-line react/prop-types
    props.setLangAdded(true)
    setLanguage('')
    setRating(2)
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
    if (checked) end = 'currently';
    if (!company.trim() || !position.trim() || !start || !end || !description.trim()) {
      console.log('El campo es requerido');
      return;
    }
    //const id =uuidv4();
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
    console.log(end)
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

  const accordionTitleStyle = {
    fontFamily: 'merriweather',
    width: '100%',
    flexShrink: 0
  }
  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={accordionTitleStyle}>
            General information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' }, paddingRight: 2
          }} variant="filled" >
            <TextField value={props.generalInfo.name} name="name" id="fullname" label="Full name" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.email} name="email" id="email" label="Email" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.phone} name="phone" id="phone" label="Phone number" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.address} name="address" id="adress" label="Adress" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.profession} name="profession" id="profession" label="profession" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.profile_description} name="profile_description" id="profile_description" label="profile" onChange={handleOnChange} variant='outlined' multiline rows={10} />
          </FormControl>
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={accordionTitleStyle}>Education</Typography>
        </AccordionSummary>
        <AccordionDetails>



        </AccordionDetails>
      </Accordion>




      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={accordionTitleStyle}>
            Practical experience
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                  <div className='datePicker'>
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
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={accordionTitleStyle}>
            Languages
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.langAdded &&
            // eslint-disable-next-line react/prop-types
            props.languages.map((lang =>
              <div key={uuidv4()}>
                <Lang lang={lang.language} />
                <ClearIcon onClick={() => props.onDeleteLanguage(lang.id)} style={{ cursor: 'pointer' }} />
              </div>
            ))

          }
          {moreLangClicked ?
            <form onSubmit={handleLangSubmit}>
              <div className='wrapperLang'>
                <div className='languages'>
                  <TextField onChange={handleLanguageChange}
                    value={language}
                    name="language"
                    id="filled-basic"
                    label="Language"
                    variant="outlined"
                    required />
                  <HoverRating name="rating" getrating={getRating} rating={rating} />
                </div>
                <div className='addButton'>
                  <Button sx={{ height: "4em" }} variant="text" type="submit">Add</Button>
                </div>
                <div className='rating'>
                </div>
              </div>
            </form>
            :
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
              <Fab color="primary" aria-label="add" size='small' onClick={handleMoreLangOnClick}>
                <AddIcon />
              </Fab>
            </div>
          }
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={accordionTitleStyle}>Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.skillAdded &&
            // eslint-disable-next-line react/prop-types
            props.generalInfo.skills.map((skill =>
              <Box key={uuidv4()}>
                {skill.skill}
                <ClearIcon onClick={() => props.deleteSkill(skill.id)} style={{ cursor: 'pointer' }} />

              </Box>
            ))
          }
          {props.moreSkillClicked ?
            <form onSubmit={handleSkillSubmit}>
              <Box>
                <Box>
                  <TextField onChange={handleSkillChange}
                    value={skill}
                    name="skill"
                    id="filled-basic"
                    label="Skill"
                    variant="outlined"
                    required />
                  <InputLabel id="demo-simple-select-required-label">Hability</InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={hability}
                    label="Hability *"
                    onChange={handleHabilityChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>

                </Box>
                <Button sx={{ height: "4em" }} variant="text" type="submit">Add</Button>
              </Box>
            </form>
            :
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
              <Fab color="primary" aria-label="add" size='small' onClick={handleMoreSkillOnClick}>
                <AddIcon />
              </Fab>
            </Box>
          }
        </AccordionDetails>
      </Accordion>

    </div>
  );
}