const shell = require("shelljs");
const dotenv = require("dotenv").config();
const { Webhook } = require("discord-webhook-node");
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
    `mysqldump --single-transaction -h${DB_HOST} -P${DB_PORT} -u${DB_USER} -p${DB_PASSWORD} ${DB_NAME} > db_backup/${filename}.sql`,
    { silent: true }
  );
  if (db_backup.code == 0) {
    console.log("Database backup successfully taken");
  } else {
    console.log("Error taking database backup");
  }
};

const sendToDiscord = () => {
  var WEBHOOK_URL = process.env.WEBHOOK_URL;
  const hook = new Webhook(WEBHOOK_URL);
  hook.setUsername("Mysql Dumps");
  hook.setAvatar(
    "https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/ee090372-8a63-44d7-b163-306184b9d293/File/cde43891991f76a5e7df17ac6d373aff/mysql_logo_png_transparent.png"
  );
  hook.sendFile(`db_backup/${filename}.sql`);
};

const runFile = async () => {
  await takeBackup();
  await sendToDiscord();
};

runFile();
