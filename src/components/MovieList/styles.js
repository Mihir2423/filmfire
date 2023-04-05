import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    movieContainer : {
      display : "flex",
      flexWrap : "wrap",
      justifyContent : "left",
      textAlign : "center",
       overflow : "auto",
       [theme.breakpoints.down('sm')] : {
        justifyContent : 'center'
       }
    }
  };
});
            