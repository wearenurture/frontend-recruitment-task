var path = require('path')

// Also replaces `$ext` with the file extension
module.exports = function formatName(filePath, format, uniqueSet) {
   var ext = path.extname(filePath)
   var name = path.basename(filePath, ext)
   var safeName = name.replace(/\W/g, '_')
   var uniqueName = uniqueSet.add(safeName)
   return format
      .replace(/\$name/g, uniqueName)
      .replace(/\$fileName/g, name)
      .replace(/\$ext/g, ext.replace('.', ''))
}
