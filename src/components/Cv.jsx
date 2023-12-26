import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Img from './Img';
import Contact from './Contact';
import { v4 as uuidv4 } from 'uuid';
import Experience from './Experience';
import StarIcon from '@mui/icons-material/Star';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';



export default function Cv(props) {
  const SkillSlider = styled(Slider)({
    color: '#3a8589'

  })

  const textStyle = {
    color: '#737373',
    fontFamily: 'lato',
    variant: 'body1',
  }

  const LefPaneltextStyle = {
    color: 'white',
    fontFamily: 'lato',
    variant: 'body1'
  }
  const leftPanelTitleStyle = {
    color: 'white',
    fontFamily: 'merriweather',
    fontWeight: 'bold',
    letterSpacing: '.1rem'
  }
  const hrStyle = {
    marginLeft: 'auto',
    borderBottom: '1px solid white',
    width: '100%'
  }


  return (
    <>
      <Grid item xs={12} sm={10} md={3} lg={3} xl={3} sx={{ backgroundColor: '#323b4c', color: 'white' }}>
        <Box padding={2}>
          <Box padding={1} width={'100%'}>
            <Img src={props.formData.profile_image !== '' ? props.formData.profile_image : '/images/profile-circle.png'} />
          </Box>
          <Box paddingY={2}>
            <Typography variant='h6' sx={leftPanelTitleStyle}>Contact</Typography>
            <hr style={hrStyle}></hr>
            <Contact
              title={props.formData.title}
              phone={props.formData.phone}
              email={props.formData.email}
              address={props.formData.address}
            />
          </Box>
          <Box paddingY={1}>
            <Typography sx={leftPanelTitleStyle} variant='h6'>Education</Typography>
            <hr style={hrStyle}></hr>
            {props.formData.education.map((ed) =>
              <Box key={uuidv4()} paddingY={1} paddingBottom={1}>

                <Grid container alignItems='center' spacing={1} paddingY={1}>
                  <Grid item xl={5}>
                    <Typography sx={{ fontWeight: 'bold' }} fontFamily={'lato'}>{ed.degree_and_field}</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 'auto', paddingRight: 20, paddingBottom: 8 }}>
                    <Typography fontFamily={'lato'}>{ed.start_year} - {ed.end_year}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography fontFamily={'lato'}>{ed.center}</Typography>
                  </Grid>
                </Grid>
              </Box>


            )
            }





          </Box>
          <Box paddingY={1}>
            <Typography sx={leftPanelTitleStyle} variant='h6'>Languages</Typography>
            <hr style={hrStyle}></hr>
            {props.formData.languages.map((lang) =>
              <Box key={uuidv4()} paddingY={1} paddingBottom={1}>
                <Typography sx={LefPaneltextStyle}> {lang.language}</Typography>
                <Rating precision={0.5} name="read-only" value={lang.rating} emptyIcon={<StarIcon style={{ opacity: 0.23, color: 'white' }} fontSize="inherit" />}
                  readOnly />
              </Box>

            )}
          </Box>
          <Box paddingY={1}>
            <Typography sx={leftPanelTitleStyle} variant='h6'>Skills</Typography>
            <hr style={hrStyle}></hr>
            {props.formData.skills.map((skill) =>
              <Box key={uuidv4()} paddingY={1}>
                <Typography sx={LefPaneltextStyle} component="legend">{skill.skill}</Typography>
                <SkillSlider
                  disabled={false}
                  marks
                  max={5}
                  min={0}
                  defaultValue={2}
                  aria-label="Default" valueLabelDisplay="auto"
                  value={skill.hability}
                  size='small'
                />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>







      <Grid item xs={12} sm={12} md={5} xl={6} sx={{ color: '#737373' }}>
        <Box paddingX={3}>
          <Typography letterSpacing={'.2rem'} color={'#323b4c'} variant='h3' fontFamily={'merriweather'}>{props.formData.name}</Typography>
          <Typography letterSpacing={'.2rem'} color={'#323b4c'} variant='h6' fontFamily={'merriweather'}>{props.formData.profession}</Typography>
          <Typography paddingY={2} style={textStyle}> {props.formData.profile_description}</Typography>
        </Box>
        <Box paddingX={3} paddingBottom={1} paddingTop={1}>
          <Typography sx={{ fontWeight: 'bold' }} letterSpacing={'.2rem'} color={'#323b4c'} variant='h5' fontFamily={'merriweather'}>Experience</Typography>
          <hr color='#323b4c'></hr>
        </Box>

        {props.formData.job_experience.map((experience) =>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
            key={uuidv4()}
          >
            <TimelineItem>
              <TimelineSeparator >
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Experience
                  company={experience.company}
                  position={experience.position}
                  start={experience.start}
                  end={experience.end}
                  description={experience.description}
                />
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        )}
      </Grid>
    </>

  )
}