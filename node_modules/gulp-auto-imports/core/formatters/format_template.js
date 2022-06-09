var err = require('../helpers/err')
var format_paths = require('./format_paths')

var template_error = require('../error-messages/template')
var createPathObj = require('../helpers/createPathObj')

module.exports = function format_template({
   relativePaths,
   formats,
   template,
   formatReplace,
   templateReplace,
   options,
}) {
   err(!template, template_error)

   var newTemplate = template

   for (var formatKey in formats) {
      var format = formats[formatKey]
      var formatSet = format_paths({
         relativePaths,
         format,
         formatReplace,
         formatKey,
         options,
      })
      var placeholder = new RegExp(`\\$format\\[${formatKey}\\]`, 'g')
      newTemplate = newTemplate.replace(placeholder, formatSet)
   }

   if (templateReplace) {
      return templateReplace({
         output: newTemplate,
         formats,
         template,
         paths: relativePaths.map(createPathObj),
      })
   }

   return newTemplate
}
