import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Accordion from './Accordion';
import Img from './Img';
import Contact from './Contact';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainGrid() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  function addName(name) {
    setFormData(prevFormData => ({ ...prevFormData, name }));
  }
  function addEmail(email){
    setFormData(prevFormData => ({ ...prevFormData, email }));
  }

  function addAddress(address){
    setFormData(prevFormData => ({ ...prevFormData, address }));
  }
  function addPhone(phone){
    setFormData(prevFormData => ({ ...prevFormData, phone }));
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid container xs={12} md={4}>
          <Grid xs={12} md={12} >
            <Accordion 
              onAdd={addName} 
              onAddEmail={addEmail} 
              onAddPhone={addPhone} 
              onAddAddress={addAddress} 
              />
          </Grid>
          <Grid xs={12} md={12}>
            <Item><Button variant="contained">Submit</Button>
            </Item>
          </Grid>
        </Grid>
        <Grid xs={12} md={8}>
       
          <div className="wrapper">
            <div className="photo"><Img src="/images/ruben.jpeg" /></div>
            <div className="name">{formData.name}</div>
            <div className="nothing">Administrador de Sistemas</div>
            <div className="profile">Perfil</div>
            <div className="contact">
              <Contact 
                title={formData.title}
                phone={formData.phone} 
                email ={formData.email} 
                address={formData.address}/>  
              
            </div>
            <div className="laguagues">Laguages 
           
            
            </div>
            <div className="skills">Skills</div>
            <div className="three"></div>
            <div className="four">Experiencia profesional</div>
            <div className="five">Five</div>
            <div className="six">Six</div>
          </div>

        </Grid>
      </Grid>
    </Box>
  );
}