import fs from "fs";

const db = {
  add(requestedItem) {
    try {
      const rowData = fs.readFileSync("./database.json", "utf-8");
      if (!rowData) throw new Error("fail the add user");
      const data = JSON.parse(rowData);
      if (!requestedItem) throw new Error("requested item is undefined");
      data.unshift(requestedItem);

      fs.writeFile("./database.json", JSON.stringify(data, null, 2), (err) => {
        if (err) throw new Error("error writing file to the database");
      });
    } catch (error) {
      return error.message;
    }
  },

  clearOne(requestedItem) {
    try {
      const rowData = fs.readFileSync("./database.json", "utf-8");
      if (!rowData) throw new Error("error fetching data");
      const data = JSON.parse(rowData);
      const items = data.filter((user) => user.username !== requestedItem);
      fs.writeFile("./database.json", JSON.stringify(items, null, 2), (err) => {
        if (err) throw new Error("error updating data");
      });
    } catch (error) {
      return error.message;
    }
  },

  findOne(requestedItem) {
    const rowData = fs.readFileSync("./database.json", "utf-8");
    const data = JSON.parse(rowData);
    const isItemExist = data.find((arg) => arg.username === requestedItem);
    return isItemExist || null;
  },

  clearAll() {
    const timeout = setTimeout(() => {
      fs.readFile("./database.json", "utf8", (err, data) => {
        if (err) return console.log(err.message);
        const info = JSON.parse(data);
        info.splice(0, info.length);

        fs.writeFile(
          "./database.json",
          JSON.stringify(info, null, 2),
          (err) => {
            if (err) return console.log("err");
          }
        );
      });
    }, 1000);

    fs.readFile("./database.json", "utf-8", (err, data) => {
      if (err) return console.log(err.message);
      const info = JSON.parse(data);
      if (info.length === 0) return clearTimeout(timeout);
    });
  },
};

export default db;
