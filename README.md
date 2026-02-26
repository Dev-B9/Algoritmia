# 🚀 PuntoRed Backend – Niveles 0 a 4 (NestJS + TypeScript)

[cite_start]Este proyecto es un backend de prueba técnica para la gestión de **recargas móviles** con JWT y SQLite[cite: 3]. [cite_start]Está implementado con **NestJS** y **TypeScript**, siguiendo una evolución documentada desde autenticación básica hasta una arquitectura modular inspirada en **DDD (Domain-Driven Design) pragmático**[cite: 3, 4].

[cite_start]El proyecto es la base de un portal transaccional que a futuro integrará pagos de servicios, compra de pines y transferencias bancarias[cite: 5].

---

## 📋 Requisitos Previos

* [cite_start]**Node.js**: >= 18 [cite: 7]
* [cite_start]**npm**: >= 9 [cite: 8]
* [cite_start]**SQLite**: Opcional, para persistencia de datos [cite: 9]
* [cite_start]**IDE recomendado**: VSCode [cite: 10]

---

## 🛠️ Ejecución del Proyecto

1.  **Instalar dependencias**:
    ```bash
    npm install
    [cite_start]``` [cite: 12, 13]

2.  **Configurar variables de entorno (`.env`)**:
    ```env
    PORT=3000
    JWT_SECRET=630ac854c378afa120f2629bd2a4b0eea4a5708a406759a0a755e8fd5ad4e9f9b9e4fa5d7cb25f197db39d0d2360232840e7e125f01b1cb3cf616e57f4915a3d
    JWT_EXPIRES_IN=3600s
    DB_PATH=src/infra/db/puntored.sqlite
    [cite_start]``` [cite: 14, 15, 16, 17, 18]

3.  **Scripts disponibles**:
    * [cite_start]**Levantar servidor (Desarrollo)**: `npm run start:dev` [cite: 19, 20]
    * [cite_start]**Ejecutar pruebas unitarias**: `npm run test` [cite: 21, 22]
    * [cite_start]**Ejecutar pruebas end-to-end (e2e)**: `npm run test:e2e` [cite: 23]

---

## 🧰 Librerías y Stack Utilizado

* [cite_start]**Framework**: NestJS [cite: 25]
* [cite_start]**Lenguaje**: TypeScript [cite: 26]
* [cite_start]**Autenticación**: `@nestjs/jwt`, `jsonwebtoken` [cite: 27]
* [cite_start]**Configuración**: `@nestjs/config` [cite: 28]
* [cite_start]**Validación**: `class-validator`, `class-transformer` [cite: 29]
* [cite_start]**Base de Datos**: SQLite + TypeORM [cite: 30]
* [cite_start]**Testing**: Jest, Supertest [cite: 31]

---

## 🛤️ Niveles de Implementación

### 🔹 Nivel 0: Configuración y Autenticación JWT
* [cite_start]**Funcionalidad**: Endpoint `POST /auth/login` con usuario hardcodeado y generación de token JWT[cite: 34, 35, 36].
* [cite_start]**Validación**: DTO + `ValidationPipe` global[cite: 37].
* **Decisiones Técnicas**:
    * [cite_start]**SRP**: `UserService` para credenciales y `AuthService` para JWT[cite: 41].
    * [cite_start]`ConfigModule` global para variables de entorno[cite: 42].
    * [cite_start]Estructura inicial de carpeta `domain/`[cite: 43].

### 🔹 Nivel 1: Lógica de Negocio y Validaciones
* [cite_start]**Funcionalidad**: Endpoint `POST /recharges/buy`[cite: 44, 45].
* [cite_start]**Validación**: Control de montos y formato de `phoneNumber` vía `BuyRechargeDto`[cite: 46, 47].
* **Decisiones Técnicas**:
    * [cite_start]Uso de validators personalizados: `AmountRangeValidator` y `PhoneNumberFormatValidator`[cite: 48, 49].
    * [cite_start]Servicios limpios delegando validación a DTOs[cite: 51].

### 🔹 Nivel 2: Persistencia de Datos e Historial
* [cite_start]**Funcionalidad**: Persistencia con SQLite y endpoint `GET /recharges/history`[cite: 54, 55, 57].
* **Decisiones Técnicas**:
    * [cite_start]Entidad `Transaction` ubicada en `modules/recharges/domain/`[cite: 56].
    * [cite_start]Uso de `TypeOrmModule.forRootAsync()` en `AppModule`[cite: 58].
    * [cite_start]Entidad de dominio separada para mantener la lógica desacoplada[cite: 60].

### 🔹 Nivel 3: Calidad (Pruebas)
* [cite_start]**Cobertura**: Casos exitosos (2xx), errores de cliente (4xx) y errores de servidor (5xx)[cite: 66, 67, 68, 69].
* [cite_start]**Pruebas**: Unitarias junto al código (`.spec.ts`) y e2e en carpeta `test/`[cite: 63, 65].
* **Decisiones Técnicas**:
    * [cite_start]Mocks de servicios y guards para simular fallos[cite: 73].
    * [cite_start]Tests como documentación viva de casos de uso[cite: 74].

### 🔹 Nivel 4: Arquitectura Avanzada (Pragmatic DDD)
[cite_start]Organización modular basada en dominios[cite: 75, 76]:

```text
src/
├─ modules/
│  ├─ auth/        # controllers, domain, dto, guards, services, strategies, validators
│  └─ recharges/   # controllers, domain, dto, services, validators
└─ infra/          # db, helpers, logger, event bus
[cite_start]``` [cite: 77, 83, 84, 92, 95, 113]

* **Decisiones Técnicas**:
    * [cite_start]**No se fuerza DDD puro**: Ideal para entidades simples sin lógica compleja[cite: 108].
    * [cite_start]Estructura escalable para futura lógica de dominio o eventos[cite: 110].
    * [cite_start]Clara separación entre infraestructura y servicios limpios[cite: 111, 113].

---

## 📝 Notas Finales
* [cite_start]Preparado para escalabilidad y tests automatizados[cite: 117].
* [cite_start]Seguridad implementada mediante JWT, validación DTO y guards[cite: 118].
* [cite_start]Proyecto profesional listo para integrar nuevas funcionalidades de negocio[cite: 119].
