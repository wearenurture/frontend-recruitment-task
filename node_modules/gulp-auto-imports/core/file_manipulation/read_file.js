var fs = require('fs')

module.exports = function read_file(generatedFilePath) {
   return new Promise((resolve, reject) => {
      fs.readFile(generatedFilePath, (error, data) => {
         if (error) reject(error)
         var oldContent = data.toString()
         resolve(oldContent)
      })
   })
}
