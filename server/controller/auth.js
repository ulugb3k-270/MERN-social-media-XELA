import Auth from "../schema/authSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const working = (req, res) => {
  try {
    res.status(200).send("AUTH SERVER IS WORKING");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findEmail = await Auth.findOne({ email });
    if (!findEmail) return res.status(404).json({ message: "User Not Found" });

    const matchPassword = await bcrypt.compare(password, findEmail.password);

    if (!matchPassword)
      return res.status(400).json({
        message:
          "Email or Password incorrect. Check your informations and try again",
      });

    // IF USER IS EXIST THEN GIVE JWT TOKEN
    const token = jwt.sign(
      { email: findEmail.email, id: findEmail._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: findEmail, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    location,
    password,
    confirmPassword,
    selectedFile,
  } = req.body;
  try {
    const isExisted = await Auth.findOne({ email });

    if (isExisted)
      return res.status(400).json({ message: "User has already registrated" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      userName,
      email,
      location,
      password: hashedPassword,
      image: selectedFile,
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });

    
    res.status(200).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
