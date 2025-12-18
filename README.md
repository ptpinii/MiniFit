# MiniFit Backend

## Descripci�n del proyecto
MiniFit es un sistema web dise�ado para gestionar la reserva de asesor�as deportivas personalizadas. Este backend est� construido con **Node.js** y **Express**, y sigue los principios de la **arquitectura hexagonal (Ports & Adapters)** para fomentar la separaci�n de responsabilidades y escalabilidad.

## Arquitectura Hexagonal
El proyecto se organiza en tres capas principales:

1. **Domain** (src/domain):
   - Contiene las entidades principales (`Reserva`, `Disponibilidad`).
   - Aloja las reglas del negocio en servicios (`ReservaService`, `DisponibilidadService`).
   - No depende de frameworks ni infraestructuras externas.

2. **Application** (src/application):
   - Aqu� se encuentran los casos de uso (`CreateReservaUseCase`, `CreateDisponibilidadUseCase`).
   - Conecta el dominio con la capa de infraestructura.

3. **Infrastructure** (src/infrastructure):
   - Proporciona adaptadores como repositorios en memoria (`ReservaRepositoryMemory`, `DisponibilidadRepositoryMemory`).
   - Contiene los controladores y rutas REST.
   - Aloja middlewares como el de autenticaci�n con JWT.

Esta arquitectura permite reemplazar f�cilmente componentes individuales (como bases de datos, frameworks, etc.) sin afectar el n�cleo del negocio.

## C�mo ejecutar el proyecto

**Requerimientos previos**
- Node.js (v16 o superior).

**Pasos**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/ptpinii/MiniFit.git
   cd MiniFit
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno creando un archivo `.env` basado en el archivo `.env.example`:
   ```env
   JWT_SECRET=secretkey_demo
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```
El servidor se ejecutar� por defecto en `http://localhost:3000/`.

## Endpoints

### 1. Autenticaci�n
**Login**  
`POST /api/v1/auth/login`
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \  
  -H "Content-Type: application/json" \  
  -d '{"email": "cliente@test.com", "password": "1234"}'
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "rol": "cliente"
}
```

### 2. Disponibilidad
**Crear bloque de disponibilidad**  
`POST /api/v1/disponibilidad`
```bash
curl -X POST http://localhost:3000/api/v1/disponibilidad \  
  -H "Content-Type: application/json" \  
  -H "Authorization: Bearer <token>" \  
  -d '{"fecha": "2025-12-19", "horaInicio": "10:00", "horaFin": "12:00"}'
```

### 3. Reservas
**Crear una reserva**  
`POST /api/v1/reservas`
```bash
curl -X POST http://localhost:3000/api/v1/reservas \  
  -H "Content-Type: application/json" \  
  -H "Authorization: Bearer <token>" \  
  -d '{"userId": "12345", "fecha": "2025-12-19", "hora": "10:00", "modalidad": "presencial", "tipoAsesoria": "entrenamiento personal"}'
```

**Listar reservas**  
`GET /api/v1/reservas`
```bash
curl -X GET http://localhost:3000/api/v1/reservas \  
  -H "Authorization: Bearer <token>"
```

## C�mo hacer la demo
1. **Login**: Ejecuta el endpoint de autenticaci�n (`/api/v1/auth/login`) para obtener un token JWT.
2. **Crear disponibilidad**: Usa el token del login y ejecuta el endpoint `/api/v1/disponibilidad` para crear un bloque de disponibilidad.
3. **Crear reserva**: Con el mismo token, crea una reserva en `/api/v1/reservas`.
4. **Listar reservas**: Comprueba que la reserva se cre� exitosamente utilizando el endpoint `/api/v1/reservas`.

## Nota acad�mica
La arquitectura hexagonal de este sistema mitiga riesgos y promueve un dise�o robusto:

- **Doble reserva**: La l�gica del dominio previene reservas en horarios ya ocupados mediante el servicio de disponibilidad.
- **Errores manuales**: Los datos de entrada son estrictamente validados en el dominio y se usan herramientas como JWT para asegurar autenticaci�n/autorizaci�n.
- **Sustituci�n de tecnolog�a**: Los puertos y adaptadores permiten cambiar componentes como la base de datos sin afectar las reglas del negocio (independencia tecnol�gica).

Este dise�o tambi�n soporta el an�lisis ATAM al manejar riesgos de mantenibilidad y extensibilidad.