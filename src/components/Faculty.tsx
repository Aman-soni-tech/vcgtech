import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Badge, Stack, useTheme } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion } from 'framer-motion';
import amanImg from '../assets/aman.png';

const FACULTY_DATA = [
  {
    name: 'Aman Soni',
    role: 'Full Stack Java developer and tutor',
    experience: '3+ Years Teaching Experience',
    specialty: 'Turning beginners into confident programmers through practical and easy-to-understand teaching.',
    image: amanImg,
  },

  {
    name: 'Shubham Soni',
    role: 'Full Stack Java Developer',
    experience: '4+ Years Industry Experience',
    specialty: 'Master of Java core systems, ,Expert in industry , mastary in java backend',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC5C5-0PVBV2_5wYNThHsGY6PmNFoLvWyWSiaDiVe_bVLdzcsvREcTvLDIZm3VP7Xzb8OS0aQkANHKsOZqOpfcvLMkhit270hCISWK1yHnyVhqY56g0Zz2iubbnbFlVX6g27bwOYomViVtUx75FA9T8pPiRP4wP3eVe_l8FJvOWr5Yk1xWZJthDDEIqV5mMV2PtNpvRSN2KIUF92Lzx1KeBSg2EgIDBvRymReCkInN7SKFzFsHt7Qp',
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 90,
      damping: 14,
    },
  },
};

export default function Faculty() {
  const theme = useTheme();

  return (
    <Box
      id="faculty"
      sx={{
        py: { xs: 10, md: 15 },
        backgroundColor: '#071527',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'radial-gradient(circle, rgba(160, 190, 255, 0.15) 0%, transparent 80%)',
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Caption Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE066 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Meet Your Mentors
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: '650px',
              mx: 'auto',
            }}
          >
            Learn directly from active industry practitioners who have coded, designed, and deployed production software used by millions.
          </Typography>
        </Box>

        {/* 3-card layout */}
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
                md: '1fr 1fr 1fr',
              },
              gap: 4,
            }}
          >
            {FACULTY_DATA.map((fac, index) => (
              <Box key={index} sx={{ height: '100%' }}>
                <motion.div
                  variants={cardItem}
                  whileHover={{ y: -8 }}
                  style={{ height: '100%', display: 'flex' }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1.5px solid rgba(160, 190, 255, 0.12)',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        borderColor: '#9DBBFF',
                        boxShadow: '0 15px 35px rgba(157, 187, 255, 0.15)',
                        '& .faculty-photo-frame img': {
                          transform: 'scale(1.06)',
                        },
                      },
                    }}
                  >
                    {/* Upper Picture container */}
                    <Box
                      className="faculty-photo-frame"
                      sx={{
                        height: '280px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderBottom: '1px solid rgba(160, 190, 255, 0.15)',
                      }}
                    >
                      <Box
                        component="img"
                        src={fac.image}
                        alt={`${fac.name} Profile`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)', // slight background for letterboxing
                        }}
                      />
                      {/* Interactive Gold/Blue label tag */}
                      <Badge
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 0.5,
                            alignItems: 'center',
                            backgroundColor: '#020B1A',
                            border: '1px solid #FFE066',
                            color: '#FFE066',
                            py: 0.5,
                            px: 1.5,
                            borderRadius: '20px',
                          }}
                        >
                          <WorkspacePremiumIcon sx={{ fontSize: '0.9rem' }} />
                          <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Mentor
                          </Typography>
                        </Box>
                      </Badge>
                    </Box>

                    {/* Lower Description Content */}
                    <CardContent sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          mb: 0.5,
                        }}
                      >
                        {fac.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#9DBBFF',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          fontFamily: '"Montserrat", sans-serif',
                          mb: 2,
                        }}
                      >
                        {fac.role}
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', color: 'rgba(220, 231, 255, 0.7)', mb: 2 }}>
                        <VerifiedUserIcon sx={{ color: '#FFE066', fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {fac.experience}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '0.88rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {fac.specialty}
                      </Typography>
                    </CardContent>
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
