import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { mockDbMatch, bodyMatch, insertedMatch, sameTeamMatch, invalidTeamMatch, scoreToUpdate } from './mocks/dbMatch';
import Match from '../database/models/Match.model';
import { DbMatch } from '../types';
import { bodyUser, invalidToken } from './mocks/dbUser';
import Team from '../database/models/Team.model';
import { mockDbTeam } from './mocks/dbTeam';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp)

const { expect } = chai;

describe('routes/Match', () => {
  beforeEach(sinon.restore)

  describe('GET /matches', () => {
    it('deve retornar 200 e as partidas corretamente', async () => {
      sinon.stub(Match, 'findAll').resolves(mockDbMatch as Match[])

      const res = await chai.request(app)
        .get('/matches')

      expect(res.status).to.deep.equal(StatusCodes.OK)
      expect(res.body).to.be.an('array')
      expect(res.body[0]).to.deep.equal(mockDbMatch[0])
    })
  })
  
  describe('GET /matches?inProgress', () => {
    it('deve retornar 200 e as partidas em andamento, se for true', async () => {
      sinon.stub(Match, 'findAll').resolves(mockDbMatch.filter((match) => match.inProgress ) as Match[])
      
      const res = await chai.request(app)
      .get('/matches')
      .query({inProgress: true})
      
      expect(res.status).to.deep.equal(StatusCodes.OK)
      res.body.forEach(({inProgress}: DbMatch) => {
        expect(inProgress).to.be.true
      })
    })
    
    it('deve retornar 200 e as partidas em andamento, se for false', async () => {
      sinon.stub(Match, 'findAll').resolves(mockDbMatch.filter((match) => !match.inProgress) as Match[])
      
      const res = await chai.request(app)
      .get('/matches')
      .query({inProgress: false})
      
      expect(res.status).to.deep.equal(StatusCodes.OK)
      res.body.forEach(({inProgress}: DbMatch) => {
        expect(inProgress).to.be.false
      })
    })
  })

  describe('POST /matches', () => {
    let token: string;
    
    it('deve retornar 201 e os dados da partida inserida', async () => {
      sinon.stub(Match, 'create').resolves(insertedMatch as Match)
      
      token = await chai.request(app)
      .post('/login')
      .send(bodyUser)
      .then((res) => res.body.token)
      
      const res = await chai.request(app)
      .post('/matches')
      .set({Authorization: token})
      .send(bodyMatch)
      
      expect(res.status).to.deep.equal(StatusCodes.CREATED)
      expect(res.body).to.deep.equal(insertedMatch)
    })
    
    it('deve retornar 401 caso seja inserida uma partida com times iguais', async () => {
      const res = await chai.request(app)
        .post('/matches')
        .set({Authorization: token})
        .send(sameTeamMatch)

      expect(res.status).to.deep.equal(StatusCodes.UNAUTHORIZED)
      expect(res.body).to.have.property('message', 'It is not possible to create a match with two equal teams')
    })

    it('deve retornar 404 caso seja inserida uma partida com um time que não existe na tabela "teams"', async () => {
      sinon.stub(Team, 'findOne')
      .withArgs({ where: { id: 999 } }).resolves()
      .withArgs({ where: { id: 6 } }).resolves(mockDbTeam[5] as unknown as Team)

      const res = await chai.request(app)
        .post('/matches')
        .set({Authorization: token})
        .send(invalidTeamMatch)

      expect(res.status).to.deep.equal(StatusCodes.NOT_FOUND)
      expect(res.body).to.have.property('message', 'There is no team with such id!')
    })

    it('deve retornar 401 caso seja inserida uma partida sem um token', async () => {
      const res = await chai.request(app)
        .post('/matches')
        .set({Authorization: token = ''})
        .send(bodyMatch)

      expect(res.status).to.deep.equal(StatusCodes.UNAUTHORIZED)
      expect(res.body).to.have.property('message', 'Token must be a valid token')
    })

    it('deve retornar 401 caso seja inserida uma partida com um token inválido', async () => {
      const res = await chai.request(app)
        .post('/matches')
        .set({Authorization: invalidToken})
        .send(bodyMatch)
      
      expect(res.status).to.deep.equal(StatusCodes.UNAUTHORIZED)
      expect(res.body).to.have.property('message', 'Token must be a valid token')
    })
  })

  describe('PATCH /matches/:id/finish', () => {
    it('deve retornar 200 e a mensagem "finished"', async () => {
      sinon.stub(Match, 'findOne').withArgs({where: { id: 41 }}).resolves(mockDbMatch[40] as Match)

      sinon.stub(Match, 'update').resolves()

      const res = await chai.request(app)
        .patch('/matches/41/finish')

      expect(res.status).to.deep.equal(StatusCodes.OK)
      expect(res.body).to.have.property('message', 'Finished')
    })
  })

  describe('PATCH /matches/:id', () => {
    it('deve retornar 200 e a partida atualizada', async () => {
      sinon.stub(Match, 'findOne').withArgs({ where: { id: 41 } }).resolves(mockDbMatch[40] as Match)
      
      sinon.stub(Match, 'update').resolves()
      
      const res = await chai.request(app)
      .patch('/matches/41')
      .send(scoreToUpdate)
      
      expect(res.status).to.deep.equal(StatusCodes.OK)
      expect(res.body).to.contain.keys('newScore')
    })

    it('deve retornar 404 caso a partida seja inválida', async () => {
      sinon.stub(Match, 'findOne').withArgs({ where: { id: 999 } }).resolves()

      const res = await chai.request(app)
        .patch('/matches/999')
        .send(scoreToUpdate)

      expect(res.status).to.deep.equal(404)
      expect(res.body).to.have.property('message', 'Match not found!')
    })
    
    it('deve retornar 401 caso a partida já tenha encerrado', async () => {
      sinon.stub(Match, 'findOne').withArgs({ where: { id: 40 } }).resolves(mockDbMatch[39] as Match)

      const res = await chai.request(app)
        .patch('/matches/40')
        .send(scoreToUpdate)

      expect(res.status).to.deep.equal(401)
      expect(res.body).to.have.property('message', 'Can\'t update finished matches')
    })
  })
})