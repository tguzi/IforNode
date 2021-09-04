import path from 'path'
import moduleAlias from 'module-alias'

const _src = (str?: string) => path.join(__dirname, `../${str}`)

moduleAlias.addAliases({
  'src': _src(),
  'abstract': _src('/abstract'),
  'config': _src('/config'),
  'controller': _src('/controller'),
  'decorator': _src('/decorator'),
  'interface': _src('/interface'),
  'middleware': _src('/middleware'),
  'models': _src('/models'),
  'mysql': _src('/mysql'),
  'utils': _src('/utils'),
  'validation': _src('/validation'),
  'types': _src('/types.d.ts'),
})

moduleAlias()
