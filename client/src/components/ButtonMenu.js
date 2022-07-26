import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
import { Typography } from "@mui/material";

const ButtonMenu = ({ status, options, id, onGetStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const open = Boolean(anchorEl);

  const btnColor = options.filter((option) =>
    option.name === status ? option.name : false
  );

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, option) => {
    // event.stopPropagation();
    if (option.name === status) {
      return;
    }
    const changedStatus = {
      status: option.name,
    };

    onGetStatus(id, changedStatus);

    setSelectedIndex(index);
    setAnchorEl(null);
    setCurrentStatus(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickListItem}
        sx={{
          textTransform: "capitalize",
          color: "#FFF",
          backgroundColor:
            currentStatus === null ? btnColor[0].color : currentStatus.color,
          fontSize: "12px",
        }}
      >
        {currentStatus === null ? status : currentStatus.name}
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
        {options.map((option, index) => {
          return (
            <MenuItem
              key={option.color}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index, option)}
            >
              <CircleIcon
                fontSize="small"
                sx={{ width: "12px", color: option.color, mr: "8px" }}
              />
              <Typography variant="span" sx={{ fontSize: "13px" }}>
                {option.name}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default ButtonMenu;
