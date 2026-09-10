CREATE TABLE certificates (
  certificate_id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  course TEXT NOT NULL,
  batch TEXT,
  issue_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'VALID',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX certificates_student_name_idx
  ON certificates (student_name);

CREATE INDEX certificates_status_idx
  ON certificates (status);
