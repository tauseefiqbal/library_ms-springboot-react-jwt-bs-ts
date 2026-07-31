# ===========================================================
# Vercel-Optimized Dockerfile: React + Spring Boot
# Java 25 + Maven 3.9.15 - Updated 2026-07-30
# ===========================================================

# ---- STAGE 1: Build React Frontend ----
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/react-library/package.json frontend/react-library/package-lock.json* ./
RUN npm ci || npm install

COPY frontend/react-library/ ./

ENV VITE_API_BASE_URL=""
RUN npm run build

# ---- STAGE 2: Build Spring Boot Backend ----
FROM maven:3.9.15-eclipse-temurin-25 AS backend-builder

WORKDIR /app

COPY backend/spring-boot-library/pom.xml .
RUN mvn -B -q -DskipTests dependency:go-offline

COPY backend/spring-boot-library/src ./src

COPY --from=frontend-builder /app/frontend/dist ./src/main/resources/static

RUN mvn clean package -DskipTests

# ---- STAGE 3: Runtime (Vercel) ----
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

COPY --from=backend-builder /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java",
  "-XX:+UseParallelGC",
  "-Xss512k",
  "-XX:MaxRAMPercentage=75.0",
  "-Dserver.port=8080",
  "-Dserver.address=0.0.0.0",
  "-jar", "app.jar"
]
