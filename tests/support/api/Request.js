const { expect } = require('@playwright/test')

export class Requests {

    constructor(request) {
        this.request = request
    }

    async postWaitingList(data) {

        const newLead = await this.request.post('http://localhost:3333/leads', {
            data: {
                name: data.name,
                email: data.email
            }
        })

        expect(newLead.ok()).toBeTruthy()

    }

} 