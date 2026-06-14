import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../assets/logo.png';

const NAV_ITEMS = [
  { label: 'Home', target: 'home' },
  { label: 'Courses', target: 'courses' },
  { label: 'Why Us', target: 'why-us' },
  { label: 'About', target: 'about' },
  { label: 'Faculty', target: 'faculty' },
  { label: 'Reviews', target: 'testimonials' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Find active section
      const scrollPosition = window.scrollY + 100;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.target);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.target);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? 'rgba(2, 11, 26, 0.90)'
            : 'rgba(2, 11, 26, 0.70)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid rgba(157, 187, 255, 0.15)'
            : '1px solid rgba(157, 187, 255, 0.05)',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '76px' }}>
            {/* Logo */}
            <Box
              component="a"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Box
                component="img"
                src={logoUrl}
                alt="VCG Brand Logo"
                sx={{
                  height: { xs: '38px', md: '44px' },
                  width: 'auto',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(157, 187, 255, 0.3)',
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  fontFamily: '"Montserrat", sans-serif',
                  background: 'linear-gradient(45deg, #FFFFFF 30%, #FFE066 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Vidhya Code Gurukul
              </Typography>
            </Box>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.target;
                  return (
                    <Button
                      key={item.target}
                      onClick={() => handleNavClick(item.target)}
                      sx={{
                        color: isActive ? '#9DBBFF' : '#DCE7FF',
                        fontWeight: 600,
                        position: 'relative',
                        px: 1.5,
                        py: '6px',
                        fontSize: '0.85rem',
                        '&:hover': {
                          color: '#FFFFFF',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeUnderline"
                          style={{
                            position: 'absolute',
                            bottom: -4,
                            left: 12,
                            right: 12,
                            height: '2px',
                            background: 'linear-gradient(90deg, #9DBBFF, #FFE066)',
                            borderRadius: '2px',
                          }}
                        />
                      )}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* Desktop CTA Action Button */}
            {!isMobile && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleNavClick('contact')}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  borderRadius: '24px',
                  px: 3.5,
                  py: 1,
                  boxShadow: '0 4px 15px rgba(255, 224, 102, 0.3)',
                }}
              >
                Join Now
              </Button>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#DCE7FF' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'linear-gradient(135deg, #020B1A 0%, #071527 100%)',
            borderLeft: '1px solid rgba(157, 187, 255, 0.15)',
            p: 3,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              fontFamily: '"Montserrat", sans-serif',
              color: '#FFE066',
            }}
          >
            VC Gurukul
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#FFFFFF' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <ListItem key={item.target} disablePadding>
                <ListItemButton
                  onClick={() => handleNavClick(item.target)}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(157, 187, 255, 0.1)' : 'transparent',
                    borderLeft: isActive ? '3px solid #FFE066' : '3px solid transparent',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color: isActive ? '#FFE066' : '#FFFFFF',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.95rem',
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 'auto', pt: 4 }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => handleNavClick('contact')}
            sx={{ py: 1.5, fontWeight: 700, borderRadius: '12px' }}
          >
            Join Free Demo
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
