export const mockDbUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export const bodyUser = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const invalidBodyEmail = {
  email: 'emailinvalido@invalido.com',
  password: 'secret_admin'
}

export const invalidBodyPass = {
  email: 'admin@admin.com',
  password: 'senha_invalida'
}

export const invalidToken = 'eyJhbGciOiJIUR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpJVadQssw5c'