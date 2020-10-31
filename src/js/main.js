import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import './icons'
import './check-updates'
import { prepareForm } from './form-util'
import { warnFacebookBrowserUserIfNecessary } from './facebook-util'
import { addVersion } from './util'
import { getLocation} from './geocode'
import { createForm } from './form'

warnFacebookBrowserUserIfNecessary()
createForm()
getLocation()
prepareForm()
addVersion(process.env.VERSION)
