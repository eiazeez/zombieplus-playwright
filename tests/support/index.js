const { test: base } = require('@playwright/test')

import { Login } from './actions/Login.js'
import { Movies } from './actions/Movies.js'
import { TvShows } from './actions/TvShows.js'
import { Header } from '../support/components/Header.js'
import { Modal } from './components/Modal.js'
import { Leads } from './actions/Leads.js'
import { Requests } from '../support/api/Request.js'

const test = base.extend({

    pw: async ({ page, request }, use) => {

        const context = page

        context['leads']     = new Leads(page)
        context['login']     = new Login(page)
        context['movies']    = new Movies(page)
        context['header']    = new Header(page)
        context['modal']     = new Modal(page)
        context['requests']  = new Requests(request)
        context['tvShows']   = new TvShows(page)

        await context['requests'].getToken()

        await use(context)

    }

})

export { test }