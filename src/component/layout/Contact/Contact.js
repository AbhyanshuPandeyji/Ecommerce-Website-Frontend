import React, { Fragment } from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <Fragment>
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:abhyanshupandeytestemail@gmail.com">
        <Button>Contact: abhyanshupandeytestemail@gmail.com</Button>
      </a>
    </div>
    </Fragment>
  );
};

export default Contact;
