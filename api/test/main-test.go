package main

import (
    "net/http/httptest"
    "testing"

    "github.com/gofiber/fiber/v2"
)

func TestHomePage(t *testing.T) {
    // Création d'une nouvelle instance de Fiber
    app := fiber.New()
    setupRoutes(app)

    // Création d'une requête GET vers la page d'accueil
    req := httptest.NewRequest("GET", "/", nil)
    resp, err := app.Test(req)

    // Vérification qu'il n'y a pas d'erreur et que le statut HTTP est 200
    if err != nil {
        t.Errorf("Error testing home page: %v", err)
    }
    if resp.StatusCode != 200 {
        t.Errorf("Expected status code 200, got %d", resp.StatusCode)
    }
}

// Ajoutez d'autres fonctions de test pour les différentes routes ici