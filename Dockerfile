# Используем официальный образ Node.js с версии 18 в качестве базового
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения в рабочую директорию
COPY . .

# Указываем команду для запуска приложения
CMD [ "npm", "start" ]

# Указываем порт, который будет использовать приложение (например, если у вас есть веб-интерфейс)
EXPOSE 3000