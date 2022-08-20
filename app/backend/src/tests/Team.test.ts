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
})