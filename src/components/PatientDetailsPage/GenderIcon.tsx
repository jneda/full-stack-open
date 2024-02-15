import { Patient } from "../../types";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

interface Props {
  patient: Patient;
}

const GenderIcon = ({ patient }: Props) => {
  switch (patient.gender) {
    case "male": {
      return <MaleIcon />;
    }
    case "female": {
      return <FemaleIcon />;
    }
    case "other": {
      return <TransgenderIcon />;
      break;
    }
    default: {
      throw new Error(`Unexpected gender: ${patient.gender}`);
    }
  }
};

export default GenderIcon;
