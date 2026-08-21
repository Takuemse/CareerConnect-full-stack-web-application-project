require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const prisma = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

const stripTrailingSlash = (url) => (url ? url.replace(/\/+$/, "") : url);

const allowedOrigins = [
  "http://localhost:5173",
  "https://career-connect-full-stack-web-appli.vercel.app",
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .map(stripTrailingSlash);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(stripTrailingSlash(origin))) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "CareerConnect API is running" });
});

app.use("/api/auth", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profiles", profileRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`CareerConnect API is running on port ${PORT}`);
    console.log("Database connected via Prisma");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = app;