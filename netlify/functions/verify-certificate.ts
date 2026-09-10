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
    const db = getDatabase();

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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valid: certificate.status === 'VALID',
        certificate,
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