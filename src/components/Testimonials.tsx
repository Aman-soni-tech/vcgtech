import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Rating, Avatar, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Snackbar, Alert, AlertColor } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import CreateIcon from '@mui/icons-material/Create';
import { motion } from 'framer-motion';

const AVATAR_COLORS = ['#9DBBFF', '#FFE066', '#ffb695', '#a8ff9e', '#e29eff'];

const getInitials = (name: string) => {
  if (!name) return 'S';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getRandomColor = (name: string) => {
  if (!name) return AVATAR_COLORS[0];
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

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
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/.netlify/functions/get-reviews');
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();
        
        if (data && data.status === 'success' && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);
  
  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState<number | null>(5);
  const [reviewMessage, setReviewMessage] = useState('');

  // Feedback State
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    if (!isSubmitting) setOpenModal(false);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: boolean } = {};
    if (!name.trim()) errors.name = true;
    if (!reviewMessage.trim()) errors.reviewMessage = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch('/.netlify/functions/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'review',
          name,
          role,
          rating,
          message: reviewMessage,
          date: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      setSnackbarSeverity('success');
      setSnackbarMessage('Review submitted successfully! It will appear once approved.');
      setOpenSnackbar(true);
      
      // Reset & Close
      setName('');
      setRole('');
      setRating(5);
      setReviewMessage('');
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Something went wrong. Please try again later.');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
            Student Reviews
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
            }}
          >
            Read what our alumni say about their journey. Share your own experience with us!
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<CreateIcon />}
            sx={{
              borderRadius: '24px',
              fontWeight: 700,
              px: 4,
              py: 1.2,
              boxShadow: '0 8px 20px rgba(157, 187, 255, 0.2)',
            }}
          >
            Write a Review
          </Button>
        </Box>

        {/* Reviews Grid Stagger container */}
        <motion.div
          variants={staggerConfig}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
              <CircularProgress sx={{ color: '#9DBBFF' }} />
            </Box>
          ) : reviews.length === 0 ? (
            <Box sx={{ textAlign: 'center', my: 10 }}>
              <Typography variant="h6" color="text.secondary">
                No reviews yet. Be the first to leave one!
              </Typography>
            </Box>
          ) : (
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
            {reviews.map((rev, index) => {
              const color = getRandomColor(rev.name || '');
              const initials = getInitials(rev.name || '');
              const ratingVal = parseInt(rev.rating) || 5;
              
              return (
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
                        {[...Array(ratingVal)].map((_, i) => (
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
                        {rev.review || rev.message}
                      </Typography>
                    </CardContent>

                    {/* Student profile footer row */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2.2, alignItems: 'center', zIndex: 1 }}>
                      <Avatar
                        sx={{
                          background: `rgba(157, 187, 255, 0.12)`,
                          border: `1.5px solid ${color}`,
                          color: color,
                          fontFamily: '"Montserrat", sans-serif',
                          fontWeight: 800,
                          width: '48px',
                          height: '48px',
                          fontSize: '1rem',
                        }}
                      >
                        {initials}
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
            )})}
          </Box>
          )}
        </motion.div>
      </Container>

      {/* Review Submission Modal */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: '#071527',
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)',
            border: '1px solid rgba(157, 187, 255, 0.15)',
            borderRadius: '16px',
            color: '#FFFFFF',
            m: 2 // add a bit of margin so it doesn't touch the edges
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#FFE066' }}>
          Write a Review
        </DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent dividers sx={{ borderColor: 'rgba(157, 187, 255, 0.1)' }}>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Your Name *"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={formErrors.name}
                helperText={formErrors.name ? "Name is required" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#FFFFFF', '& fieldset': { borderColor: 'rgba(157, 187, 255, 0.3)' } },
                  '& .MuiInputLabel-root': { color: 'rgba(220, 231, 255, 0.65)' }
                }}
              />
              <TextField
                fullWidth
                label="Your Role/Job Title (Optional)"
                variant="outlined"
                placeholder="e.g. Software Engineer @ TCS"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#FFFFFF', '& fieldset': { borderColor: 'rgba(157, 187, 255, 0.3)' } },
                  '& .MuiInputLabel-root': { color: 'rgba(220, 231, 255, 0.65)' }
                }}
              />
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(220, 231, 255, 0.65)', mb: 1 }}>Rating *</Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  sx={{ color: '#FFE066' }}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Review *"
                variant="outlined"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                error={formErrors.reviewMessage}
                helperText={formErrors.reviewMessage ? "Review is required" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#FFFFFF', '& fieldset': { borderColor: 'rgba(157, 187, 255, 0.3)' } },
                  '& .MuiInputLabel-root': { color: 'rgba(220, 231, 255, 0.65)' }
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={handleCloseModal} 
              disabled={isSubmitting}
              sx={{ color: 'rgba(220, 231, 255, 0.7)' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{ borderRadius: '8px', fontWeight: 700 }}
            >
              Submit Review
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar Alert */}
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
