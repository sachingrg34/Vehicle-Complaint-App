const express = require("express");
const { engine } = require("express-handlebars");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const helmet = require("helmet");
const path = require("path");
 
const app = express();
const PORT = 3000;
 

app.use(helmet());
 

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
 
app.use(express.urlencoded({ extended: true }));
 

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: false,
    helpers: {
      reviewDate: function () {
        let date = new Date();
        let count = 0;
 
        while (count < 3) {
          date.setDate(date.getDate() + 1);
 
          if (date.getDay() !== 0 && date.getDay() !== 6) {
            count++;
          }
        }
 
        return date.toDateString();
      },
    },
  })
);
 
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
 
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
 
const upload = multer({ storage });
 

app.get("/", (req, res) => {
  res.render("complaintForm");
});

app.post(
  "/submitComplaint",
  upload.single("image"),
  [
    body("fullName")
      .notEmpty()
      .withMessage("Full name is required"),
 
    body("email")
      .isEmail()
      .withMessage("Valid email required"),
 
    body("phone")
      .notEmpty()
      .withMessage("Phone number required"),
 
    body("vehicleMake")
      .notEmpty()
      .withMessage("Vehicle Make required"),
 
    body("vehicleModel")
      .notEmpty()
      .withMessage("Vehicle Model required"),
 
    body("vin")
      .isLength({ min: 17, max: 17 })
      .withMessage("VIN must be 17 characters"),
 
    body("subject")
      .notEmpty()
      .withMessage("Subject required"),
 
    body("description")
      .isLength({ min: 20 })
      .withMessage("Description must be at least 20 characters"),
  ],
 
  (req, res) => {
    const errors = validationResult(req);
 
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
 
    const complaint = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vin: req.body.vin,
      subject: req.body.subject,
      description: req.body.description,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : null,
    };
 
    res.render("complaintSuccess", {
      complaint,
    });
  }
);
 
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
