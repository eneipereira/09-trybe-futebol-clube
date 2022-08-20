import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { mockDbMatch } from './mocks/dbMatch';
import Match from '../database/models/Match.model';
import { DbMatch, FullMatch } from '../types';

chai.use(chaiHttp)

const { expect } = chai;

describe('routes/Match', () => {
  beforeEach(sinon.restore)

  describe('GET /matches', () => {
    it('deve retornar 200 e as partidas corretamente', async () => {
      sinon.stub(Match, 'findAll').resolves(mockDbMatch as unknown as Match[])

      const res = await chai.request(app)
        .get('/matches')

      expect(res.status).to.deep.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0]).to.deep.equal(mockDbMatch[0])
    })
  })

  describe('GET /matches?inProgress', () => {
    it('deve retornar 200 e as partidas em andamento, se for true', async () => {
      sinon.stub(Match, 'findAll').resolves(mockDbMatch.filter((match) => match.inProgress ) as unknown as Match[])

      const res = await chai.request(app)
        .get('/matches')
        .query({inProgress: true})

      expect(res.status).to.deep.equal(200)
      res.body.forEach(({inProgress}: DbMatch) => {
        expect(inProgress).to.be.true
      })
    })

    it('deve retornar 200 e as partidas em andamento, se for false', async () => {
      sinon.stub(Match, 'findAll').resolves(mockDbMatch.filter((match) => !match.inProgress) as unknown as Match[])

      const res = await chai.request(app)
        .get('/matches')
        .query({inProgress: false})

      expect(res.status).to.deep.equal(200)
      res.body.forEach(({inProgress}: DbMatch) => {
        expect(inProgress).to.be.false
      })
    })
  })
})