module.exports = function debug(file) {
   var propValue
   for (var propName in file) {
      propValue = file[propName]
      console.log(`{${propName}: ${propValue}}`)
   }
}
