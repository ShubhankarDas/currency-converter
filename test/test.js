const chai = require('chai')
const expect = require('chai').expect

const app = require('../app')
const constants = require('../constants/constants')

chai.use(require('chai-http'))

// testing the api responses with status codes and it messages

// ---- We could test the controller separately for better tests ----

describe('## Currency converter Api', function () {

  // exit once test is completed
  after((done) => {
    done()
    process.exit(0)
  })

  // GET - return the converted value
  it('should return the converted value.', async () => {
    return await chai.request(app)
      .get(constants.test_success_url)
      .then((res)=>{
        expect(res).to.have.status(200)
      })
  })

  // return a bad requests with their respective error messages
  constants.tests.forEach( testCase => {
    it(testCase.description, async () => {
      return await chai.request(app)
        .get(testCase.url)
        .then((res) => {
          expect(res).to.have.status(testCase.expected_status_code)
          expect(res.error.text).to.equal(testCase.expected_error_text)
        })
    })
  })

})