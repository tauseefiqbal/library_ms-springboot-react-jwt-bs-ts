# ===========================================================
# Render-Optimized Dockerfile: React + Spring Boot
# Java 25 + Maven 3.9.15 - Updated 2026-08-03
# ===========================================================

# ---- STAGE 1: Build React Frontend ----
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files for dependency caching
COPY frontend/react-library/package.json frontend/react-library/package-lock.json* ./
RUN npm ci || npm install

# Copy full frontend source
COPY frontend/react-library/ ./

# Build with same-origin API (Render will proxy /api if you configure it)
ENV VITE_API_BASE_URL=""
RUN npm run build

# ---- STAGE 2: Build Spring Boot Backend ----
FROM maven:3.9.15-eclipse-temurin-25 AS backend-builder

WORKDIR /app

# Copy pom first for dependency caching
COPY backend/spring-boot-library/pom.xml .
RUN mvn -B -q -DskipTests dependency:go-offline

# Copy backend source
COPY backend/spring-boot-library/src ./src

# Copy React build into Spring Boot static resources
COPY --from=frontend-builder /app/frontend/dist ./src/main/resources/static

# Build Spring Boot JAR
RUN mvn clean package -DskipTests

# ---- STAGE 3: Runtime ----
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

COPY --from=backend-builder /app/target/*.jar app.jar

# ⚠️ Do NOT set PORT here; Render injects it.
# Just read whatever Render provides.
# ENV PORT=8080   <-- remove this

ENTRYPOINT ["sh", "-c", "java \
    -XX:+UseParallelGC \
    -Xss512k \
    -XX:MaxRAMPercentage=75.0 \
    -jar app.jar --server.port=${PORT}"]
