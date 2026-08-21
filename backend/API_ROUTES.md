Auth
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/me                [protect]

Profiles
  POST   /api/profiles                [protect, JOB_SEEKER]
  GET    /api/profiles/me             [protect, JOB_SEEKER]
  PUT    /api/profiles                [protect, JOB_SEEKER]
  POST   /api/profiles/resume         [protect, JOB_SEEKER] multipart
  GET    /api/profiles/candidate/:userId  [protect, RECRUITER]

Companies
  POST   /api/companies               [protect, RECRUITER]
  GET    /api/companies
  GET    /api/companies/:id
  PUT    /api/companies/:id           [protect, RECRUITER, owner]
  DELETE /api/companies/:id           [protect, RECRUITER, owner]

Jobs
  POST   /api/jobs                    [protect, RECRUITER]
  GET    /api/jobs                    ?keyword&location&jobType&minSalary&maxSalary&company&limit&offset
  GET    /api/jobs/:id
  GET    /api/jobs/recruiter/mine     [protect, RECRUITER]
  PUT    /api/jobs/:id                [protect, RECRUITER, owner]
  DELETE /api/jobs/:id                [protect, RECRUITER, owner]

Applications
  POST   /api/applications/jobs/:jobId          [protect, JOB_SEEKER]
  GET    /api/applications/my                   [protect, JOB_SEEKER]
  GET    /api/applications/job/:jobId           [protect, RECRUITER, owner]
  PATCH  /api/applications/:applicationId/status [protect, RECRUITER, owner]

Admin
  GET    /api/admin/stats             [protect, ADMIN]
  GET    /api/admin/users             [protect, ADMIN]  ?role&keyword
  PATCH  /api/admin/users/:id/ban     [protect, ADMIN]
  DELETE /api/admin/users/:id         [protect, ADMIN]
  GET    /api/admin/companies         [protect, ADMIN]
  DELETE /api/admin/companies/:id     [protect, ADMIN]
  GET    /api/admin/jobs              [protect, ADMIN]
  DELETE /api/admin/jobs/:id          [protect, ADMIN]
  GET    /api/admin/applications      [protect, ADMIN]

Static
  GET    /uploads/resumes/:filename   (serves uploaded resume files)