FROM python:3.9-slim

# Установка рабочей директории
WORKDIR /usr/src/app

# Установка Rust
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential \
    && curl https://sh.rustup.rs -sSf | sh -s -- -y \
    && export PATH="/root/.cargo/bin:$PATH" \
    && rustc --version

# Обновление pip и установка зависимостей
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --prefer-binary -r requirements.txt

# Копирование исходников
COPY . .

# Открытие порта
EXPOSE 5000

# Установка RUSTFLAGS для корректной сборки на архитектуре aarch64 (если требуется)
ENV RUSTFLAGS="-C target-feature=-crt-static"

# Команда запуска приложения
CMD ["python", "index.py"]
