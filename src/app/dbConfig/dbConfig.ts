import mongoose from "mongoose";
import keys from "../../config/config";
export async function connect() {
  const DbURI: string | undefined = keys.dbUrl;

  if (DbURI === undefined) {
    console.error("Database URL is undefined");
    process.exit(1); // Exit the process with a non-zero exit code
  }
  try {
    mongoose.connect(DbURI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("database connected succesfully");
    });
    connection.on("error", (err) => {
      console.log("database not connected", +err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
    console.log("Not connected");
  }
}
