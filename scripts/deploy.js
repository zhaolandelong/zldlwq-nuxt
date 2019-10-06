/* eslint-disable no-console */
const nodemiral = require('nodemiral');
const { USER, USER_PASSWD, ZLDLWQ_IP, PROJECT_PATH } = process.env;

const commands = [
  `cd ${PROJECT_PATH}`,
  'git fetch',
  'git reset --hard origin/master',
  'rm -rf node_modules/',
  'yarn',
  'yarn build',
  // pm2 start --name=zldlwq-nuxt yarn -- start
  'pm2 restart zldlwq-nuxt'
];
const shellCommand = commands.join(' && ');

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
