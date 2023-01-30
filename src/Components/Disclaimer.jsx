import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";

const Disclaimer = () => {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined" className="disclaimer">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <WarningTwoToneIcon color="error" /> Investing 101: Know the Risks
        </Typography>
        <Typography wrap variant="body2" color="text.secondary">
          Investment in the stock market carries risk. We urge you to do your
          own research and consult a financial advisor before making any
          investment decisions. The recommendations on our website should not be
          considered financial advice.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Disclaimer;
