const { expect } = require('@playwright/test')

export class Requests {

    constructor(request) {
        this.request = request
        this.token = undefined
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

    async getToken() {

        const admin = {"email":"admin@zombieplus.com", "password": "pwd123"} 

        const response = await this.request.post('/sessions', {
            data: {
                "email": admin.email,
                "password": admin.password
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        this.token = body.token
    }

    async getCompanyByName(name) {

        const response = await this.request.get('/companies', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },

            params: {
                name: name
            }

        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())
        return body.data[0].id

    }

    async postMovie(movie) {
        
        const companyID = await this.getCompanyByName(movie.company)

        const response = await this.request.post('/movies', {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },

            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyID,
                release_year: movie.release_year,
                featured: movie.featured,
                cover: "undefined"
            }

        })

        expect(response.ok()).toBeTruthy()
    }

    async postTvShow(tvShow) {
        
        const companyID = await this.getCompanyByName(tvShow.company)

        const response = await this.request.post('/tvshows', {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },

            multipart: {
                title: tvShow.title,
                overview: tvShow.overview,
                company_id: companyID,
                release_year: tvShow.release_year,
                featured: tvShow.featured,
                seasons: tvShow.seasons,
                cover: "undefined"
            }

        })

        expect(response.ok()).toBeTruthy()
    }

} 