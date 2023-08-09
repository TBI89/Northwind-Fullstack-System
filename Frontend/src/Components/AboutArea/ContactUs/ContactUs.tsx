import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import "./ContactUs.css";
import { Clear, ContactMail, Send } from "@mui/icons-material";

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs">

            <Typography variant="h3">

                Contact Us &nbsp;

                <ContactMail fontSize="large" />

            </Typography>

            <form>

                <TextField label="Name" type="text" className="TextBox" />

                <TextField label="Email" type="email" className="TextBox" />

                <TextField label="Message" type="text" className="TextBox" />

                <FormControlLabel control={<Checkbox />} label={"Send me promotional emails"} className="Left" />

                <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary">Send &nbsp; <Send/></Button>
                    <Button type="reset" color="secondary">Clear &nbsp;<Clear/></Button>
                </ButtonGroup>

            </form>

        </div>
    );
}

export default ContactUs;
