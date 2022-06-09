var c = require('chalk')

module.exports = `The "${c.yellow(
   'template'
)}" setting is required if the "${c.yellow('format')}" setting is an object.
${c.grey(
   'The template setting dictates the overall structure of the generated file.'
)}

${c.bold('Example:')}
${c.yellow('template:')} \`
$format[imports]

export default function(){
$format[functions]
}
\`,
${c.yellow('format:')} {
  imports: "import ${c.magenta('$name')} from '${c.cyan('$path')}';",
  functions: "  ${c.magenta('$name')}();",
}

${c.magenta(
   '$name'
)} = name of the file minus the extension (good for variable names)
${c.cyan('$path')} = relative path to the file`
