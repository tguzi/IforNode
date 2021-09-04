import chalk from 'chalk'
import moment from 'moment'

const log = console.log

const notTime = () => moment().format('YYYY-MM-DD HH:mm:ss')

// console.log = function () {
//   log(chalk.blue(`[${notTime()} LOG]`), ...arguments)
// }

console.info = function () {
  log(chalk.magenta(`[${notTime()} INFO]`), ...arguments)
}

console.warn = function () {
  log(chalk.yellow(`[${notTime()} WARN]`), ...arguments)
}

console.error = function () {
  log(chalk.red(`[${notTime()} ERROR]`), ...arguments)
}

console.debug = function () {
  log(chalk.magenta(`[${notTime()} DEBUG]`), ...arguments)
}
