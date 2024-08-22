const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ["Access-Control-Allow-Origin"],
};

export default corsOptions;
