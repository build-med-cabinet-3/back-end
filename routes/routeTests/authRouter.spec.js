const request = require("supertest");
const server = require("../../server");


describe('server', () => {
    describe('GET /user/register', () => {
        it('should return 401 no creds', () => {
            return request(server).get('/user/register').then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON data', () => {
            return request(server).get('/user/register').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
    describe('POST /user/register', () => {
        it('should return 200 OK', () => {
            return request(server).post('/user/register').send({first_name:"bobby",lastName:"boii", email:"newemailyes@email.com",password:"pass"})
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON data', () => {
            return request(server).post('/user/register').send({first_name:"bobby",lastName:"boii", email:"bobby@email.com",password:"pass"}).then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
    describe('POST /login', () => {
        it('should return 200 OK', () => {
            return request(server).post('/user/login').send({email:"bobby@email.com",password:"pass"})
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON data', () => {
            return request(server).post('/user/login').send({email:"bobby@email.com",password:"pass"}).then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })

    })