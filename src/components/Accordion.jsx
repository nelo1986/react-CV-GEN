import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Skill from './Skill'
import Language from './Language'
import PracticalExperience from './PracticalExperience';
import GeneralInfo from './GeneralInfo';
import Education from './Education';
export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    props.setMoreExpClicked(false)
    props.setMoreLangClicked(false)
    props.setMoreSkillClicked(false)
    props.setMoreEdClicked(false)


  };

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
          id="panel1bh-header">
          <Typography sx={accordionTitleStyle}>
            General information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>

          <GeneralInfo
            generalInfo={props.generalInfo}
            onAdd={props.onAdd}
            onAddEmail={props.onAddEmail}
            onAddPhone={props.onAddPhone}
            onAddAddress={props.onAddAddress}
            onAddProfile={props.onAddProfile}
            onAddProfession={props.onAddProfession}
            addPicture={props.addPicture}
          />

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

          <Education
            generalInfo={props.generalInfo}
            educationAdded={props.educationAdded}
            setEducationAdded={props.setEducationAdded}
            moreEdClicked={props.moreEdClicked}
            setMoreEdClicked={props.setMoreEdClicked}
            deleteEducation={props.deleteEducation}
            addEducation={props.addEducation}

          />



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
          <PracticalExperience
            expAdded={props.expAdded}
            jobexperiences={props.jobexperiences}
            onDeleteExperience={props.onDeleteExperience}
            moreExpClicked={props.moreExpClicked}
            setMoreExpClicked={props.setMoreExpClicked}
            findExpById={props.findExpById}
            editExperience={props.editExperience}
            onAddExperience={props.onAddExperience}
            setExpAdded={props.setExpAdded}
          />
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
          <Language
            langAdded={props.langAdded}
            languages={props.languages}
            onDeleteLanguage={props.onDeleteLanguage}
            onAddLanguage={props.onAddLanguage}
            setLangAdded={props.setLangAdded}
            setMoreLangClicked={props.setMoreLangClicked}
            moreLangClicked={props.moreLangClicked}
          />
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
          <Skill
            skillAdded={props.skillAdded}
            generalInfo={props.generalInfo}
            deleteSkill={props.deleteSkill}
            moreSkillClicked={props.moreSkillClicked}
            setMoreSkillClicked={props.setMoreSkillClicked}
            addSkill={props.addSkill}

          />
        </AccordionDetails>
      </Accordion>

    </div>
  );
}