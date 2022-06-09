var path = require('path')
var err = require('../helpers/err')
var pathError = require('../error-messages/$path')
const warn = require('../helpers/warn')
var c = require('chalk')

const retainOrderWarning = ({ placeholder, filePath, format, options }) => `
\nThe ${c.yellow(placeholder)} placeholder does not support the ${c.cyan(
   'retainOrder: true'
)} setting.
Order retention is being ignored.

${c.bold('Format:')} ${format}

${c.bold('Input path:')} "${filePath}"

${c.bold('Output file:')} ${options.dest}/${options.fileName}\n
`

module.exports = function formatPath(filePath, format, options) {
   var pathObj = path.parse(filePath)
   var noExtPath = [pathObj.dir, pathObj.name].join('/')

   var pathRegEx = /\$path/g
   var noExtPathRegEx = /\$noExtPath/g
   var dirRegEx = /\$dir/g
   var pathCount = (format.match(pathRegEx) || []).length
   var noExtPathCount = (format.match(noExtPathRegEx) || []).length
   var dirCount = (format.match(dirRegEx) || []).length
   err(pathCount + noExtPathCount + dirCount > 1, pathError)

   if (options.retainOrder) {
      warn(
         noExtPathCount > 0,
         retainOrderWarning({
            placeholder: `$noExtPath`,
            filePath,
            format,
            options,
         })
      )
      warn(
         dirCount > 0,
         retainOrderWarning({
            placeholder: `$dir`,
            filePath,
            format,
            options,
         })
      )
   }

   return format
      .replace(pathRegEx, filePath)
      .replace(noExtPathRegEx, noExtPath)
      .replace(dirRegEx, pathObj.dir)
}
