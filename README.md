# Commande alembic

Creer une migration: `docker-compose exec api alembic revision --autogenerate`
Upgrade vers la nouvelle migration: `docker-compose exec api alembic upgrade head`