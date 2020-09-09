import React from "react";
import useStyles from "./Footer.style";

function AppFooter() {
  const classes = useStyles();
  /*
    The bottom part of the screen which includes the unit icon and credits
    */
  return (
    <div className={classes.footerCredits}>
      <img
        className={classes.unitLogo}
        src="shachar-unit-logo.png"
        alt="shachar-unit-logo.png"
      />
      <p>פותח ע"י אגף התקשוב/לוט"ם/שחר</p>
    </div>
  );
}

export default AppFooter;
