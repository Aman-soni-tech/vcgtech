import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';

export default function CertificateVerify() {
  const [certificateId, setCertificateId] = useState('');
  const [searched, setSearched] = useState(false);

  const handleVerify = () => {
    if (!certificateId.trim()) return;
    setSearched(true);
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
          }}
        >
          Certificate Verification
        </Typography>

        <Typography
          sx={{
            color: '#555',
            mb: 4,
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
          }}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleVerify}
          sx={{
            backgroundColor: '#1769E0',
            py: 1.5,
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#0D47A1',
            },
          }}
        >
          VERIFY CERTIFICATE
        </Button>

        {searched && (
          <Alert
            severity="info"
            sx={{
              mt: 4,
              textAlign: 'left',
            }}
          >
            Verification database will be connected in the next step.
            <br />
            Certificate ID: <strong>{certificateId}</strong>
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
