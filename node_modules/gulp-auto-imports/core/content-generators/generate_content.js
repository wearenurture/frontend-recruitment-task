var isString = require('../helpers/isString')
var warn = require('../helpers/warn')

var template_warning = require('../error-messages/warn-template')

var format_paths = require('../formatters/format_paths')
var format_template = require('../formatters/format_template')

module.exports = function generate_content({ pathsArray, opt }) {
   var formatIsString = isString(opt.format)

   warn(formatIsString && opt.template, template_warning)

   var output = formatIsString
      ? format_paths({
           relativePaths: pathsArray,
           format: opt.format,
           formatReplace: opt.formatReplace,
           options: opt,
        })
      : format_template({
           relativePaths: pathsArray,
           formats: opt.format,
           template: opt.template,
           formatReplace: opt.formatReplace,
           templateReplace: opt.templateReplace,
           options: opt,
        })

   var defaultHeadFoot = formatIsString ? '\n' : ''

   var header = opt.header ? `${opt.header}\n` : defaultHeadFoot
   var footer = opt.footer ? `\n${opt.footer}` : defaultHeadFoot

   return header + output + footer
}
