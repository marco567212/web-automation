Feature: Login en Sauce Demo

  Scenario: Login exitoso
    Given que el usuario está en Sauce Demo
    When inicia sesión con "standard_user" y "secret_sauce"
    Then visualiza la página de productos

  Scenario: Login con usuario bloqueado
    Given que el usuario está en Sauce Demo
    When inicia sesión con "locked_out_user" y "secret_sauce"
    Then visualiza un mensaje de usuario bloqueado

  Scenario: Login con credenciales inválidas
    Given que el usuario está en Sauce Demo
    When inicia sesión con "usuario_invalido" y "password_invalido"
    Then visualiza un mensaje de error
