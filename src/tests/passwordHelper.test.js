const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelper')

const SENHA = '123'
const HASH = '$2b$04$ACEV5nbARqIJup1O5w92l.EiBFG6bta6QbX/MCfqUzDCcnylVn92e'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)

        assert.ok(result.length > 10)
    })

    it('deve comparar uma senha e seu hash correspondente', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)

        assert.ok(result)
    })
})