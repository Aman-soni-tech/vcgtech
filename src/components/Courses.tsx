import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Stack, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LanguageIcon from '@mui/icons-material/Language';
import LayersIcon from '@mui/icons-material/Layers';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { motion } from 'framer-motion';

const COURSES_DATA = [
  {
    title: 'C Programming',
    duration: '3 Months',
    icon: <CodeIcon sx={{ fontSize: '2.2rem' }} />,
    description: 'Master the foundation of software engineering, memory management, and structured, logical thinking.',
    isFlagship: false,
  },
  {
    title: 'C++ with DSA',
    duration: '4 Months',
    icon: <TerminalIcon sx={{ fontSize: '2.2rem' }} />,
    description: 'Advanced algorithms, competitive programming concepts, and complex structures optimized for top product giants.',
    isFlagship: false,
  },
  {
    title: 'Java Core & Advanced',
    duration: '5 Months',
    icon: <CoffeeIcon sx={{ fontSize: '2.2rem' }} />,
    description: 'Build secure, highly scalable enterprise-level applications with Java, multi-threading, and Spring Framework.',
    isFlagship: false,
  },
  {
    title: 'Python for AI/ML',
    duration: '3 Months',
    icon: <PsychologyIcon sx={{ fontSize: '2.2rem' }} />,
    description: 'The most versatile language for automation, rich data science libraries, deep learning, and AI model deployments.',
    isFlagship: false,
  },
  {
    title: 'Web Development',
    duration: '4 Months',
    icon: <LanguageIcon sx={{ fontSize: '2.2rem' }} />,
    description: 'Craft beautiful high-contrast user interfaces and fluid web experiences using modern HTML5, CSS3, and JavaScript.',
    isFlagship: false,
  },
  {
    title: 'Full Stack Development',
    duration: '6 Months',
    icon: <LayersIcon sx={{ fontSize: '2.2rem' }} />,
    description: 'Our elite flagship career program covering React, Node.js, Express, and databases for full-scale engineering roles.',
    isFlagship: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

interface CoursesProps {
  onEnrollClick?: () => void;
}

export default function Courses({ onEnrollClick }: CoursesProps) {
  const theme = useTheme();

  const handleEnrollAction = () => {
    if (onEnrollClick) {
      onEnrollClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      id="courses"
      sx={{
        py: { xs: 10, md: 15 },
        background: 'linear-gradient(135deg, #020B1A 0%, #071527 50%, #020B1A 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(157, 187, 255, 0.15), transparent)',
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Header Title Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #9DBBFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Specialized Courses
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.95rem', md: '1.15rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Industry-vetted curriculum designed to take you from a complete novice to a professional, high-performing software engineer.
          </Typography>
        </Box>

        {/* Staggered Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
                lg: '1fr 1fr 1fr',
              },
              gap: 4,
            }}
          >
            {COURSES_DATA.map((course, index) => (
              <Box key={index} sx={{ height: '100%', display: 'flex' }}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  style={{ width: '100%', display: 'flex' }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                      p: { xs: 2.5, sm: 3.5 },
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '20px',
                      backgroundColor: course.isFlagship ? 'rgba(157, 187, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      border: course.isFlagship
                        ? '1.5px solid rgba(157, 187, 255, 0.35)'
                        : '1px solid rgba(160, 190, 255, 0.12)',
                      boxShadow: course.isFlagship
                        ? '0 10px 30px rgba(157, 187, 255, 0.1)'
                        : '0 8px 32px rgba(2, 11, 26, 0.4)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: course.isFlagship
                          ? 'linear-gradient(90deg, #9DBBFF, #FFE066)'
                          : 'transparent',
                      },
                      '&:hover': {
                        borderColor: '#9DBBFF',
                        boxShadow: '0 15px 35px rgba(157, 187, 255, 0.15)',
                        '& .course-icon-bg': {
                          transform: 'scale(1.1) rotate(5deg)',
                          background: 'rgba(157, 187, 255, 0.2)',
                          color: '#FFE066',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      {/* Icon & Badge Row */}
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box
                          className="course-icon-bg"
                          sx={{
                            background: course.isFlagship ? 'rgba(255, 224, 102, 0.15)' : 'rgba(157, 187, 255, 0.1)',
                            color: course.isFlagship ? '#FFE066' : '#9DBBFF',
                            p: 2,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {course.icon}
                        </Box>
                        {course.isFlagship && (
                          <Typography
                            variant="caption"
                            sx={{
                              background: 'linear-gradient(135deg, #FFE066 0%, #FFD84D 100%)',
                              color: '#020B1A',
                              fontWeight: 800,
                              px: 2,
                              py: 0.8,
                              borderRadius: '20px',
                              letterSpacing: '0.05em',
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              boxShadow: '0 0 10px rgba(255, 224, 102, 0.3)',
                            }}
                          >
                            Best Seller / Flagship
                          </Typography>
                        )}
                      </Box>

                      {/* Course Title */}
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.4rem',
                          fontWeight: 750,
                          color: '#FFFFFF',
                          mb: 1.5,
                        }}
                      >
                        {course.title}
                      </Typography>

                      {/* Course Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          mb: 3,
                          minHeight: '75px', // Uniform descriptive heights
                        }}
                      >
                        {course.description}
                      </Typography>
                    </CardContent>

                    {/* Lower Footer Details Actions */}
                    <Box sx={{ borderTop: '1px solid rgba(157,187,255,0.1)', pt: 2, mt: 'auto' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, color: '#FFE066' }}>
                          <ScheduleIcon sx={{ fontSize: '1.05rem' }} />
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                            {course.duration}
                          </Typography>
                        </Box>

                        {course.isFlagship ? (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleEnrollAction}
                            sx={{
                              borderRadius: '10px',
                              px: 2.5,
                              py: 1,
                              fontSize: '0.8rem',
                              fontWeight: 700,
                            }}
                          >
                            Enroll Now
                          </Button>
                        ) : (
                          <Button
                            variant="text"
                            onClick={handleEnrollAction}
                            sx={{
                              color: '#9DBBFF',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              '&:hover': {
                                color: '#FFFFFF',
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            View Details / Register
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
