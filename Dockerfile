#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["CommunityCurrencyGame.csproj", ""]
RUN dotnet restore "./CommunityCurrencyGame.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "CommunityCurrencyGame.csproj" -c Release -o /app/build

FROM build AS publish
# Install npm
RUN curl -sl https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN dotnet publish "CommunityCurrencyGame.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CommunityCurrencyGame.dll"]