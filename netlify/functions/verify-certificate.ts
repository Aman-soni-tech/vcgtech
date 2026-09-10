import { getDatabase } from '@netlify/database';

interface Certificate {
  certificate_id: string;
  student_name: string;
  course: string;
  batch: string | null;
  issue_date: string;
  status: string;
  created_at: string;
}

export default async (req: Request) => {
  // Only allow GET
  if (req.method !== 'GET') {
    return Response.json(
      {
        message: 'Method Not Allowed',
      },
      { status: 405 }
    );
  }

  // Get certificate ID from URL
  const url = new URL(req.url);
  const certificateId = url.searchParams.get('id')?.trim();

  if (!certificateId) {
    return Response.json(
      {
        valid: false,
        message: 'Certificate ID is required.',
      },
      { status: 400 }
    );
  }

  try {
    // Netlify automatically configures the database
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

    // Certificate does not exist
    if (rows.length === 0) {
      return Response.json(
        {
          valid: false,
          message: 'Certificate not found.',
        },
        { status: 404 }
      );
    }

    const certificate = rows[0];

    return Response.json({
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
    });
  } catch (error) {
    console.error('Certificate verification error:', error);

    return Response.json(
      {
        valid: false,
        message: 'Unable to verify certificate.',
      },
      { status: 500 }
    );
  }
};