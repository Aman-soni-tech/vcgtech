import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import AdminCertificate from './components/AdminCertificate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import About from './components/About';
import Faculty from './components/Faculty';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CertificateVerify from './components/CertificateVerify';

import theme from './theme';

export default function App() {
  const path = window.location.pathname;

  
  if (path === '/admin/certificate') {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminCertificate />
    </ThemeProvider>
  );
}

  // Certificate verification page
  if (path === '/verify' || path.startsWith('/verify/')) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CertificateVerify />
      </ThemeProvider>
    );
  }

  // Main website
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: '#020B1A',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
        }}
      >
        <Navbar />
        <Hero />
        <Features />
        <Courses />
        <About />
        <Faculty />
        <Testimonials />
        <CTA />
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
