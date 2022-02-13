if (process.env.NODE_ENV !== "production") require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const ExpressError = require("./ulits/ExpressError");

const campgrounds = require("./routers/campgrounds");
const reviews = require("./routers/reviews");
const users = require("./routers/users");

const User = require("./models/user");

const mongoAtlasURL =
	process.env.MongoDB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose
	.connect(mongoAtlasURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Database got Connected (:)");
	})
	.catch((error) => {
		console.log("Oh No ERROR ::(");
		console.log(error);
	});

// mongoose.connect("mongodb://localhost:27017/yelp-camp", {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

const secret = process.env.SECRET || "notagoodsecret";

const sessionConfig = {
	name: "session",
	secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));
app.use(flash());

app.use(mongoSanitize());
// app.use(helmet());

const scriptSrcUrls = [
	"https://cdn.jsdelivr.net",
	"https://stackpath.bootstrapcdn.com",
	"https://api.tiles.mapbox.com",
	"https://api.mapbox.com",
	"https://kit.fontawesome.com",
	"https://cdnjs.cloudflare.com",
	"https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
	"https://fonts.googleapis.com",
	"https://fonts.gstatic.com/s",
	"https://www.w3schools.com",
	"https://cdn.jsdelivr.net",
	"https://kit-free.fontawesome.com",
	"https://stackpath.bootstrapcdn.com",
	"https://api.mapbox.com",
	"https://api.tiles.mapbox.com",
	"https://fonts.googleapis.com",
	"https://use.fontawesome.com",
];
const connectSrcUrls = [
	"https://api.mapbox.com",
	"https://*.tiles.mapbox.com",
	"https://events.mapbox.com",
];
const fontSrcUrls = [];
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [],
			connectSrc: ["'self'", ...connectSrcUrls],
			scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
			styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
			workerSrc: ["'self'", "blob:"],
			childSrc: ["blob:"],
			objectSrc: [],
			imgSrc: [
				"'self'",
				"blob:",
				"data:",
				"https://res.cloudinary.com/creasedmeteor/",
				"https://images.unsplash.com",
			],
			fontSrc: ["'self'", ...fontSrcUrls],
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.del = req.flash("del");
	next();
});

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);
app.use("/", users);

app.engine("ejs", ejsMate);

app.all("*", (req, res, next) => {
	next(new ExpressError(404, "Page Not Found :("));
});

app.use((err, req, res, next) => {
	const { statusCode = 500, message = "Something went wrong" } = err;
	res.status(statusCode).render("./campground/error.ejs", { err });
});
// process.env.PORT ||
const port = 3000;

app.listen(port, () => {
	console.log("Server got started !!");
});
