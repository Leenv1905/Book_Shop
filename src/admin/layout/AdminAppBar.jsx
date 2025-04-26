import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function AdminAppBar({ drawerOpen, drawerWidth, handleDrawerToggle }) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: { xs: theme.zIndex.drawer - 1, md: theme.zIndex.drawer - 1 },
        width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
        ml: { md: drawerOpen ? `${drawerWidth}px` : 0 },
        transition: 'width 0.2s ease, margin 0.2s ease',
        backgroundColor: '#3c7980',
        color: '#fffde7',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            ml: '60px',
            display: { xs: 'none', md: 'block' },
            transition: 'width 0.2s ease, margin 0.2s ease',
          }}
        >
          ADMIN
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

AdminAppBar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default AdminAppBar;