# 多阶段构建 Dockerfile for common_h5
# 使用方式: docker build -f apps/h5/common_h5/Dockerfile -t common-h5:latest .

# ==================== 阶段 1: 依赖安装 ====================
FROM node:20-alpine AS deps

# 安装 pnpm
RUN npm install -g pnpm@10.28.0

WORKDIR /app

# 复制根目录的依赖管理文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# 复制 packages 的 package.json（common_h5 依赖 @all-in-one/eslint-config）
COPY packages/eslint-config/package.json ./packages/eslint-config/
# 如果 tailwind-config 被使用，也需要复制
COPY packages/tailwind-config/package.json ./packages/tailwind-config/

# 只复制 common_h5 的 package.json（不需要 common_web）
COPY apps/h5/common_h5/package.json ./apps/h5/common_h5/

# 安装依赖（使用 frozen-lockfile 确保版本一致）
# 使用 --shamefully-hoist 避免符号链接问题，这在 Windows Docker 上很重要
RUN pnpm install --frozen-lockfile --shamefully-hoist

# ==================== 阶段 2: 构建应用 ====================
FROM node:20-alpine AS builder

RUN npm install -g pnpm@10.28.0

WORKDIR /app

# 从 deps 阶段复制整个安装好的依赖
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=deps /app/turbo.json ./turbo.json

# 复制 packages 源代码（common_h5 需要 @all-in-one/eslint-config）
COPY packages ./packages
# 只复制 common_h5 的源代码（不需要 common_web）
COPY apps/h5/common_h5 ./apps/h5/common_h5

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "test" ]; then \
      cp apps/h5/common_h5/.env.test apps/h5/common_h5/.env.production.local; \
    elif [ "$NODE_ENV" = "development" ]; then \
      cp apps/h5/common_h5/.env.development apps/h5/common_h5/.env.production.local; \
    elif [ "$NODE_ENV" = "production" ]; then \
      cp apps/h5/common_h5/.env.production apps/h5/common_h5/.env.production.local; \
    fi
# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1

# 构建 common_h5
RUN pnpm turbo run build --filter=common_h5

# ==================== 阶段 3: 生产运行 ====================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 从 builder 阶段复制 standalone 输出
COPY --from=builder --chown=nextjs:nodejs /app/apps/h5/common_h5/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/h5/common_h5/.next/static ./apps/h5/common_h5/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/h5/common_h5/public ./apps/h5/common_h5/public

USER nextjs

EXPOSE 7998

ENV PORT=7998
ENV HOSTNAME="0.0.0.0"

# 启动应用
CMD ["node", "apps/h5/common_h5/server.js"]