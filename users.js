import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("Aa12345$", 10),
    isAdmin: true,
  },
  {
    name: "Tauseef Iqbal",
    email: "tauseef.iqbal@live.com",
    password: bcrypt.hashSync("Aa12345$", 10),
    isAdmin: false,
  },
];

export default users;
