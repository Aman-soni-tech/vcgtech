import { getDatabase } from '@netlify/database';
import type { Handler } from '@netlify/functions';

interface Certificate {
  certificate_id: string;
  student_name: string;
  course: string;
  batch: string | null;
  issue_date: string;
  status: string;
  created_at: string;
}

export const handler: Handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Method Not Allowed',
      }),
    };
  }

  // Get certificate ID from URL
  const certificateId = event.queryStringParameters?.id?.trim();

  if (!certificateId) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Certificate ID is required.',
      }),
    };
  }

  try {
    // Get Netlify Database connection
    const connectionString = process.env.NETLIFY_DB_URL;

    if (!connectionString) {
      console.error('NETLIFY_DB_URL is not available');

      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Database configuration error.',
        }),
      };
    }

    const db = getDatabase({
      connectionString,
    });

    // Search certificate by ID
    const rows = await db.sql<Certificate>`
      SELECT
        certificate_id,
        student_name,
        course,
        batch,
        issue_date,
        status,
        created_at
      FROM certificates
      WHERE certificate_id = ${certificateId}
      LIMIT 1
    `;

    // Certificate not found
    if (rows.length === 0) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valid: false,
          message: 'Certificate not found.',
        }),
      };
    }

    const certificate = rows[0];

    // Certificate found
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valid: certificate.status === 'VALID',
        certificate: {
          certificate_id: certificate.certificate_id,
          student_name: certificate.student_name,
          course: certificate.course,
          batch: certificate.batch,
          issue_date: certificate.issue_date,
          status: certificate.status,
          created_at: certificate.created_at,
        },
      }),
    };
  } catch (error) {
    console.error('Certificate verification error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Unable to verify certificate.',
      }),
    };
  }
};