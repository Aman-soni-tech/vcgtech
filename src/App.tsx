import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
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
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          backgroundColor: '#020B1A', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden'
        }}
      >
        {/* Navigation bar */}
        <Navbar />

        {/* Home/Hero Intro block */}
        <Hero />

        {/* Highlighting features panel */}
        <Features />

        {/* Academic Course selection */}
        <Courses />

        {/* Detailed institution values checklist */}
        <About />

        {/* Lead faculty cards */}
        <Faculty />

        {/* Student testimonial list */}
        <Testimonials />

        {/* Dynamic call to action prompt */}
        <CTA />

        {/* Direct response feedback form */}
        <Contact />

        {/* System Footer information */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
