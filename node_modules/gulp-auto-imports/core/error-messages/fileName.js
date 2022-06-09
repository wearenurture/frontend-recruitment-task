var c = require('chalk')

module.exports = `The "${c.yellow('fileName')}" setting is required.
${c.grey(
   'The fileName setting determines the file name (including the extension) given to the output file.'
)}`
