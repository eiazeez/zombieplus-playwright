const { test: base } = require('@playwright/test')

import { LoginPage } from '../support/pages/LoginPage.js'
import { MoviesPage } from '../support/pages/MoviesPage.js'
import { Header } from '../support/components/Header.js'
import { Toast } from '../support/components/Toast.js'
import { LandingPage } from '../support/pages/LandingPage.js'
import { Requests } from '../support/api/Request.js'

const test = base.extend({

    pw: async ({ page, request }, use) => {

        await use({
            ...page, 
            landingPage: new LandingPage(page),
            loginPage: new LoginPage(page),
            moviesPage: new MoviesPage(page),
            header: new Header(page),
            toast: new Toast(page),
            requests: new Requests(request)
        })

    }

})

export { test }