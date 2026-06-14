import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Rating, Avatar, Stack } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

const REVIEWS_DATA = [
  {
    name: 'Ankit Kumar',
    initials: 'AK',
    role: 'Software Engineer @ TCS',
    review: '"Vidhya Code Gurukul changed my life. I went from knowing nothing to landing a job at a top MNC within 6 months of the Full Stack course."',
    color: '#9DBBFF', // Primary blue
  },
  {
    name: 'Sneha Pandey',
    initials: 'SP',
    role: 'Backend Dev @ Zomato',
    review: '"The mentors here are incredible. The way they explain complex Data Structures makes it seem so easy. Highly recommended for DSA."',
    color: '#FFE066', // Accent yellow
  },
  {
    name: 'Rohan Tyagi',
    initials: 'RT',
    role: 'Front-end Lead @ Start-up',
    review: '"Practical exposure is the best part. I built 4 full-stack projects during my course which got me shortlisted for every interview I applied."',
    color: '#ffb695', // Orange / tertiary
  },
];

const staggerConfig = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 35 },
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

export default function Testimonials() {
  return (
    <Box
      id="testimonials"
      sx={{
        py: { xs: 10, md: 15 },
        position: 'relative',
        background: 'linear-gradient(135deg, #071527 0%, #020B1A 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Blur Dot */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(157, 187, 255, 0.05) 0%, rgba(2, 11, 26, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Caption Header Section */}
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
            Success Stories
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            From our humble classroom structures to global tech giants. Read what our alumni say.
          </Typography>
        </Box>

        {/* Reviews Grid Stagger container */}
        <motion.div
          variants={staggerConfig}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 4,
            }}
          >
            {REVIEWS_DATA.map((rev, index) => (
              <Box key={index} sx={{ height: '100%' }}>
                <motion.div
                  variants={fadeUpItem}
                  whileHover={{ y: -8, scale: 1.01 }}
                  style={{ height: '100%', display: 'flex' }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      p: { xs: 3, sm: 4.5 },
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(160, 190, 255, 0.12)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      boxShadow: '0 8px 32px 0 rgba(2, 11, 26, 0.3)',
                      '&:hover': {
                        borderColor: 'rgba(157, 187, 255, 0.3)',
                        boxShadow: '0 15px 35px rgba(157, 187, 255, 0.12)',
                      },
                    }}
                  >
                    {/* Quotation icon floating in card */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 24,
                        right: 24,
                        color: 'rgba(157, 187, 255, 0.06)',
                        zIndex: 0,
                      }}
                    >
                      <FormatQuoteIcon sx={{ fontSize: '5rem' }} />
                    </Box>

                    <CardContent sx={{ p: 0, zIndex: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Rating stars */}
                      <Stack direction="row" spacing={0.5} sx={{ mb: 2.5 }}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} sx={{ color: '#FFE066', fontSize: '1.25rem' }} />
                        ))}
                      </Stack>

                      {/* Review message text */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '0.98rem',
                          fontStyle: 'italic',
                          color: '#DCE7FF',
                          lineHeight: 1.7,
                          mb: 4,
                          flexGrow: 1, // pushes student profile to bottom
                        }}
                      >
                        {rev.review}
                      </Typography>
                    </CardContent>

                    {/* Student profile footer row */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2.2, alignItems: 'center', zIndex: 1 }}>
                      <Avatar
                        sx={{
                          background: `rgba(157, 187, 255, 0.12)`,
                          border: `1.5px solid ${rev.color}`,
                          color: rev.color,
                          fontFamily: '"Montserrat", sans-serif',
                          fontWeight: 800,
                          width: '48px',
                          height: '48px',
                          fontSize: '1rem',
                        }}
                      >
                        {rev.initials}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 750,
                            color: '#FFFFFF',
                            fontSize: '0.95rem',
                          }}
                        >
                          {rev.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(220, 231, 255, 0.65)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            fontFamily: '"JetBrains Mono", monospace',
                          }}
                        >
                          {rev.role}
                        </Typography>
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
