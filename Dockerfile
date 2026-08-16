FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["WhitelistCompanion.csproj", "./"]
RUN dotnet restore "WhitelistCompanion.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "WhitelistCompanion.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WhitelistCompanion.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WhitelistCompanion.dll"]
