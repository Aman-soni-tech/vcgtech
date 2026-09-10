import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';

interface Certificate {
  certificate_id: string;
  student_name: string;
  course: string;
  batch: string | null;
  issue_date: string;
  status: string;
  created_at: string;
}

export default function AdminCertificate() {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!studentName.trim() || !course.trim()) {
      setError('Student Name and Course are required.');
      setCertificate(null);
      return;
    }

    setLoading(true);
    setError('');
    setCertificate(null);

    try {
      const response = await fetch(
        '/.netlify/functions/create-certificate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_name: studentName.trim(),
            course: course.trim(),
            batch: batch.trim(),
            issue_date: issueDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success || !data.certificate) {
        setError(data.message || 'Unable to create certificate.');
        return;
      }

      setCertificate(data.certificate);

      // Clear form after successful creation
      setStudentName('');
      setCourse('');
      setBatch('');
    } catch (err) {
      console.error('Certificate creation failed:', err);
      setError('Unable to create certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#020B1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          maxWidth: 700,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#020B1A',
            textAlign: 'center',
            mb: 1,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Create Certificate
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            color: '#666',
            mb: 4,
          }}
        >
          Vidhya Code Gurukul — Admin Panel
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'grid', gap: 2.5 }}>
          <TextField
            fullWidth
            label="Student Name"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Course"
            placeholder="Example: Web Development"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <TextField
            fullWidth
            label="Batch"
            placeholder="Example: 2026-A"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />

          <TextField
            fullWidth
            label="Issue Date"
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCreate}
            disabled={loading}
            sx={{
              backgroundColor: '#1769E0',
              py: 1.6,
              fontWeight: 700,
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#0D47A1',
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={22}
                  sx={{ color: 'white', mr: 1 }}
                />
                CREATING...
              </>
            ) : (
              'CREATE CERTIFICATE'
            )}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {certificate && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              <strong>Certificate Created Successfully!</strong>
            </Alert>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#020B1A',
                mb: 2,
              }}
            >
              Certificate Details
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  CERTIFICATE ID
                </Typography>
                <Typography fontWeight={800}>
                  {certificate.certificate_id}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  STUDENT NAME
                </Typography>
                <Typography fontWeight={700}>
                  {certificate.student_name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  COURSE
                </Typography>
                <Typography fontWeight={700}>
                  {certificate.course}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  BATCH
                </Typography>
                <Typography fontWeight={700}>
                  {certificate.batch || 'N/A'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  ISSUE DATE
                </Typography>
                <Typography fontWeight={700}>
                  {certificate.issue_date}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  STATUS
                </Typography>
                <Typography
                  fontWeight={800}
                  sx={{ color: '#2E7D32' }}
                >
                  {certificate.status}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}