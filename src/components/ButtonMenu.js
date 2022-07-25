import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from "@mui/material";

const ButtonMenu = ({ text, status }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  console.log(status)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const colorStatus = {
    "active": 'lightgreen',
    "on hold": 'red',
    "in progress": 'orange'
  }


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{textTransform: 'capitalize', backgroundColor: colorStatus[text], color: '#FFf'}}
      >
        {text}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <CircleIcon fontSize="small" sx={{ width: '12px', color: 'green', mr: '8px'}}/>
          <Typography variant="span" sx={{ fontSize: '13px' }}>Active</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <CircleIcon fontSize="small" sx={{ width: '12px', color: 'lightblue', mr: '8px'}}/>
          <Typography variant="span" sx={{ fontSize: '13px' }}>In Progress</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <CircleIcon fontSize="small" sx={{ width: '12px', color: 'yellow', mr: '8px'}}/>
          <Typography variant="span" sx={{fontSize: '13px'}}>On Hold</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ButtonMenu;
