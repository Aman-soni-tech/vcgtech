import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Stack, Chip, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { motion } from 'framer-motion';

const TYPING_LINES = [
  'class GurukulStudent {',
  '  constructor() {',
  '    this.name = "You";',
  '    this.skills = ["HTML", "C++", "DSA", "JS"];',
  '    this.resolved = false;',
  '  }',
  '  codeEveryday() {',
  '    this.skills.push("FullStack");',
  '    this.resolved = true;',
  '    return "Ready for Google / Microsoft!";',
  '  }',
  '}'
];

export default function Hero() {
  const theme = useTheme();
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Typewriter effect logic
  useEffect(() => {
    if (currentLineIndex < TYPING_LINES.length) {
      const line = TYPING_LINES[currentLineIndex];
      if (currentCharIndex < line.length) {
        const timeout = setTimeout(() => {
          setTypedCode((prev) => {
            const next = [...prev];
            if (!next[currentLineIndex]) {
              next[currentLineIndex] = '';
            }
            next[currentLineIndex] += line[currentCharIndex];
            return next;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else {
      // Loop it after a small pause
      const timeout = setTimeout(() => {
        setTypedCode([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  const handleNavClick = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const codeImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBkPl341Ohq--q4ibuWTJQeRzUCOCBUc50Wv3PmbtYheuSytKkgO5t1gTT7DniDFs47UWbl9YOrkBVT5f1fm6ZCkSjhfqy7O3BXCCQ32s-WdmKvF5xu7hEDW01rYCpe8m2tDaZFmicA9XZwacXGQ_e76zXW784TJGHA_gTWEfwG-JaCP7_V17J4x9DLPOU7NIr8-ZWcNvXldeTYh9QfdA9jHicU_lC_2OTzOGThvTcplUq3ChZVYWQC";

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: '110px', md: '120px' },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
        background: 'radial-gradient(circle at 10% 20%, #071527 0%, #020B1A 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(157, 187, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157, 187, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Background Glowing Blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: { xs: '250px', md: '450px' },
          height: { xs: '250px', md: '450px' },
          background: 'radial-gradient(circle, rgba(157, 187, 255, 0.12) 0%, rgba(104, 143, 255, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '10%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 224, 102, 0.07) 0%, rgba(255, 216, 77, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.3fr 1fr' },
            gap: { xs: 6, lg: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left Text */}
          <Box>
            <Stack spacing={3}>
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Chip
                  icon={<SchoolIcon sx={{ color: '#FFE066 !important', fontSize: '1.1rem' }} />}
                  label="#1 Coding Institute for Beginners"
                  sx={{
                    background: 'rgba(255, 224, 102, 0.12)',
                    borderColor: 'rgba(255, 224, 102, 0.25)',
                    borderWidth: '1.5px',
                    color: '#FFE066',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 600,
                    px: 1,
                    py: 2.2,
                    borderRadius: '30px',
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    lineHeight: { xs: 1.15, md: 1.1 },
                    fontWeight: 900,
                    mb: 2,
                  }}
                >
                  Learn Coding From <br />
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(90deg, #9DBBFF 0%, #DCE7FF 50%, #FFE066 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Basic to Advanced
                  </Box>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    lineHeight: 1.7,
                    maxWidth: '650px',
                  }}
                >
                  Join Vidhya Code Gurukul and start your journey in Web Development, C, C++, Java, Python and Full Stack Development. Master the skills that top tech companies demand.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ pt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavClick('courses')}
                    endIcon={<KeyboardArrowRightIcon />}
                    sx={{
                      px: 4.5,
                      py: 1.8,
                      fontSize: '1rem',
                      borderRadius: '16px',
                    }}
                  >
                    Explore Courses
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleNavClick('contact')}
                    sx={{
                      px: 4.5,
                      py: 1.8,
                      fontSize: '1rem',
                      borderRadius: '16px',
                      color: '#FFFFFF',
                      borderColor: 'rgba(157, 187, 255, 0.3)',
                    }}
                  >
                    Book Free Demo Class
                  </Button>
                </Stack>
              </motion.div>
            </Stack>
          </Box>

          {/* Right Visual Image & Interactive Terminal */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
              }}
            >
              {/* Outer decorative glow shadow boundary */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: -12,
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(157, 187, 255, 0.25) 0%, rgba(255, 224, 102, 0.15) 100%)',
                  filter: 'blur(20px)',
                  zIndex: 0,
                }}
              />

              {/* Main Graphic Frame */}
              <Box
                sx={{
                  position: 'relative',
                  backgroundColor: '#071527',
                  border: '1.5px solid rgba(160, 190, 255, 0.25)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  zIndex: 1,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                }}
              >
                <Box
                  component="img"
                  src={codeImgUrl}
                  alt="Student Coding Illustration"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    opacity: 0.95,
                  }}
                />
              </Box>

              {/* Float-badge: #1 Academy */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  background: 'linear-gradient(135deg, #071527 0%, #0B1E36 100%)',
                  border: '1.5px solid rgba(255, 224, 102, 0.4)',
                  boxShadow: '0px 8px 24px rgba(255, 224, 102, 0.2)',
                  borderRadius: '16px',
                  p: 2,
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    background: 'rgba(255, 224, 102, 0.12)',
                    color: '#FFE066',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CodeIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#FFE066', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Code the Future
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#FFFFFF', fontSize: '0.65rem' }}>
                    Step-by-Step Mentorship
                  </Typography>
                </Box>
              </Box>

              {/* Live Terminal Typing Card overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: { xs: '10px', sm: '-20px' },
                  right: { xs: '10px', sm: '40px' },
                  background: 'rgba(2, 11, 26, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(157, 187, 255, 0.20)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  zIndex: 3,
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {/* Terminal Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.06)', px: 2, py: 1, borderBottom: '1px solid rgba(157,187,255,0.1)' }}>
                  <Stack direction="row" spacing={1}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#27C93F' }} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: 'rgba(157, 187, 255, 0.4)', fontSize: '0.7rem', fontWeight: '500' }}>
                    gurukul_compiler.js
                  </Typography>
                </Box>

                {/* Terminal Lines Canvas */}
                <Box sx={{ p: 2, minHeight: '144px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {typedCode.map((line, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.75rem',
                        color: index === 0 || index === TYPING_LINES.length - 1 ? '#9DBBFF' : '#DCE7FF',
                        whiteSpace: 'pre',
                      }}
                    >
                      {line}
                    </Typography>
                  ))}
                  <Box
                    component="span"
                    className="blinking-cursor"
                    sx={{
                      display: 'inline-block',
                      width: '6px',
                      height: '13px',
                      backgroundColor: '#FFE066',
                      opacity: [0, 1],
                      animation: 'blink 1s step-end infinite',
                      '@keyframes blink': {
                        'from, to': { backgroundColor: 'transparent' },
                        '50%': { backgroundColor: '#FFE066' },
                      },
                    }}
                  />
                </Box>
              </Box>

            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
