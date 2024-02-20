const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  thumbanil: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: false,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  faculte: {
    type: String,
    required: true,
  },
  departement: {
    type: [String],
    required: false,
  },
  speciality: {
    type: [String],
    required: false,
  },
  year: {
    type: [String],
    required: false,
    validate: {
      validator: function (arr) {
        // Replace 'Year1', 'Year2', 'Year3' with your actual years
        return arr.every((year) =>
          [
            "1 licenc",
            "2 licenc",
            "3 licenc",
            "1 master",
            "2 master",
            "1 doctora",
            "2 doctora",
          ].includes(year)
        );
      },
      message: (props) => `${props.value} is not a valid year`,
    },
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const announcement = mongoose.model("post", announcementSchema);

module.exports = announcement;
