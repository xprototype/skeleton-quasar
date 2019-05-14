import { register } from 'src/app/Util'
import PrototypeForm from 'src/app/Agnostic/Components/PrototypeForm'
import PrototypeTable from 'src/app/Agnostic/Components/PrototypeTable'

import AppButton from 'src/app/Components/Button/AppButton'
import AppDebugger from 'src/app/Components/Debugger/AppDebugger'
import AppField from 'src/app/Components/Field/AppField'
import AppForm from 'src/app/Components/Form/AppForm'

register('PrototypeTable', PrototypeTable)
register('PrototypeForm', PrototypeForm)

register('AppButton', AppButton)
register('AppDebugger', AppDebugger)
register('AppField', AppField)
register('AppForm', AppForm)
