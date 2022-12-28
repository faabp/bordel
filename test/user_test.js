const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const db = require('../dbClient')
const userController = require('../user')

chai.use(chaiHttp)

describe('User REST API', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })
  
  after(() => {
    app.close()
    db.quit()
  })

  describe('POST /user/add', () => {

    it('create a new user', async function () {
      const user = {
		id: '9999',
        first_name: 'Test',
        last_name: 'User',
		email: 'test@admin.com',
		phone: '00000000'
      }
      chai.request(app)
        .post('/user/add')
        .send(user)
        .then((res) => {
          chai.expect(res).to.be.defined
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', async function () {
      const user = {
        first_name: 'NonWorkingUser',
        last_name: 'Kudinov'
      }
      chai.request(app)
        .post('/user/add')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('POST /search', () => {
    
    it('get an existing user', async function () {
      const user = {
		id: '9999',
        first_name: 'Test',
        last_name: 'User',
		email: 'test@admin.com',
		phone: '00000000'
      }
      // Create a user
      userController.create(user, () => {
        // Get the user
        chai.request(app)
          .post('/user/search')
		  .send(user)
          .then((res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res.body.status).to.equal('success')
            chai.expect(res).to.be.json
            done()
          })
          .catch((err) => {
             throw err
          })
      })
    })
    
    it('can not get a user when it does not exist', async function () {
	  const user = {
		id: '10000',
        first_name: 'Test',
        last_name: 'User',
		email: 'test@admin.com',
		phone: '00000000'
      }
      chai.request(app)
        .post('/user/search')
		.send(user)
        .then((res) => {
          chai.expect(res).to.be.defined
		  chai.expect(res.error).to.be.equal('User does not exist')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
})