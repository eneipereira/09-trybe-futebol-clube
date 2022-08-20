import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team.model'
import { mockDbTeam } from './mocks/dbTeam';

chai.use(chaiHttp)

const { expect } = chai;

describe('routes/Team', () => {
  beforeEach(sinon.restore)

  describe('GET /teams', () => {
    it('deve retornar 200 e os times corretamente', async () => {
      sinon.stub(Team, 'findAll').resolves(mockDbTeam as unknown as Team[])

      const res = await chai.request(app)
        .get('/teams')

      expect(res.status).to.deep.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0]).to.deep.equal(mockDbTeam[0])
    })
  })

  describe('GET /teams/:id', () => {
    it('deve retornar 200 e o time corretamente', async () => {
      sinon.stub(Team, 'findOne').resolves(mockDbTeam[9] as unknown as Team)

      const res = await chai.request(app)
        .get('/teams/10')

    expect(res.status).to.deep.equal(200)
    expect(res.body).to.deep.equal(mockDbTeam[9])
    })

    it('deve retornar 404 caso o time não seja encontrado', async () => {
      sinon.stub(Team, 'findOne').resolves()

      const res = await chai.request(app)
        .get('/teams/100')

    expect(res.status).to.deep.equal(404)
    expect(res.body).to.have.property('message', 'Team not found')
    })
  })
})