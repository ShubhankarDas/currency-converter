const chai = require('chai')
const expect = require('chai').expect

const app = require('../app')
const constants = require('../constants/constants')

chai.use(require('chai-http'))

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
  });

  // return a bad request if queries are not found
  it('should return bad request if queries not found.', async () => {
    return await chai.request(app)
      .get(constants.test_no_query_url)
      .then((res) => {
        expect(res).to.have.status(400)
      })
  });

  // return a bad request if queries are not properly given
  it('should return bad request if queries not properly given.', async () => {
    return await chai.request(app)
      .get(constants.test_invalid_query_url)
      .then((res) => {
        expect(res).to.have.status(400)
      })
  });

});