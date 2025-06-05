#!/bin/bash
cd "$(dirname $(realpath "$0"))"

# Install redis. Ref: https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install -y redis
sudo systemctl enable redis-server
sudo systemctl start redis-server
