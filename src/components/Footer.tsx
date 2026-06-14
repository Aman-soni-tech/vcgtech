import React from 'react';
import { Box, Container, Typography, Grid, Stack, IconButton, useTheme, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import logoUrl from '../assets/logo.png';

export default function Footer() {
  const theme = useTheme();

  const handleNavClick = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#010e24',
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: 'relative',
        borderTop: '1px solid rgba(160, 190, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '2.2fr 1fr 1fr 0.8fr',
            },
            gap: { xs: 5, md: 8 },
            mb: 6,
          }}
        >
          
          {/* Logo & Description */}
          <Box>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  component="img"
                  src={logoUrl}
                  alt="VCG Brand Logo"
                  sx={{
                    height: '38px',
                    width: 'auto',
                    borderRadius: '4px',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    fontFamily: '"Montserrat", sans-serif',
                    background: 'linear-gradient(45deg, #FFFFFF 30%, #FFE066 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Vidhya Code Gurukul
                </Typography>
              </Box>
              
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                  maxWidth: '380px',
                  fontSize: '0.9rem',
                }}
              >
                Empowering the next generation of software engineers through modern coding mentorship, real-world portfolio blueprints, and traditional Gurukul discipline & excellence.
              </Typography>
              
              {/* Social Media Row */}
              <Stack direction="row" spacing={1.5}>
                {[
                  { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
                  { icon: <GitHubIcon />, url: 'https://github.com' },
                  { icon: <InstagramIcon />, url: 'https://instagram.com' },
                  { icon: <TwitterIcon />, url: 'https://twitter.com' },
                ].map((social, i) => (
                  <IconButton
                    key={i}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      color: '#9DBBFF',
                      border: '1px solid rgba(157, 187, 255, 0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#9DBBFF',
                        color: '#020B1A',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Box>
          
          {/* Quick Links Column 1 */}
          <Box>
            <Stack spacing={2.5}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#9DBBFF',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.78rem',
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { label: 'All Courses', target: 'courses' },
                  { label: 'Why Choose Us', target: 'why-us' },
                  { label: 'About Gurukul', target: 'about' },
                  { label: 'Faculty & Mentors', target: 'faculty' },
                ].map((link, i) => (
                  <Typography
                    key={i}
                    component="a"
                    onClick={() => handleNavClick(link.target)}
                    sx={{
                      color: 'rgba(220, 231, 255, 0.70)',
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      width: 'fit-content',
                      '&:hover': {
                        color: '#FFE066',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Contact Details Column 2 */}
          <Box>
            <Stack spacing={2.5}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#9DBBFF',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.78rem',
                }}
              >
                Our Programs
              </Typography>
              <Stack spacing={1.5}>
                {[
                  'C++ Competitive DSA',
                  'Full Stack development',
                  'Enterprise Java spring',
                  'Artificial Intelligence',
                  'Web UI Foundations',
                ].map((prog, i) => (
                  <Typography
                    key={i}
                    component="a"
                    onClick={() => handleNavClick('courses')}
                    sx={{
                      color: 'rgba(220, 231, 255, 0.70)',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      width: 'fit-content',
                      '&:hover': {
                        color: '#FFE066',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {prog}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Legal / Institutional segment */}
          <Box>
            <Stack spacing={2.5}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#9DBBFF',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.78rem',
                }}
              >
                Campus Info
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ color: 'rgba(220, 231, 255, 0.65)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Monday — Sunday<br />
                  8:00 AM - 8:00 PM
                </Typography>
                <Typography
                  component="a"
                  onClick={() => handleNavClick('contact')}
                  sx={{
                    color: '#FFE066',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Contact Admissions
                </Typography>
              </Stack>
            </Stack>
          </Box>
          
        </Box>

        <Divider sx={{ borderColor: 'rgba(160, 190, 255, 0.08)', mb: 3 }} />

        {/* Copyright strip */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            py: 1,
            color: 'rgba(220, 231, 255, 0.45)',
          }}
        >
          <Typography variant="caption" sx={{ fontSize: '0.78rem', fontFamily: '"JetBrains Mono", monospace' }}>
            © 2026 Vidhya Code Gurukul. All Rights Reserved.
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.75rem', display: 'flex', gap: 2 }}>
            <Box component="a" href="#courses" onClick={(e) => { e.preventDefault(); handleNavClick('courses'); }} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#FFE066' } }}>Privacy Policy</Box>
            <Box component="span">|</Box>
            <Box component="a" href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#FFE066' } }}>Terms of Service</Box>
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
