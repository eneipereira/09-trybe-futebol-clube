import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User.model'
import { bodyUser, mockDbUser } from './mocks/dbUser';


chai.use(chaiHttp)

const { expect } = chai;

describe('routes/Login', () => {
  beforeEach(sinon.restore)

  describe('POST /login', () => {
    it('deve retornar 200 e o token criado', async () => {
      sinon.stub(User, 'findOne').resolves(mockDbUser as User)
      const res = await chai.request(app)
        .post('/login')
        .send(bodyUser);

      expect(res.status).to.deep.equal(200);
      expect(res.body).to.contain.keys('token');
    })

    it('deve retornar 400 caso o login não contenha o campo email', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send({password: bodyUser.password})

      expect(res.status).to.deep.equal(400);
      expect(res.body).to.have.property('message', 'All fields must be filled');
    })
  })
})