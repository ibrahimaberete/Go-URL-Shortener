Demmarer le docker: 
docker-compose -f local.yml up --build -d

Aller sur le dossier api : 
cd api 

puis lancer l'api go : 
go run .
Ne pas oublier de changer localhost par db dans le DB_ADDR dans le .env

Pour testé les fichiers :
Aller sur ./test puit go test
