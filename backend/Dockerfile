# Use an OpenJDK image as the base
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and project files
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Expose the application port - test
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]