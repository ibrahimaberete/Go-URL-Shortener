package routes

import (
	"fmt"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/lackingworth/Go-URL-Shortener/database"
)

func ResolveURL(c *fiber.Ctx) error {
	url := c.Params("url")
	fmt.Print(url)
	r := database.CreateClient(0)
	defer r.Close()

	value, err := r.Get(database.Ctx, url).Result()
	if err != nil {
		if err == redis.Nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Short not found in the database"})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	// ne pas creer plusieur clients donc enlever cette partie pour la prochaine version
	// client fait plusieur fois la connexions donc faire un seul et connecter une seul fois au demerrage du projet
	rInr := database.CreateClient(1)
	defer rInr.Close()
	_ = rInr.Incr(database.Ctx, "counter")

	return c.Redirect(value, 301)
}

// CountURLs returns the count of URLs stored in the database.


func CountURLs(c *fiber.Ctx) error {
    r := database.CreateClient(0)
    defer r.Close()

    urls, err := r.Keys(database.Ctx, "*").Result()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    // Ajouter "localhost:3000/" avant chaque URL
    for i, url := range urls {
        urls[i] = "localhost:3000/" + url
    }

    return c.JSON(fiber.Map{"count": len(urls), "urls": urls})
}
/*func GetClickCount(c *fiber.Ctx) error {
	url := c.Params("url")
	r := database.CreateClient(0)
	defer r.Close()

	clickCount, err := r.Get(database.Ctx, url+":clicks").Result()
	if err != nil {
		if err == redis.Nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "URL not found in the database"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"url": url, "clickCount": clickCount})
}*/
