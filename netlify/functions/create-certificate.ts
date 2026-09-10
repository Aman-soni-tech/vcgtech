import { getDatabase } from '@netlify/database';

interface CreateCertificateRequest {
  student_name: string;
  course: string;
  batch?: string;
  issue_date?: string;
}

function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `VCG-${year}-${randomPart}`;
}

export default async (req: Request) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return Response.json(
      {
        success: false,
        message: 'Method Not Allowed',
      },
      { status: 405 }
    );
  }

  try {
    const body = (await req.json()) as CreateCertificateRequest;

    const studentName = body.student_name?.trim();
    const course = body.course?.trim();
    const batch = body.batch?.trim() || null;
    const issueDate = body.issue_date?.trim() || null;

    // Validate required fields
    if (!studentName || !course) {
      return Response.json(
        {
          success: false,
          message: 'Student name and course are required.',
        },
        { status: 400 }
      );
    }

    const db = getDatabase();

    let certificateId = '';
    let created = false;

    // Generate a unique Certificate ID
    for (let attempt = 0; attempt < 5; attempt++) {
      const newId = generateCertificateId();

      const existing = await db.sql`
        SELECT certificate_id
        FROM certificates
        WHERE certificate_id = ${newId}
        LIMIT 1
      `;

      if (existing.length === 0) {
        certificateId = newId;
        created = true;
        break;
      }
    }

    if (!created) {
      return Response.json(
        {
          success: false,
          message: 'Unable to generate a unique Certificate ID.',
        },
        { status: 500 }
      );
    }

    const finalIssueDate = issueDate || new Date().toISOString().slice(0, 10);

    const rows = await db.sql`
      INSERT INTO certificates (
        certificate_id,
        student_name,
        course,
        batch,
        issue_date,
        status
      )
      VALUES (
        ${certificateId},
        ${studentName},
        ${course},
        ${batch},
        ${finalIssueDate},
        'VALID'
      )
      RETURNING
        certificate_id,
        student_name,
        course,
        batch,
        issue_date,
        status,
        created_at
    `;

    return Response.json(
      {
        success: true,
        message: 'Certificate created successfully.',
        certificate: rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Certificate creation error:', error);

    return Response.json(
      {
        success: false,
        message: 'Unable to create certificate.',
      },
      { status: 500 }
    );
  }
};