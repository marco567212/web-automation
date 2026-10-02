Feature: Compra de un producto

  Scenario: Completar una compra
    Given que el usuario inicia sesión correctamente
    When agrega "Sauce Labs Backpack" al carrito
    And abre el carrito
    Then visualiza "Sauce Labs Backpack" en el carrito
    When completa el proceso de compra
    Then visualiza la confirmación de compra
