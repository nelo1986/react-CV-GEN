import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ImageUpload from './ImageUpload';
import { Box, Typography } from '@mui/material';

export default function GeneralInfo(props) {

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

  return (
    <>
      <FormControl fullWidth sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' }, paddingRight: 2,
      }} variant="filled" >
        <TextField value={props.generalInfo.name} name="name" id="fullname" label="Full name" variant="outlined" onChange={handleOnChange} />
        <TextField value={props.generalInfo.email} name="email" id="email" label="Email" variant="outlined" onChange={handleOnChange} />
        <TextField value={props.generalInfo.phone} name="phone" id="phone" label="Phone number" variant="outlined" onChange={handleOnChange} />
        <TextField value={props.generalInfo.address} name="address" id="adress" label="Adress" variant="outlined" onChange={handleOnChange} />
        <TextField value={props.generalInfo.profession} name="profession" id="profession" label="profession" variant="outlined" onChange={handleOnChange} />
        <TextField value={props.generalInfo.profile_description} name="profile_description" id="profile_description" label="profile" onChange={handleOnChange} variant='outlined' multiline rows={10} />
      </FormControl>
      <Box padding={2}>
        <Typography fontFamily='lato' variant='subtitle1'>Profile picture:</Typography>
        <ImageUpload addPicture={props.addPicture} />


      </Box>

    </>




  )
}