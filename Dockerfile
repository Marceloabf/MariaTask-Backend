# Etapa de construção
FROM node:20 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compile o projeto
RUN npm run build

# Etapa de produção
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY --from=build /app/package*.json /app/

# Copie os arquivos necessários do container de construção
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.env /app/.env

# Exponha a porta que o app vai rodar
EXPOSE 3000

# Comando para rodar o aplicativo
CMD ["npm", "run", "start:prod"]