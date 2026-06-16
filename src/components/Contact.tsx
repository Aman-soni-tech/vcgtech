import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  AlertColor,
  IconButton,
  Stack,
  useTheme,
  CircularProgress,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import DirectionsIcon from '@mui/icons-material/Directions';
import { motion } from 'framer-motion';

export default function Contact() {
  const theme = useTheme();

  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [course, setCourse] = useState('Full Stack Development');
  const [message, setMessage] = useState('');

  // Feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check validation simple check
    const errors: { [key: string]: boolean } = {};
    if (!fullName.trim()) errors.fullName = true;
    if (!mobileNumber.trim()) errors.mobileNumber = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch('/.netlify/functions/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          mobile: mobileNumber,
          course: course,
          message: message,
          date: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSnackbarSeverity('success');
      setSnackbarMessage('Thank you! Our counselor will contact you soon.');
      setOpenSnackbar(true);

      // Reset state
      setFullName('');
      setMobileNumber('');
      setMessage('');
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Something went wrong. Please try again later.');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 10, md: 15 },
        position: 'relative',
        background: 'linear-gradient(135deg, #020B1A 0%, #071527 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
            gap: { xs: 6, lg: 10 },
          }}
        >

          {/* Left Corner: Submission Form Panel */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  fontWeight: 900,
                  mb: 2,
                }}
              >
                Get In{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(45deg, #9DBBFF 30%, #FFE066 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Touch
                </Box>
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: '1.05rem',
                  maxWidth: '550px',
                  mb: 5,
                }}
              >
                Have questions about curriculum, cohort schedules, or fees? Fill out the brief query card below, and our senior career counselor will call you back within 24 hours.
              </Typography>

              {/* Form Entry */}
              <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3.5,
                  }}
                >
                  <Box>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      error={!!formErrors.fullName}
                      helperText={formErrors.fullName ? "Please enter your name" : ""}
                      slotProps={{ inputLabel: { style: { color: 'rgba(220, 231, 255, 0.65)' } } }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      type="tel"
                      label="Mobile Number"
                      variant="outlined"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      error={!!formErrors.mobileNumber}
                      helperText={formErrors.mobileNumber ? "Please enter your mobile number" : ""}
                      slotProps={{ inputLabel: { style: { color: 'rgba(220, 231, 255, 0.65)' } } }}
                    />
                  </Box>
                </Box>

                <FormControl fullWidth variant="outlined">
                  <InputLabel style={{ color: 'rgba(220, 231, 255, 0.65)' }}>Course of Interest</InputLabel>
                  <Select
                    value={course}
                    onChange={(e) => setCourse(e.target.value as string)}
                    label="Course of Interest"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(160, 190, 255, 0.15)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(160, 190, 255, 0.3)',
                      },
                    }}
                  >
                    <MenuItem value="C Programming">C Programming — Foundation class</MenuItem>
                    <MenuItem value="C++ with DSA">C++ with DSA — Logic & structures</MenuItem>
                    <MenuItem value="Java Core & Advanced">Java Enterprise (Spring Framework)</MenuItem>
                    <MenuItem value="Python for AI/ML">Python for AI/ML — Modern analytics</MenuItem>
                    <MenuItem value="Web Development">Web Development — UI responsive fundamentals</MenuItem>
                    <MenuItem value="Full Stack Development">Full Stack Development — Elite flagship</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message / Questions"
                  variant="outlined"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  slotProps={{ inputLabel: { style: { color: 'rgba(220, 231, 255, 0.65)' } } }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{
                    py: 1.8,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  Send Message
                </Button>
              </Box>

            </motion.div>
          </Box>

          {/* Right Corner: Contact cards panel */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px', height: '100%', justifyContent: 'center' }}
            >
              {/* Card 1: WhatsApp */}
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 3.5,
                  gap: 3,
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(157, 187, 255, 0.1)',
                  '&:hover': {
                    borderColor: '#25D366',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.1)',
                    '& .contact-icon-green': {
                      backgroundColor: 'rgba(37, 211, 102, 0.2)',
                      color: '#25D366',
                    },
                  },
                }}
              >
                <Box
                  className="contact-icon-green"
                  sx={{
                    backgroundColor: 'rgba(37, 211, 102, 0.1)',
                    color: 'rgba(37, 211, 102, 0.85)',
                    p: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <WhatsAppIcon sx={{ fontSize: '2.2rem' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(220,231,255,0.6)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    WhatsApp Us
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5, fontSize: '1.25rem' }}>
                    Direct Chat Admissions
                  </Typography>
                  <Typography
                    component="a"
                    href="https://wa.me/916232983739"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: '#9DBBFF',
                      fontWeight: 750,
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      '&:hover': { textDecoration: 'underline', color: '#DCE7FF' },
                    }}
                  >
                    +91 6232983739
                  </Typography>
                </Box>
              </Card>

              {/* Card 2: Email */}
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 3.5,
                  gap: 3,
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(157, 187, 255, 0.1)',
                  '&:hover': {
                    borderColor: '#FFE066',
                    boxShadow: '0 8px 24px rgba(255, 224, 102, 0.1)',
                    '& .contact-icon-gold': {
                      backgroundColor: 'rgba(255, 224, 102, 0.2)',
                      color: '#FFE066',
                    },
                  },
                }}
              >
                <Box
                  className="contact-icon-gold"
                  sx={{
                    backgroundColor: 'rgba(255, 224, 102, 0.1)',
                    color: '#FFE066',
                    p: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <EmailIcon sx={{ fontSize: '2.2rem' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(220,231,255,0.6)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Email Us
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5, fontSize: '1.25rem' }}>
                    Institutional Partnerships
                  </Typography>
                  <Typography
                    component="a"
                    href="mailto:vidhyacodegurukul12@gmail.com"
                    sx={{
                      color: '#FFE066',
                      fontWeight: 750,
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      wordBreak: 'break-all',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    vidhyacodegurukul12@gmail.com
                  </Typography>
                </Box>
              </Card>

              {/* Card 3: Visit Campus */}
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 3.5,
                  gap: 3,
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(157, 187, 255, 0.1)',
                  '&:hover': {
                    borderColor: '#9DBBFF',
                    boxShadow: '0 8px 24px rgba(157, 187, 255, 0.1)',
                    '& .contact-icon-blue': {
                      backgroundColor: 'rgba(157, 187, 255, 0.2)',
                    },
                  },
                }}
              >
                <Box
                  className="contact-icon-blue"
                  sx={{
                    backgroundColor: 'rgba(157, 187, 255, 0.1)',
                    color: '#9DBBFF',
                    p: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: '2.2rem' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(220,231,255,0.6)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Visit Campus
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5, fontSize: '1.25rem' }}>
                    Vidhya Code Gurukul Campus
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#DCE7FF', fontSize: '0.9rem', mb: 1 }}>
                    Scheme number 78, Vijay Nagar, Indore , Madhya Pradesh - 452010
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<DirectionsIcon />}
                    sx={{ color: '#FFE066', fontWeight: 700, p: 0, textTransform: 'none', '&:hover': { textDecoration: 'underline', backgroundColor: 'transparent' } }}
                  >
                    Get Directions
                  </Button>
                </Box>
              </Card>

            </motion.div>
          </Box>

        </Box>
      </Container>

      {/* Snackbar Alert Validation counselor feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: snackbarSeverity === 'success' ? '#071527' : '#2A0B12',
            color: '#FFFFFF',
            border: snackbarSeverity === 'success' ? '2.5px solid #25D366' : '2.5px solid #D32F2F',
            borderRadius: '16px',
            fontSize: '1rem',
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
