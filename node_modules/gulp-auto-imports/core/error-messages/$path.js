var c = require('chalk')

module.exports = `Only one out of "${c.cyan('$path')}", "${c.cyan(
   '$noExtPath'
)}", and "${c.cyan(
   '$dir'
)}" can be declared in a format rule and they can each only be used once.`
