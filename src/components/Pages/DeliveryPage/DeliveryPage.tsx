import React, { useEffect } from "react";
import Cover from "../../General/Cover";
import DeliveryList from "../../DeliveryList/DeliveryList";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
});

function DeliveryPage() {
  const history = useHistory();
  const { isPhone } = useParams();
  const classes = useStyles();
  const userId = useSelector((state: RootState) => state.userId);
  const deliveries = useSelector((state: RootState) => state.delivery.rows);
  const [isLoading, setIsLoading] = React.useState(false);

  if (userId === "") {
    history.push("/");
  }

  // useEffect(() => {
  //   if(deliveries.length > 0)
  //     setIsLoading(false);
  // }, [deliveries])

  return (
    <div>
      <Cover />
      {isLoading ? (
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <DeliveryList isPhone={isPhone} />
      )}
    </div>
  );
}

export default DeliveryPage;
