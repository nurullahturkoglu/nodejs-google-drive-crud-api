const express = require("express");

const imagesRoutes = require("./routes/imageRoutes");

const app = express();
const PORT = parseInt(process.env.PORT) || 4000;

app.use("/api/v1/images", imagesRoutes);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
