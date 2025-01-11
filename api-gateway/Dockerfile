# Базовый образ Node.js
FROM node:16

# Установка рабочей директории
WORKDIR /

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Указание порта
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
