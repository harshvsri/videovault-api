const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
  // Adding the 'Access-Control-Allow-Origin' header
  exposedHeaders: ['Access-Control-Allow-Origin'],
};

module.exports = corsOptions;
