import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { motion } from 'framer-motion';

export default function CTA() {
  const theme = useTheme();

  const handleNavClick = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#020B1A',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(160,190,255,0.1), transparent)',
        },
      }}
    >
      <Container maxWidth="xl">
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          sx={{
            position: 'relative',
            background: 'linear-gradient(135deg, #071527 0%, #112036 100%)',
            border: '2px dashed rgba(157, 187, 255, 0.25)',
            borderRadius: '24px',
            p: { xs: 5, sm: 8, md: 10 },
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(157, 187, 255, 0.05)',
          }}
        >
          {/* Tech Grid Internal Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(rgba(157, 187, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 187, 255, 0.02) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Glowing Center Blob */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(157, 187, 255, 0.08) 0%, rgba(0,0,0,0) 80%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(30px)',
            }}
          />

          {/* Main CTA Core content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 900,
                color: '#FFFFFF',
                mb: 2.5,
                lineHeight: 1.15,
              }}
            >
              Start Your{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #FFE066 0%, #FFD84D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Coding Journey
              </Box>{' '}
              Today
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                lineHeight: 1.7,
                maxWidth: '650px',
                mx: 'auto',
                mb: 5,
              }}
            >
              Don’t wait for the right moment. The right moment is now. Secure your future in tech with Vidhya Code Gurukul and step into a high-paying, creative coding career.
            </Typography>

            {/* Glowing Pulsing CTA button */}
            <Box sx={{ display: 'inline-block', position: 'relative' }}>
              {/* Outer Pulse ring */}
              <Box
                component={motion.div}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '35px',
                  border: '2px solid #FFE066',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => handleNavClick('contact')}
                endIcon={<PlayArrowIcon />}
                sx={{
                  px: 4.5,
                  py: 2,
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '30px',
                  boxShadow: '0 8px 30px rgba(255, 224, 102, 0.4)',
                }}
              >
                Join Free Demo Class
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
