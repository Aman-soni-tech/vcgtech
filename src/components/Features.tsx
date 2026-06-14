import React from 'react';
import { Box, Container, Typography, Grid, Stack, useTheme } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import ConstructionIcon from '@mui/icons-material/Construction';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';

const FEATURES_DATA = [
  {
    title: 'Beginner Friendly Teaching',
    description: 'We demystify programming and start from absolute ground zero — "Hello World". Non-tech backgrounds are our specialty!',
    icon: <MoodIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#9DBBFF', // Primary
    bgColor: 'rgba(157, 187, 255, 0.08)',
  },
  {
    title: 'Practical Projects',
    description: 'Throw away standard textbooks. Implement complex portfolio projects requested by recruiters to display real execution.',
    icon: <ConstructionIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#FFE066', // Accent Gold
    bgColor: 'rgba(255, 224, 102, 0.08)',
  },
  {
    title: 'Live Interactive Classes',
    description: 'Real-time lectures with two-way screen sharing, persistent digital whiteboard sessions, and prompt live chat Q&As.',
    icon: <VideoCameraFrontIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#ffb695', // Soft orange/tertiary
    bgColor: 'rgba(255, 182, 149, 0.08)',
  },
  {
    title: 'Career & Interview Guidance',
    description: 'Targeted resume sculpting, mock behavior interviews with active engineers, and direct placement opportunities in major tech hubs.',
    icon: <EmojiEventsIcon sx={{ fontSize: '2.5rem' }} />,
    color: '#FFB4AB', // Warm warning/rose
    bgColor: 'rgba(255, 180, 171, 0.08)',
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const featureItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 12,
    },
  },
};

export default function Features() {
  const theme = useTheme();

  return (
    <Box
      id="why-us"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#071527',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'radial-gradient(circle, rgba(160, 190, 255, 0.2) 0%, transparent 80%)',
        },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
              gap: 4,
            }}
          >
            {FEATURES_DATA.map((feat, index) => (
              <Box key={index} sx={{ height: '100%' }}>
                <motion.div
                  variants={featureItem}
                  whileHover={{ scale: 1.03 }}
                  style={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      px: 2,
                      py: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: '16px',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        '& .feature-icon': {
                          transform: 'scale(1.1) translateY(-4px)',
                          boxShadow: `0 0 20px ${feat.color}44`,
                        },
                      },
                    }}
                  >
                    {/* Rounded Icon Wrapper with custom glow */}
                    <Box
                      className="feature-icon"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: feat.bgColor,
                        color: feat.color,
                        mb: 3,
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {feat.icon}
                    </Box>

                    {/* Feature Title */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        mb: 1.5,
                        fontFamily: '"Montserrat", sans-serif',
                      }}
                    >
                      {feat.title}
                    </Typography>

                    {/* Feature Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        textAlign: 'center',
                        maxWidth: '260px',
                      }}
                    >
                      {feat.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
