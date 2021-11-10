const shell = require("shelljs");
const dotenv = require("dotenv").config();
const date = new Date();
const filename = `${date.getFullYear()}_${
  date.getMonth() + 1
}_${date.getDate()}`;

const takeBackup = () => {
  var DB_HOST = process.env.DB_HOST;
  var DB_USER = process.env.DB_USER;
  var DB_PORT = process.env.DB_PORT;
  var DB_PASSWORD = process.env.DB_PASSWORD;
  var DB_NAME = process.env.DB_NAME;
  var ALL_DB = process.env.ALL_DATABASE;

  if (ALL_DB) {
    DB_NAME = "--all-databases";
  }

  if (!DB_PORT) {
    DB_PORT = "3306";
  }


  const db_backup = shell.exec(
    `mysqldump --single-transaction -h${DB_HOST} -P${DB_PORT} -u${DB_USER} -p${DB_PASSWORD} ${DB_NAME} > ${filename}.sql`,
    { silent: true }
  );
  if (db_backup.code == 0) {
    console.log("Database backup successfully taken");
  } else {
    console.log("Error taking database backup");
  }
};

takeBackup();
