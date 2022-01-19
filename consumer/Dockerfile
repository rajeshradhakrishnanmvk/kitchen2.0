FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["consumer.csproj", "./"]
RUN dotnet restore "consumer.csproj"
COPY . ./
RUN dotnet build  --no-restore "consumer.csproj" -c Release -o /app --no-cache /restore 

FROM build AS publish
RUN dotnet publish  --no-restore "consumer.csproj" -c Release -o /app --no-cache /restore 

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "consumer.dll", "subscribe", "kafka:9092","server1.dbo.customers"]