import * as React from 'react';
import { Button, Box, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';


export default function Skill(props) {

  const [skill, setSkill] = React.useState('');
  const [hability, setHability] = React.useState('');


  const handleHabilityChange = (event) => {
    setHability(event.target.value);
  };

  function handleMoreSkillOnClick() {
    // eslint-disable-next-line react/prop-types
    props.moreSkillClicked ? props.setMoreSkillClicked(false) : props.setMoreSkillClicked(true);
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
    props.setMoreSkillClicked(false)
    setSkill('')

  }


  return (
    <>
      {props.skillAdded &&
        // eslint-disable-next-line react/prop-types
        props.generalInfo.skills.map((skill =>
          <Box key={skill.id}>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs>
                <Typography fontFamily={'lato'}>{skill.skill}</Typography>
              </Grid>
              <Grid item style={{ marginLeft: 'auto', paddingRight: 20, paddingBottom: 8 }}>
                <Tooltip title="Delete">
                  <IconButton>
                    <ClearIcon onClick={() => props.deleteSkill(skill.id)} style={{ cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        ))
      }
      {props.moreSkillClicked ?
        <form onSubmit={handleSkillSubmit}>
          <Box>
            <Box>
              <Grid container alignItems='center' spacing={1}>
                <Grid item>
                  <TextField onChange={handleSkillChange}
                    value={skill}
                    name="skill"
                    id="filled-basic"
                    label="Skill"
                    variant="outlined"
                    required />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" sx={{ m: 1, minWidth: 90 }}>
                    <InputLabel id="demo-simple-select-filled-label">rating</InputLabel>
                    <Select
                      labelId="rating-skill"
                      id="simple-select-required"
                      value={hability}
                      label="rating"
                      onChange={handleHabilityChange}
                      required
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button sx={{ height: "4em" }} variant="text" type="submit">Add</Button>
                </Grid>

              </Grid>


            </Box>

          </Box>
        </form>
        :
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
          <Fab color="primary" aria-label="add" size='small' onClick={handleMoreSkillOnClick}>
            <AddIcon />
          </Fab>
        </Box>
      }
    </>
  )
}