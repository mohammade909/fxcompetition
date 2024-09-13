const experss = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const upload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errorMiddleware');

// Routes starts here
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const competitionRoutes = require("./routes/competitionRoutes");
const accountRoutes = require("./routes/accountRoutes");
const walletRoutes = require("./routes/walletRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const achieverRoutes = require("./routes/achieverRoutes");
const permissionRoutes = require('./routes/permissionRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const orderRoutes = require('./routes/orderRoutes')
const planRoutes = require('./routes/planRoutes')
// Middleware starts here
dotenv.config();
const app = experss();
app.use(experss.json());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(cors({origin:"*"}));




// API Endpoints starts at http://localhost:8000

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/competitions", competitionRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/achievers", achieverRoutes);
app.use("/api/v1/permissions", permissionRoutes);
app.use("/api/v1/plans", planRoutes);


// Middle wares
app.use(errorMiddleware);

module.exports = app;
