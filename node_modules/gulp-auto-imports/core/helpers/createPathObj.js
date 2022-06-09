var path = require('path')

module.exports = filePath => {
   var pathObj = path.parse(filePath)
   return Object.assign(pathObj, {
      ext: pathObj.ext.replace('.', ''),
      fullPath: filePath,
   })
}
