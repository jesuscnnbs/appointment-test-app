#!/bin/bash

echo "Running Railway deployment script..."

# Run migrations
php artisan migrate --force

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link
php artisan storage:link

echo "Deployment complete!"
