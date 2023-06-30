import React, { useContext, useEffect, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mealsImage from "../../assest/pexels-ella-olsson-1640772.jpg";
import classes from "../Layout/Header.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import CartContext from "../../store/cart-context";
import { AuthContext } from "../../Auth/AuthContext";
import Button from "@mui/material/Button";
import { Loader, Placeholder } from 'rsuite';
// import InputBase from "@mui/material/InputBase";
// import { styled, alpha } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import logo from "../../assest/mylogo.png";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));


export default function Header(props) {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const cartCtx = useContext(CartContext);
  const { loggedInUser, logout } = useContext(AuthContext);
  const { items } = cartCtx;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser && logout) {
      setTimeout(() => {

      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [loggedInUser, logout]);

  if (isLoading) {
    return <>
      <Loader center content="Loading" />
      <Placeholder.Paragraph rows={8} />
    </>;
  }

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  //Logout here
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/", { replace: true });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const menuItemStyle = {
    textDecoration: "none",
    color: "inherit",
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/add-product" style={menuItemStyle}>
          Add Product
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Link style={menuItemStyle}>Logout</Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
        

      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit">
          <Badge
            className={classes.bump}
            badgeContent={numberOfCartItems}
            color="error"
            onClick={props.onShowCart}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Add Product</p>
      </MenuItem>

    </Menu>
  );

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar className={classes.header}>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "block", sm: "block" } }}>
              <Link to="/" className={classes.logo}>
                <h1>TasteBazaar</h1>
              </Link>
            </Typography>


            {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}

            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{
                display: { xs: "none", md: "flex", alignItems: "center" },
              }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={props.onShowCart}>
                <Badge
                  className={classes.bump}
                  badgeContent={numberOfCartItems}
                  color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {loggedInUser ? (
                // <IconButton
                //   size="large"
                //   edge="end"
                //   aria-label="account of current user"
                //   aria-controls={menuId}
                //   aria-haspopup="true"
                //   onClick={handleProfileMenuOpen}
                //   color="inherit">
                //   <AccountCircle />
                // </IconButton>
                <Button
                  onClick={handleProfileMenuOpen}
                  variant="outlined"
                  size="medium"
                  style={{
                    color: "black",
                    background: "white",
                    fontWeight: "bold",
                    borderRadius: "14px",
                  }}>
                  Welcome {loggedInUser.name}
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    variant="outlined"
                    size="medium"
                    style={{
                      color: "black",
                      background: "white",
                      fontWeight: "bold",
                      borderRadius: "14px",
                    }}>
                    Login
                  </Button>
                </Link>
              )}
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <div className={classes["main-image"]}>
        <div className={classes["image-container"]}>
          <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
      </div>
    </Fragment>
  );
}
