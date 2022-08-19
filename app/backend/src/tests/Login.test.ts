import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User.model'
import { bodyUser, invalidBodyEmail, invalidBodyPass, mockDbUser } from './mocks/dbUser';


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

    it('deve retornar 400 caso o body seja inválido (sem email)', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send({password: bodyUser.password})

      expect(res.status).to.deep.equal(400);
      expect(res.body).to.have.property('message', 'All fields must be filled');
    })

    it('deve retornar 400 caso o body seja inválido (sem password)', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send({email: bodyUser.email})

      expect(res.status).to.deep.equal(400);
      expect(res.body).to.have.property('message', 'All fields must be filled');
    })

    it('deve retornar 401 caso não encontre o usuário', async () => {
      sinon.stub(User, 'findOne').resolves()
      const res = await chai.request(app)
        .post('/login')
        .send(invalidBodyEmail)

      expect(res.status).to.deep.equal(401)
      expect(res.body).to.have.property('message', 'Incorrect email or password')
    })

    it('deve retornar 401 caso a senha esteja incorreta', async () => {
      sinon.stub(User, 'findOne').resolves()
      const res = await chai.request(app)
        .post('/login')
        .send(invalidBodyPass)

      expect(res.status).to.deep.equal(401)
      expect(res.body).to.have.property('message', 'Incorrect email or password')
    })

    it('deve retornar 200 e o tipo do usuário', async () => {
      sinon.stub(User, 'findOne').resolves(mockDbUser as User)
      const { body: { token } } = await chai.request(app)
        .post('/login')
        .send(bodyUser)
      
      const res = await chai.request(app)
        .get('/login/validate')
        .set({'Authorization': token})

      expect(res.status).to.deep.equal(200)
      expect(res.body).to.contain.keys('role')
    })
  })
})