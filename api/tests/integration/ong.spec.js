const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
	beforeEach(async () => {
		//Limpar banco de dados de teste antes de executar o teste
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy()
	})

	it('should be able to create a new ONG', async () => {
		const response = await request(app)
			.post('/ongs')
			.send({
				name: "ABOMORAS2",
				email: "contato@test.com",
				whatsapp: "11999000340",
				city: "Mogi das Cruzes",
				uf: "SP"
			})
			
			expect(response.body).toHaveProperty('id');
			expect(response.body.id).toHaveLength(8);
	})
})