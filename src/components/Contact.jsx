import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from '@mui/material';



export default function Contact(props) {

  return (
    <>
      {props.title}
      <div>
        <AlternateEmailIcon />{props.email}
      </div>
      <div>
        <ContactPhoneIcon />{props.phone}
      </div>

      <div> <HomeIcon />{props.address}
      </div>
    </>
  )
}