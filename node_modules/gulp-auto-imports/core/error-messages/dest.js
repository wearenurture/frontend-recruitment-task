var c = require('chalk')

module.exports = `The "${c.yellow('dest')}" setting is required.
${c.grey(
   'The dest setting should be the exact same value as what is provided to gulp.dest().'
)}`
