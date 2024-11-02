import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SettingsIcon from "@mui/icons-material/Settings";
export default function Menu({ alignment, setAlignment }) {
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div>
      <BottomNavigation showLabels value={alignment} onChange={handleChange}>
        <BottomNavigationAction
          label="Weather"
          value={true}
          fontSize="large"
          icon={<WbSunnyIcon />}
        />
        <BottomNavigationAction
          label="Setting"
          value={false}
          fontSize="large"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
