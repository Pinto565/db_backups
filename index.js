const shell = require("shelljs");
const dotenv = require("dotenv").config();
const date = new Date();
const filename = `${date.getFullYear()}_${
  date.getMonth() + 1
}_${date.getDate()}`;

const takeBackup = () => {
  const db_backup = shell.exec(
    `mysqldump --single-transaction -h${process.env.DB_HOST} -P${process.env.DB_PORT} -u${process.env.DB_USER} -p${process.env.DB_PASSWORD}  ${process.env.BACKUP_DB} > ${filename}.sql`,
    { silent: true }
  );
  if (db_backup.code === 0) {
    console.log("Database backup successfully taken");
  } else {
    console.log("Error taking database backup");
  }
};

takeBackup();