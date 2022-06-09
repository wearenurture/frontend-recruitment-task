var c = require('chalk')

module.exports = function err(condition, message) {
   if (condition) {
      console.log(`\n${c.red.bold('gulp-auto-imports error:')}\n${message}\n`)
      throw new Error('gulp-auto-imports')
   }
}
