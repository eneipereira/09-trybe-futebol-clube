import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { awayBoardFirst, groupedBoardFirst, homeBoardFirst } from './mocks/dbLeaderboard';

chai.use(chaiHttp)

const { expect } = chai;

describe('routes/Leaderboard', () => {
  beforeEach(sinon.restore)

  describe('GET /leaderboard', () => {
    it('deve retornar 200 e a classificação geral', async () => {
      const res = await chai.request(app)
        .get('/leaderboard')

      expect(res.status).to.deep.equal(200)
      expect(res.body[0]).to.deep.equal(groupedBoardFirst)
    })
  })

  describe('GET /leaderboard/home', () => {
    it('deve retornar 200 e a classificação dos mandantes', async () => {
      const res = await chai.request(app)
        .get('/leaderboard/home')
  
      expect(res.status).to.deep.equal(200)
      expect(res.body[0]).to.deep.equal(homeBoardFirst)
    })
  })

  describe('GET /leaderboard/away', () => {
    it('deve retornar 200 e a classificação dos visitantes', async () => {
      const res = await chai.request(app)
        .get('/leaderboard/away')
  
      expect(res.status).to.deep.equal(200)
      expect(res.body[0]).to.deep.equal(awayBoardFirst)
    })
  })
})