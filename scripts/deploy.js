/* eslint-disable no-console */
const nodemiral = require('nodemiral')
const { USER, USER_PASSWD, ZLDLWQ_IP, PROJECT_PATH } = process.env

const commands = [
  `cd ${PROJECT_PATH}`,
  'git pull',
  'yarn build',
  'pm2 restart zldlwq-nuxt'
]
const shellCommand = commands.join(' && ')

nodemiral
  .session(ZLDLWQ_IP, {
    username: USER,
    password: USER_PASSWD
  })
  .execute(shellCommand, (err, code, logs) => {
    console.log(`'${shellCommand}' executed`)
    if (err) {
      console.error({ err, code, logs })
    }
  })
