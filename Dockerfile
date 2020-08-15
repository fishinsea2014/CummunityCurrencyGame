# 基础镜像
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
# 工作目录
WORKDIR /app
# Docker暴露的端口
EXPOSE 80
# 将步骤1中发布后的文件拷贝到工作目录下
COPY ./bin/Release/netcoreapp3.1/publish .
# 运行项目
ENTRYPOINT ["dotnet", "CommunityCurrencyGame.dll"]


#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
##WORKDIR /app
#EXPOSE 80
#EXPOSE 443

#COPY ./bin/Release/netcoreapp3.1/publish .

#ENTRYPOINT ["dotnet", "CommunityCurrencyGame.dll"]


