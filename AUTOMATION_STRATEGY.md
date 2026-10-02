# Estrategia de Automatización

## Objetivo

Automatizar los criterios del reto sobre Sauce Demo utilizando Playwright con Cucumber.

## Tecnologías

- Playwright
- Cucumber
- TypeScript
- Gherkin
- Page Object Model

## Multibrowser

La suite puede ejecutarse en:

- Chromium
- Firefox
- WebKit

El navegador se selecciona mediante la variable `BROWSER`.

## Evidencias

Después de cada escenario se genera:

- Screenshot.
- Video completo.

Las evidencias se generan tanto para escenarios exitosos como fallidos y se organizan por navegador.

## Arquitectura

```text
Feature
   ↓
Step Definition
   ↓
Page Object
   ↓
Playwright
   ↓
Chromium / Firefox / WebKit
```

## Reportería

Cucumber genera un reporte HTML separado por navegador.

## Alcance

La suite cubre:

- Login válido.
- Login inválido.
- Usuario bloqueado.
- Agregar producto.
- Visualizar producto en carrito.
- Completar compra.
