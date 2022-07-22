import PeopleIcon from "@mui/icons-material/People";
import ImageIcon from "@mui/icons-material/Image";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import DnsIcon from "@mui/icons-material/Dns";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "Projects",
    route: "/project",
  },
  {
    id: 1,
    icon: <DnsIcon />,
    label: "Dashboard",
    route: "/dashboard",
  }
];
