# Reto QA FrontEnd - Sauce Demo

Proyecto de automatización con:

- Playwright
- Cucumber
- TypeScript
- Gherkin
- Page Object Model
- Ejecución multibrowser
- Screenshots
- Videos

## Instalación

```bash
npm install
```

Instalar los tres navegadores:

```bash
npx playwright install chromium firefox webkit
```

## Ejecutar en Chromium

```bash
npm run test:chromium
```

## Ejecutar en Firefox

```bash
npm run test:firefox
```

## Ejecutar en WebKit

```bash
npm run test:webkit
```

## Ejecutar los tres navegadores

```bash
npm run test:all
```

`npm test` ejecuta Chromium por defecto.

## Evidencias

Después de cada escenario se genera una captura de pantalla, tanto si el escenario es exitoso como si falla:

```text
artifacts/
└── screenshots/
    ├── chromium/
    ├── firefox/
    └── webkit/
```

También se graba un video completo de cada escenario:

```text
artifacts/
└── videos/
    ├── chromium/
    ├── firefox/
    └── webkit/
```

Los archivos incluyen el nombre del escenario y el estado:

```text
Login_exitoso_PASSED.png
Login_exitoso_PASSED.webm
Login_con_usuario_bloqueado_PASSED.png
```

Si falla:

```text
Completar_una_compra_FAILED.png
Completar_una_compra_FAILED.webm
```

## Reportes

Se genera un reporte independiente por navegador:

```text
reports/cucumber-report-chromium.html
reports/cucumber-report-firefox.html
reports/cucumber-report-webkit.html
```

En macOS:

```bash
open reports/cucumber-report-chromium.html
```

## Estructura

```text
src/
├── features/
│   ├── login.feature
│   └── purchase.feature
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── steps/
│   └── steps.ts
└── support/
    └── hooks.ts
```

## Escenarios cubiertos

- Login exitoso con `standard_user`.
- Login con `locked_out_user`.
- Login con credenciales inválidas.
- Agregar un producto al carrito.
- Visualizar el producto en el carrito.
- Completar el proceso de compra.
- Validar la confirmación.

## Arquitectura

```text
Feature
   ↓
Steps
   ↓
Page Object
   ↓
Playwright
   ↓
Chromium / Firefox / WebKit
```

## ¿Cómo funciona el multibrowser?

El navegador se indica con la variable:

```text
BROWSER
```

El hook selecciona:

```typescript
chromium
firefox
webkit
```

según el script que se ejecute.

## ¿Cómo se generan las evidencias?

En el `After` de Cucumber se toma una captura del estado final del escenario y se guarda como archivo dentro de `artifacts/screenshots/`.

El video se configura al crear el `BrowserContext`:

```typescript
recordVideo
```

