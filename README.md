# 🚀 PuntoRed Backend – Niveles 0 a 3 (NestJS + TypeScript)

Este proyecto es un **MVP (Producto Mínimo Viable)** funcional de un backend para la gestión de **recargas móviles** con JWT y SQLite. Está desarrollado con **NestJS** y **TypeScript**, implementando una arquitectura de **DDD (Domain-Driven Design) pragmático** que evoluciona desde una autenticación básica hasta un sistema modular y escalable.

El proyecto sirve como base sólida para un portal transaccional integral que permitirá la expansión futura hacia pagos de servicios, compra de pines y transferencias bancarias.

---

## 📋 Requisitos Previos

* **Node.js**: >= 18 
* **npm**: >= 9 
* **SQLite**: no requiere instalación externa; usado vía TypeORM.
* **IDE recomendado**: VSCode 

---

## 🛠️ Ejecución del Proyecto

## 🌿 Flujo de Trabajo y Ramas

El desarrollo de este proyecto sigue una estrategia de ramificación organizada para garantizar la estabilidad de cada nivel:

* **`main`**: Rama de producción. Contiene únicamente versiones estables, probadas y documentadas del MVP listas para despliegue.

* **`develop`**: Es la rama principal de integración. Aquí se consolida el código estable y testeado (Niveles 0 al 4) y sirve como base para las pruebas integradas del MVP.

* **`feature/level-X`**: Cada fase del proyecto o nueva funcionalidad se desarrolla en una rama independiente (ej. `feature/level-5-tests`).

---

🔑 **Credenciales para Pruebas (Login)**:
      Para interactuar con el endpoint `/auth/login`, utilice las credenciales sugeridas en la documentación técnica:
      * **Username**: `testuser` 
      * **Password**: `password123`

---

1.  **Instalar dependencias**:
    ```bash
    npm install
    ``` 

2.  **Configurar variables de entorno (`.env`)**:
    ```env
    PORT=3000
    JWT_SECRET=tu-secret-key
    JWT_EXPIRES_IN=3600s
    DB_PATH=src/infra/db/puntored.sqlite
    ``` 
3.  **Scripts disponibles**:
    * **Levantar servidor (Desarrollo)**: `npm run start:dev` 
    * **Levantar servidor (Producción)**: `npm run start:prod`
    * **Ejecutar pruebas unitarias**: `npm run test -- --verbose` 
    * **Ejecutar pruebas end-to-end (e2e)**: `npm run test:e2e -- --verbose`


El archivo de base de datos SQLite se crea (o utiliza) automáticamente en la ruta definida por `DB_PATH` (por defecto `src/infra/db/puntored.sqlite`), por lo que no requiere instalación ni configuración externa de un motor de base de datos.

---

## 🧰 Librerías y Stack Utilizado

* **Framework**: NestJS
* **Lenguaje**: TypeScript
* **Autenticación**: `@nestjs/jwt`, `jsonwebtoken`, `@nestjs/passport`, `passport`, `passport-jwt`
* **Configuración**: `@nestjs/config`
* **Validación**: `class-validator`, `class-transformer` 
* **Base de Datos**: SQLite + TypeORM 
* **Identificadores únicos**: `uuid` (IDs de transacciones)
* **Testing**: Jest, Supertest 
* **Calidad / Tooling**: ESLint, Prettier, ts-jest (estilo, formato y soporte a pruebas)

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
    * Mocks de servicios y guards para simular fallo

### 🔹 Arquitectura avanzada – DDD pragmático (MVP)
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
#### ⚙️ Decisiones Técnicas 
* **Enfoque Pragmático**: No se fuerza un DDD puro; la estructura sigue principios estratégicos pero es flexible, ya que muchas entidades actuales son simples y no requieren lógica de dominio compleja.
* **Escalabilidad**: El sistema está diseñado para evolucionar de forma ordenada al agregar lógica de negocio densa, persistencia avanzada o sistemas de eventos.
* **Servicios Limpios y SRP**: Aplicación estricta del Principio de Responsabilidad Única y separación clara de responsabilidades en cada capa.
* **Dominio Reutilizable**: Carpeta `domain/` preparada para contener la lógica de negocio central y ser fácilmente reusable.
* **Capa de Infraestructura**: Separación del directorio `infra/` para gestionar helpers de base de datos, logs y el bus de eventos de forma aislada.
* **Calidad de Código**: Estrategia de tests e2e totalmente independientes de los unitarios, garantizando claridad en el mantenimiento y la validación del flujo.


---

## 📝 Notas Finales
* Preparado para escalabilidad y tests automatizados.
* Seguridad implementada mediante JWT, validación DTO y guards.
* Este backend se considera un **MVP funcional** de un portal transaccional, estructurado para evolucionar hacia un sistema de gran escala sin necesidad de refactorizaciones profundas.
