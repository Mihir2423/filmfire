import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    movie: {
      padding: "10px",
      display : "grid",
      placeItems : "center"
    },
    links: {
      alignItems: "center",
      fontWeight: "bolder",
      [theme.breakpoints.up("xs")]: {
        display: "flex",
        flexDirection: "column",
      },
      "&:hover": {
        cursor: "pointer",
        textDecoration: "none",
      },
    },
    image: {
      borderRadius: "20px",
      height: "300px",
      marginBottom: "10px",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    title: {
      color: theme.palette.text.primary,
      width: "230px",
      overflow: "hidden",
      marginTop: "10px",
      marginBottom: 0,
      textAlign: "center",
    },
  };
});
