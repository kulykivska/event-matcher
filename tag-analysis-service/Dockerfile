# Dockerfile для tag-analysis-service
FROM node:16

# Установка рабочей директории
WORKDIR /

# Копирование package.json и package-lock.json
COPY package*.json ./

# Очистка кэша npm перед установкой
RUN npm cache clean --force

# Установка зависимостей
RUN npm install

# Копирование всего проекта
COPY . .

# Открываем порт
EXPOSE 4001

# Команда запуска
CMD ["npm", "start"]