import * as React from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Search from './Search';
import ColorModeIconDropdown from './Themebutton';
import { Padding } from '@mui/icons-material';
import AppTheme from './Theme';


export default function Header() {
  return (
    <AppTheme>
    <CssBaseline enableColorScheme />
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
   <NavbarBreadcrumbs></NavbarBreadcrumbs>

      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
    </AppTheme>
  );
}
