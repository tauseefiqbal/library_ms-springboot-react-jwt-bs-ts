FROM maven:3.9.15-eclipse-temurin-25 AS builder

WORKDIR /app

COPY backend/spring-boot-library/pom.xml .
RUN mvn -B -q -DskipTests dependency:go-offline

COPY backend/spring-boot-library/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java \
  -XX:+UseParallelGC \
  -Xss512k \
  -XX:MaxRAMPercentage=75.0 \
  -jar app.jar --server.port=${PORT} --server.address=0.0.0.0"]
