var c = require('chalk')

module.exports = function warn(condition, message) {
   if (condition) {
      console.log(`${c.yellow.bold('gulp-auto-imports warning:')} ${message}`)
   }
}
