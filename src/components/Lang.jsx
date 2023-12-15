
import { TextField } from "@mui/material"
export default function Lang(props){

  return(
    <TextField disabled name="language" id="filled-basic" label="Language" variant="standard" value={props.lang}/>
  )
}