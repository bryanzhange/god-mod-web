# Install packages
```sh
docker-compose up install
```

# Start the application for dev
```sh
npm run dev
```

# Build the application for production
```sh
docker-compose up build
```

# Start the application for production
```sh
docker-compose up start
```

# Telegram Login Integration
1. Add bot name to `.env` file
```env
NEXT_PUBLIC_BOT_NAME=your_bot_username
```

2. Set up domain that supports HTTPS for the bot using [@BotFather](https://t.me/botfather)