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

export default function CertificateVerify() {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    const id = certificateId.trim();

    if (!id) {
      setError('Please enter a Certificate ID.');
      setCertificate(null);
      setSearched(true);
      return;
    }

    setLoading(true);
    setSearched(false);
    setCertificate(null);
    setError('');

    try {
      const response = await fetch(
        `/.netlify/functions/verify-certificate?id=${encodeURIComponent(id)}`
      );

      const data = await response.json();

      if (!response.ok || !data.valid || !data.certificate) {
        setError(data.message || 'Certificate not found.');
        setSearched(true);
        return;
      }

      setCertificate(data.certificate);
      setSearched(true);
    } catch (err) {
      console.error('Verification request failed:', err);
      setError('Unable to verify certificate. Please try again.');
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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
          maxWidth: 650,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#020B1A',
            mb: 1,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Certificate Verification
        </Typography>

        <Typography
          sx={{
            color: '#555',
            mb: 4,
            fontSize: '1.05rem',
          }}
        >
          Vidhya Code Gurukul
        </Typography>

        <Typography
          sx={{
            fontWeight: 600,
            mb: 1,
            textAlign: 'left',
          }}
        >
          Enter Certificate ID
        </Typography>

        <TextField
          fullWidth
          placeholder="Example: VCG-2026-0001"
          value={certificateId}
          onChange={(e) => {
            setCertificateId(e.target.value);
            setSearched(false);
            setCertificate(null);
            setError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleVerify();
            }
          }}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleVerify}
          disabled={loading}
          sx={{
            backgroundColor: '#1769E0',
            py: 1.5,
            fontWeight: 700,
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
              VERIFYING...
            </>
          ) : (
            'VERIFY CERTIFICATE'
          )}
        </Button>

        {searched && error && (
          <Alert
            severity="error"
            sx={{
              mt: 4,
              textAlign: 'left',
            }}
          >
            <strong>Certificate Not Found</strong>
            <br />
            {error}
          </Alert>
        )}

        {certificate && (
          <Box sx={{ mt: 4, textAlign: 'left' }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              <strong>Certificate Verified Successfully</strong>
              <br />
              This certificate is authentic and currently valid.
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
                  {formatDate(certificate.issue_date)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  CERTIFICATE ID
                </Typography>
                <Typography
                  fontWeight={700}
                  sx={{ wordBreak: 'break-word' }}
                >
                  {certificate.certificate_id}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  STATUS
                </Typography>
                <Typography
                  fontWeight={800}
                  sx={{
                    color:
                      certificate.status === 'VALID'
                        ? '#2E7D32'
                        : '#C62828',
                  }}
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