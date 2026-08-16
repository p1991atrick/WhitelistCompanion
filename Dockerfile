FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

# .NET 8+ base images already ship a built-in non-root "app" user (exposed as $APP_UID),
# so there's no need to create one manually the way net5.0 images required.
USER $APP_UID

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
