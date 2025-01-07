const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  { name: String, email: String, text: String },
  { collection: "comments" }
);
const Comments = model("Comment", userSchema);
module.exports = Comments;
