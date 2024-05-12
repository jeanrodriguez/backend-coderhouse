const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    if (fs.existsSync(this.path)) {
      const usersFile = await fs.promises.readFile(this.path, "utf-8");
      const usersJSON = JSON.parse(usersFile);
      return usersJSON;
    }

    return [];
  }
  async createUser(user) {
    const usersInFile = await this.getUsers();
    // clave secreta
    user.salt = crypto.randomBytes(128).toString();
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");
    usersInFile.push(user);
    await fs.promises.writeFile(this.path, JSON.stringify(usersInFile));
  }

  async validateUser(userName, password) {
    const usersInFile = await this.getUsers();
    const user = usersInFile.find((user) => user.username === userName);

    if (!user) {
      return "user or pass incorrecto";
    }
    console.log("==validateUser==", user);

    const newCrypto = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    if (user.password === newCrypto) return "logueado";
    return "user or pass incorrecto";
  }
}

const user = {
  firstName: "jean",
  lastName: "rod",
  username: "jeanrod",
  password: "123",
};

const manager = new UserManager("./users.json");

const test = async () => {
  // const users = await manager.getUsers();
  // console.log("==users==", users);

  // await manager.createUser(user);
  const validateUser = await manager.validateUser("jeanrod", "123");
  console.log("==validae==", validateUser);
  //   await manager.createUser(user);
};
test();
