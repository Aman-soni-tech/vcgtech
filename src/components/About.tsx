import React from 'react';
import { Box, Container, Typography, Grid, Stack, Button, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const BULLETS = [
  'Dedicated practice-based learning with active labs',
  'Direct 1-on-1 interaction & doubt-clearing with industry mentors',
  'Real-world modular project development and testing',
  'Rigorous placement preparation and interview drills',
];

export default function About() {
  const theme = useTheme();

  const handleNavClick = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const aboutImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuC3L-pLaZANSKksms-CKfA2UVf3GifrXBrLvhiwyWRE-Elsa3pI5RMG-4Gr7QyGiukG5eICEphr9drgPZ_aMQa-wrw9ZzDIOScq9_087W4l2U43T3Sgw-nWzNWaH8jUMua5k7lgCCpZmm1P9Ea1qP86rG_yI5nmBc3MCGAI5c7E_o03Itdauu3ru7qEW3wZ8_mlpcyrVzU0n5gnsSHvU5fcGUxEFsvzEmyp8Un_iBIVxWEoKLl6N1wn";

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 10, md: 15 },
        backgroundColor: '#020B1A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 6, lg: 10 },
            alignItems: 'center',
          }}
        >
          {/* Left Graphic Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            {/* Diffuse golden-blue behind-glow */}
            <Box
              sx={{
                position: 'absolute',
                inset: -20,
                borderRadius: '30px',
                background: 'radial-gradient(circle, rgba(157, 187, 255, 0.12) 0%, transparent 65%)',
                filter: 'blur(15px)',
                zIndex: 0,
              }}
            />

            {/* Main Laptop/Lab Image Wrapper */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                border: '1.5px solid rgba(160, 190, 255, 0.2)',
                borderRadius: '24px',
                overflow: 'hidden',
                zIndex: 1,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              }}
            >
              <Box
                component="img"
                src={aboutImgUrl}
                alt="Vidhya Code Gurukul Lab"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                  aspectRatio: { xs: '4/3', sm: '16/10' },
                }}
              />
            </Box>

            {/* Floating Stat Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                background: 'linear-gradient(135deg, #071527 0%, rgba(2, 11, 26, 0.9) 100%)',
                border: '1.5px solid rgba(255, 224, 102, 0.35)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 15px rgba(255, 224, 102, 0.1)',
                borderRadius: '20px',
                padding: '24px',
                maxWidth: '320px',
                zIndex: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  fontWeight: 900,
                  color: '#FFE066',
                  mb: 0.5,
                }}
              >
                10+
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: '#FFFFFF',
                  mb: 0.8,
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                Expert Mentors
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                }}
              >
                Currently working as software architects, tech leads, or engineering leads in leading Fortune 500 tech companies.
              </Typography>
            </motion.div>
          </motion.div>

          {/* Right Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontWeight: 900,
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Redefining Tech Education with{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(45deg, #9DBBFF 30%, #FFE066 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gurukul Values
              </Box>
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              At Vidhya Code Gurukul, we believe in the <strong>"Learning by Doing"</strong> methodology. Our institute helps students learn coding step-by-step with practical, hands-on examples rather than boring memorization.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Founded by senior developers, we bridge the industry gap directly. We groom raw beginners and elevate them into high-performing builders who understand debugging, design patterns, and systemic optimization.
            </Typography>

            {/* Bullet Points */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2, mb: 5 }}>
              {BULLETS.map((bullet, i) => (
                <Box key={i} sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
                  <CheckCircleIcon sx={{ color: '#FFE066', mt: '2px', fontSize: '1.3rem' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#DCE7FF',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                    }}
                  >
                    {bullet}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA link */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleNavClick('contact')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: '#FFE066',
                borderColor: 'rgba(255, 224, 102, 0.4)',
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                '&:hover': {
                  borderColor: '#FFE066',
                  backgroundColor: 'rgba(255, 224, 102, 0.08)',
                },
              }}
            >
              Schedule Campus Visit
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
