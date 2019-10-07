/* eslint-disable no-console */
/**
 * !!!!!!
 * This script must run after 'yarn build' and 'zip -r .nuxt.zip .nuxt'
 * !!!!!!
 */
const path = require('path');
const fs = require('fs');
const Client = require('ssh2-sftp-client');
const nodemiral = require('nodemiral');
const { USER, USER_PASSWD, ZLDLWQ_IP, PROJECT_PATH } = process.env;
const ZIP_NAME = '.nuxt.zip';
const LOCAL_DIR = path.resolve(__dirname, '../');

const client = new Client();
const data = fs.createReadStream(path.join(LOCAL_DIR, ZIP_NAME));
const remoteZipName = path.join(PROJECT_PATH, ZIP_NAME);
client
  .connect({
    host: ZLDLWQ_IP,
    port: 22,
    username: USER,
    password: USER_PASSWD
  })
  .then(() => {
    // remove remote dist dir
    return client.rmdir(path.join(PROJECT_PATH, '.nuxt'), true).catch((e) => e);
  })
  .then(() => {
    // delete zip
    return client.delete(remoteZipName).catch((e) => e);
  })
  .then(() => {
    // upload zip
    return client.put(data, remoteZipName).catch((e) => e);
  })
  .then(() => {
    // unzip
    const shellCommand = [
      `unzip ${remoteZipName} -d ${PROJECT_PATH}`,
      `cd ${PROJECT_PATH}`,
      'git fetch',
      'git reset --hard origin/master',
      'rm -rf node_modules/',
      'yarn',
      'pm2 restart zldlwq-nuxt'
    ].join(' && ');
    nodemiral
      .session(ZLDLWQ_IP, {
        username: USER,
        password: USER_PASSWD
      })
      .execute(shellCommand, (err, code, logs) => {
        console.log(`'${shellCommand}' executed`);
        if (err) {
          console.error({ err, code, logs });
        }
      });
    return client.end();
  })
  .catch((err) => {
    console.error(err.message);
  });
