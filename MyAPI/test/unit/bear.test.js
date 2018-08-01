const mongoose = require('mongoose');
const Bear = require('../../api/bear/model');
const request = require('supertest');
const router = require('../../api/bear/index');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('', router);

process.env.TEST_SUITE = 'bear_tests';

describe('/api/bears* tests', () => {
	describe('/api/bears/ tests : GET & POST', () => {
		test('POST /bears 200', async () => {
			const resp = await request(app)
			.post('/bears')
			.send({ name: "TED", weight: 69, password: "Banana" })
			const { status, body } = resp;
			
			expect(status).toBe(200);
			expect(typeof body).toEqual('object');
			expect(body.name).toBe('TED');
		});
		
		test('POST /bears 400', async () => {
			const resp = await request(app)
			.post('/bears')
			.send({ name: "FOO", weight: 42 })
			const { status, body } = resp;
			
			expect(status).toBe(400);
			expect(typeof body).toEqual('object');
			expect(body.message).toBe('Error: field missing');
		});

		test('GET /bears 200', async () => {
			const bearNo1 = new Bear({ name: "Petit Ours Brun", weight: 1337, password: "CCPOB"});
			const bearNo2 = new Bear({ name: "Nounours", weight: 1664, password: "NicolasPimprenelle"});
			const bearNo3 = new Bear({ name: "Baloo", weight: 1998, password: "IlEnFautPeu"});
			const bearNo4 = new Bear({ name: "Kenai&Koda", weight: 42 + 69, password: "FreresDesOurs"});
			const bearNo5 = new Bear({ name: "Michka", weight: 420, password: "Masha"});
			const bearNo6 = new Bear({ name: "PedoBear", weight: 12, password: "ILoveChildren"});
			bearNo1.save().catch(err => {console.error(err)});
			bearNo2.save().catch(err => {console.error(err)});
			bearNo3.save().catch(err => {console.error(err)});
			bearNo4.save().catch(err => {console.error(err)});
			bearNo5.save().catch(err => {console.error(err)});
			bearNo6.save().catch(err => {console.error(err)});
			const resp = await request(app)
			.get('/bears')
			const { status, body } = resp;

			expect(status).toBe(200);
			expect(typeof body).toEqual('object');
			expect(body.length).toBe(6);
		});
	});
	
	describe('/api/bears/:bear_id tests : GET, PUT, DELETE', () => {
		let id;
		beforeEach( () => {
			const bear = new Bear({ name: "Winnie",
									weight: 666,
									password: "Honey1234" 
								});
			bear.save({})
			id = bear.id;
		});
		test('GET /bears/:bear_id 200', async () => {
			console.log('/bears/'+id);
			const resp = await request(app)
			.get('/bears/'+id)
			const { status, body } = resp;
			expect(status).toBe(200);
			expect(typeof body).toEqual('object');
			expect(body.name).toBe('Winnie');
			expect(body.weight).toBe(666);
			expect(body.password).toBe('Honey1234');
		});
		test('GET /bears/:bear_id 400', async () => {
			console.log('/bears/'+id);
			const resp = await request(app)
			.get('/bears/'+id+'a')
			const { status, body } = resp;
			expect(status).toBe(404);
			expect(typeof body).toEqual('object');
		});
	});

	test('GET / 200', async () => {
		const { status, body } = await request(app)
		.get('/')
		
		expect(status).toBe(200);
		expect(typeof body).toEqual('object');
	});
});


/*describe('Bear tests', () => {
	describe('CREATE', () => {
		test('Create TED', async () => {
			await new Bear({
				name: "TED",
				weight: 69,
				password: "ILoveSinners"
			}).save();
			const createdBear = await Bear.findOne({ name: "TED" });
			expect(createdBear.name).toBe("TED");
			expect(createdBear.weight).toBe(69);
			expect(createdBear.password).toBe("ILoveSinners");
		});
	});
	test('Create WINNIE THE POOH', async () => {
		await new Bear({
			name: "WINNIE THE POOH",
			weight: 42,
			password: "ILoveHoney"
		}).save();
		const createdBear = await Bear.findOne({ name: "WINNIE THE POOH" });
		expect(createdBear.name).toBe("WINNIE THE POOH");
		expect(createdBear.weight).toBe(42);
		expect(createdBear.password).toBe("ILoveHoney");
	});
	describe('FIND', () => {
		test('Find weight = 42', async () => {
			const foundBear = await Bear.findOne({ weight: 42 });
			expect(typeof foundBear.name).toBe('string');
			expect(foundBear.weight).toBe(42);
			expect(typeof foundBear.password).toBe('string');
		});
	});
	describe('MODIFY', () => {

	});
	describe('DELETE', () => {
	});
});*/
