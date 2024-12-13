import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Parking API (e2e)', () => {
  let app: INestApplication;
  let token: string; // JWT para autenticación

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Registrar y autenticar un administrador para obtener el token
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
      });

    token = response.body.token; // Guardar el token para autenticación
  });

  afterAll(async () => {
    await app.close();
  });

  // Caso 1: Reservar una plaza de aparcamiento
  it('Debe reservar una plaza de aparcamiento (POST /reservations)', async () => {
    // Crear una plaza de aparcamiento
    const parkingSpot = await request(app.getHttpServer())
      .post('/parking-spots')
      .set('Authorization', `Bearer ${token}`)
      .send({
        spotNumber: 'A1',
      });

    // Crear un vehículo
    const vehicle = await request(app.getHttpServer())
      .post('/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        licensePlate: 'ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        ownerId: 1, // ID del usuario administrador
      });

    // Crear una reserva
    const response = await request(app.getHttpServer())
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        startTime: '2024-12-14T10:00:00Z',
        endTime: '2024-12-14T12:00:00Z',
        parkingSpotId: parkingSpot.body.id,
        vehicleId: vehicle.body.id,
        userId: 1, // ID del usuario administrador
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Caso 2: Consultar la ocupación del parking
  it('Debe consultar la ocupación del parking (GET /parking-spots)', async () => {
    const response = await request(app.getHttpServer())
      .get('/parking-spots')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('isOccupied');
  });

  // Caso 3: Actualizar los detalles de un usuario
  it('Debe actualizar los detalles de un usuario (PUT /users/:id)', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/1') // ID del usuario administrador
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'newAdmin',
        email: 'newadmin@example.com',
        phoneNumber: '1234567890',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'newAdmin');
    expect(response.body).toHaveProperty('email', 'newadmin@example.com');
  });
});
