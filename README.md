# 🚀 PuntoRed Backend – Niveles 0 a 4 (NestJS + TypeScript)

Este proyecto es un backend de prueba técnica para la gestión de **recargas móviles** con JWT y SQLite. Está implementado con **NestJS** y **TypeScript**, siguiendo una evolución documentada desde autenticación básica hasta una arquitectura modular inspirada en **DDD (Domain-Driven Design) pragmático**.

El proyecto es la base de un portal transaccional que a futuro integrará pagos de servicios, compra de pines y transferencias bancarias.

---

## 📋 Requisitos Previos

* **Node.js**: >= 18 
* **npm**: >= 9 
* **SQLite**: Opcional, para persistencia de datos
* **IDE recomendado**: VSCode 

---

## 🛠️ Ejecución del Proyecto

1.  **Instalar dependencias**:
    ```bash
    npm install
    ``` 

2.  **Configurar variables de entorno (`.env`)**:
    ```env
    PORT=3000
    JWT_SECRET=630ac854c378afa120f2629bd2a4b0eea4a5708a406759a0a755e8fd5ad4e9f9b9e4fa5d7cb25f197db39d0d2360232840e7e125f01b1cb3cf616e57f4915a3d
    JWT_EXPIRES_IN=3600s
    DB_PATH=src/infra/db/puntored.sqlite
    ``` 
3.  **Scripts disponibles**:
    * **Levantar servidor (Desarrollo)**: `npm run start:dev` 
    * **Ejecutar pruebas unitarias**: `npm run test` 
    * **Ejecutar pruebas end-to-end (e2e)**: `npm run test:e2e`

---

## 🧰 Librerías y Stack Utilizado

* **Framework**: NestJS
* **Lenguaje**: TypeScript
* **Autenticación**: `@nestjs/jwt`, `jsonwebtoken`
* **Configuración**: `@nestjs/config`
* **Validación**: `class-validator`, `class-transformer` 
* **Base de Datos**: SQLite + TypeORM 
* **Testing**: Jest, Supertest 

---

## 🛤️ Niveles de Implementación

### 🔹 Nivel 0: Configuración y Autenticación JWT
* **Funcionalidad**: Endpoint `POST /auth/login` con usuario hardcodeado y generación de token JWT
* **Validación**: DTO + `ValidationPipe` global
* **Decisiones Técnicas**:
    * **SRP**: `UserService` para credenciales y `AuthService` para JWT
    * `ConfigModule` global para variables de entorno
    * Estructura inicial de carpeta `domain/`

### 🔹 Nivel 1: Lógica de Negocio y Validaciones
* **Funcionalidad**: Endpoint `POST /recharges/buy`
* **Validación**: Control de montos y formato de `phoneNumber` vía `BuyRechargeDto`
* **Decisiones Técnicas**:
    * Uso de validators personalizados: `AmountRangeValidator` y `PhoneNumberFormatValidator`
    * Servicios limpios delegando validación a DTOs

### 🔹 Nivel 2: Persistencia de Datos e Historial
* **Funcionalidad**: Persistencia con SQLite y endpoint `GET /recharges/history`
* **Decisiones Técnicas**:
    * Entidad `Transaction` ubicada en `modules/recharges/domain/`
    * Uso de `TypeOrmModule.forRootAsync()` en `AppModule`
    * Entidad de dominio separada para mantener la lógica desacoplada

### 🔹 Nivel 3: Calidad (Pruebas)
* **Cobertura**: Casos exitosos (2xx), errores de cliente (4xx) y errores de servidor (5xx)
* **Pruebas**: Unitarias junto al código (`.spec.ts`) y e2e en carpeta `test/`
* **Decisiones Técnicas**:
    * Mocks de servicios y guards para simular fallos
    * Tests como documentación viva de casos de uso

### 🔹 Nivel 4: Arquitectura Avanzada (Pragmatic DDD)
Organización modular basada en dominios:

```text
src/
├─ app.controller.ts
├─ app.controller.spec.ts
├─ app.module.ts
├─ app.service.ts
├─ main.ts
├─ modules/
│  ├─ auth/
│  │  ├─ controllers/
│  │  ├─ domain/
│  │  ├─ dto/
│  │  ├─ guards/
│  │  ├─ services/
│  │  ├─ strategies/
│  │  └─ validators/
│  └─ recharges/
│     ├─ controllers/
│     ├─ domain/
│     ├─ dto/
│     ├─ services/
│     └─ validators/
└─ infra/
   └─ db/
       └─ puntored.sqlite (no versionado)

test/
│  ├─ e2e
├─ setup.ts
└─ jest-e2e.json

``` 

* **Decisiones Técnicas**:
    * **No se fuerza DDD puro**: Ideal para entidades simples sin lógica compleja.
    * Estructura escalable para futura lógica de dominio o eventos.
    * Clara separación entre infraestructura y servicios limpios.

---

## 📝 Notas Finales
* Preparado para escalabilidad y tests automatizados.
* Seguridad implementada mediante JWT, validación DTO y guards.
