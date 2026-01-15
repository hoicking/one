# Docker Compose 部署指南

本项目支持使用 Docker Compose 同时部署 `common_h5` 和 `common_web` 两个子项目。

## 项目结构

```
all-in-one/
├── docker-compose.yml      # 统一的 Docker Compose 配置
├── Dockerfile.h5           # common_h5 的 Dockerfile
├── Dockerfile.web          # common_web 的 Dockerfile
├── .dockerignore           # Docker 构建忽略文件
└── apps/
    ├── h5/
    │   └── common_h5/      # H5 应用
    └── web/
        └── common_web/      # Web 应用
```

## 快速开始

### 1. 启动所有服务

在项目根目录执行：

```bash
docker-compose up -d
```

这会同时启动：
- `common-h5` 服务（端口 3000）
- `common-web` 服务（端口 3001）

### 2. 查看服务状态

```bash
docker-compose ps
```

### 3. 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 只查看 common-h5 日志
docker-compose logs -f common-h5

# 只查看 common-web 日志
docker-compose logs -f common-web
```

### 4. 访问应用

- **common_h5**: http://localhost:3000
- **common_web**: http://localhost:3001

### 5. 停止所有服务

```bash
docker-compose down
```

---

## 单独管理服务

### 只启动 common-h5

```bash
docker-compose up -d common-h5
```

### 只启动 common-web

```bash
docker-compose up -d common-web
```

### 只重启某个服务

```bash
docker-compose restart common-h5
docker-compose restart common-web
```

### 只停止某个服务

```bash
docker-compose stop common-h5
docker-compose stop common-web
```

---

## 常用命令

### 重新构建并启动

```bash
# 重新构建所有服务
docker-compose up -d --build

# 只重新构建 common-h5
docker-compose up -d --build common-h5

# 只重新构建 common-web
docker-compose up -d --build common-web
```

### 强制重新构建（不使用缓存）

```bash
docker-compose build --no-cache
docker-compose up -d
```

### 查看资源使用情况

```bash
docker stats
```

### 进入容器

```bash
# 进入 common-h5 容器
docker-compose exec common-h5 sh

# 进入 common-web 容器
docker-compose exec common-web sh
```

---

## 端口配置

默认端口配置：
- `common-h5`: 3000
- `common-web`: 3001

如果需要修改端口，编辑 `docker-compose.yml`：

```yaml
services:
  common-h5:
    ports:
      - "8080:3000"  # 外部端口:容器端口
```

---

## 环境变量配置

### 方式一：在 docker-compose.yml 中配置

编辑 `docker-compose.yml`，在对应服务的 `environment` 部分添加：

```yaml
services:
  common-h5:
    environment:
      - NEXT_PUBLIC_API_URL=https://api.example.com
      - DATABASE_URL=postgresql://...
  
  common-web:
    environment:
      - NEXT_PUBLIC_API_URL=https://api.example.com
      - DATABASE_URL=postgresql://...
```

### 方式二：使用 .env 文件

1. 在项目根目录创建 `.env` 文件：

```bash
# common_h5 环境变量
H5_API_URL=https://api.example.com
H5_DATABASE_URL=postgresql://...

# common_web 环境变量
WEB_API_URL=https://api.example.com
WEB_DATABASE_URL=postgresql://...
```

2. 在 `docker-compose.yml` 中引用：

```yaml
services:
  common-h5:
    environment:
      - NEXT_PUBLIC_API_URL=${H5_API_URL}
  
  common-web:
    environment:
      - NEXT_PUBLIC_API_URL=${WEB_API_URL}
```

### 方式三：使用环境变量文件

为每个服务创建独立的环境变量文件：

```yaml
services:
  common-h5:
    env_file:
      - ./apps/h5/common_h5/.env.production
  
  common-web:
    env_file:
      - ./apps/web/common_web/.env.production
```

---

## 网络配置

两个服务在同一个 Docker 网络中（`app-network`），可以互相访问：

- `common-h5` 可以通过 `http://common-web:3001` 访问 `common-web`
- `common-web` 可以通过 `http://common-h5:3000` 访问 `common-h5`

---

## 添加其他服务

如果需要添加数据库、Redis 等服务，可以在 `docker-compose.yml` 中添加：

```yaml
services:
  # ... 现有服务

  postgres:
    image: postgres:15-alpine
    container_name: postgres
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:
```

---

## 生产环境部署

### 1. 构建镜像

```bash
docker-compose build
```

### 2. 推送到镜像仓库（可选）

```bash
# 打标签
docker tag common-h5:latest your-registry/common-h5:latest
docker tag common-web:latest your-registry/common-web:latest

# 推送
docker push your-registry/common-h5:latest
docker push your-registry/common-web:latest
```

### 3. 在服务器上部署

```bash
# 拉取代码
git clone <your-repo>
cd all-in-one

# 启动所有服务
docker-compose up -d
```

---

## 使用 Nginx 反向代理

如果需要使用域名访问，可以添加 Nginx 服务：

```yaml
services:
  # ... 现有服务

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - common-h5
      - common-web
    networks:
      - app-network
    restart: unless-stopped
```

创建 `nginx.conf`：

```nginx
events {
    worker_connections 1024;
}

http {
    upstream h5 {
        server common-h5:3000;
    }

    upstream web {
        server common-web:3001;
    }

    # common_h5 服务
    server {
        listen 80;
        server_name h5.example.com;

        location / {
            proxy_pass http://h5;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # common_web 服务
    server {
        listen 80;
        server_name web.example.com;

        location / {
            proxy_pass http://web;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

---

## 更新应用

当代码更新后：

```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建并启动所有服务
docker-compose up -d --build

# 3. 或者只更新某个服务
docker-compose up -d --build common-h5
```

---

## 故障排查

### 查看服务日志

```bash
# 查看所有日志
docker-compose logs

# 查看特定服务日志
docker-compose logs common-h5
docker-compose logs common-web
```

### 检查服务状态

```bash
docker-compose ps
```

### 检查健康状态

```bash
docker inspect --format='{{.State.Health.Status}}' common-h5
docker inspect --format='{{.State.Health.Status}}' common-web
```

### 进入容器调试

```bash
docker-compose exec common-h5 sh
docker-compose exec common-web sh
```

---

## 资源限制

每个服务默认配置：
- CPU 限制：1 核
- 内存限制：1GB
- CPU 保留：0.5 核
- 内存保留：512MB

可以根据实际需求在 `docker-compose.yml` 中调整。

---

## 总结

使用统一的 Docker Compose 配置的优势：

- ✅ 一键启动/停止所有服务
- ✅ 配置集中管理
- ✅ 服务间网络互通
- ✅ 易于扩展（添加数据库、缓存等）
- ✅ 便于 CI/CD 集成
- ✅ 环境隔离

现在你可以使用 `docker-compose up -d` 同时启动两个服务了！
