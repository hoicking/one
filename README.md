## all-in-one

一个基于 Turborepo + pnpm 的多包管理（Monorepo）项目脚手架，用于集中管理多个前端 / 后端 / 工具包。

### 特性

- **Monorepo 管理**：使用 `pnpm-workspace` 与 `turbo` 管理多个子项目与共享包。
- **统一脚本**：在根目录集中运行构建、测试、Lint 等命令。
- **可扩展性强**：方便逐步增加应用（如 web、admin、server、libs 等）。

### 目录结构（规划中）

- **apps/**：放置具体应用（如 `web`、`admin`、`server` 等）。
- **packages/**：放置可复用的业务组件、工具库、UI 库等。
- **configs/**（可选）：集中存放 ESLint、Prettier、TSConfig 等通用配置。

### 安装与运行

#### 安装依赖

```bash
pnpm install
```

#### 启动开发服务器

**启动单个子项目：**

```bash
# 启动 common_h5
pnpm dev:h5
# 或使用 pnpm filter
pnpm --filter common_h5 dev

# 启动 common_web
pnpm dev:web
# 或使用 pnpm filter
pnpm --filter common_web dev
```

**启动所有子项目：**

```bash
pnpm dev
# 或
pnpm turbo run dev
```

#### 构建项目

**构建所有项目：**

```bash
pnpm build
# 或
pnpm turbo run build
```

**构建单个项目：**

```bash
pnpm turbo run build --filter=common_h5
```

#### 代码检查

**检查所有项目：**

```bash
pnpm lint
# 或
pnpm turbo run lint
```

**检查单个项目：**

```bash
pnpm lint --filter common_h5
```

> 更多脚本请查看根目录 `package.json` 中的 `scripts` 与 `turbo.json` 配置。

### ESLint 配置流程

本项目使用统一的 ESLint 配置，通过 `packages/eslint-config` 集中管理，各子项目继承该配置。

#### 1. 共享配置（packages/eslint-config）

在 `packages/eslint-config/index.js` 中定义统一的 ESLint 规则：

```js
// eslint-config-next v16 直接导出的是一个配置数组（CommonJS）
const next = require('eslint-config-next');

module.exports = [
  ...next,
  {
    rules: {
      // 自定义规则
      "no-console": "warn",
    },
  },
];
```

#### 2. 子项目继承配置

在子项目的 `eslint.config.mjs` 中引入共享配置：

```js
import { defineConfig } from "eslint/config";
import baseConfig from "@all-in-one/eslint-config";

export default defineConfig([
  ...baseConfig,
  // 子项目可以在这里添加额外的规则覆盖
]);
```

#### 3. 添加依赖

在子项目的 `package.json` 中添加 workspace 依赖：

```json
{
  "devDependencies": {
    "@all-in-one/eslint-config": "workspace:*"
  }
}
```

#### 4. 安装依赖

在根目录执行安装，让 pnpm 链接 workspace 包：

```bash
pnpm install
```

#### 5. 验证配置

在子项目中运行 lint 命令验证配置是否生效：

```bash
# 从根目录运行
pnpm lint --filter <子项目名>

# 或进入子项目目录运行
cd apps/h5/common_h5
pnpm lint
```

如果配置生效，代码中的 `console.log` 等会触发相应的 ESLint 规则警告或错误。

#### 注意事项

- 确保 `pnpm-workspace.yaml` 中正确配置了 `apps/**` 以匹配多级子目录
- 修改 `packages/eslint-config` 后，需要在根目录重新运行 `pnpm install` 使更改生效
- 子项目可以通过在 `eslint.config.mjs` 中添加额外规则来覆盖或扩展共享配置

### Monorepo 子项目文件清理

在 monorepo 架构中，子项目（`apps/*` 和 `packages/*`）应该移除以下文件，统一由根目录管理：

#### 应移除的文件列表

1. **`.gitignore`**
   - **原因**：monorepo 使用根目录的 `.gitignore` 统一管理所有忽略规则，避免配置冲突和重复维护

2. **`pnpm-lock.yaml`**
   - **原因**：monorepo 只需要根目录的 `pnpm-lock.yaml` 来锁定所有依赖版本，子项目的 lock 文件会导致依赖版本不一致

3. **`pnpm-workspace.yaml`**
   - **原因**：workspace 配置只在根目录定义一次即可，子项目不需要此文件

4. **`README.md`**（如果是脚手架自动生成的模板）
   - **原因**：Next.js 等脚手架生成的默认 README 通常包含通用的启动说明，在 monorepo 中应该使用项目特定的文档或统一在根目录 README 中说明

5. **`public/` 下的示例文件**（如 `file.svg`、`globe.svg`、`next.svg`、`vercel.svg`、`window.svg`）
   - **原因**：这些是 Next.js 脚手架自动生成的示例文件，实际项目中通常不需要，应该根据业务需求添加自己的静态资源

#### 清理示例

以 `apps/web/common_web` 和 `apps/h5/common_h5` 为例，已移除的文件：

**apps/web/common_web/**
```
├── .gitignore          ❌ 已移除（使用根目录统一配置）
├── pnpm-lock.yaml      ❌ 已移除（使用根目录统一 lock）
├── pnpm-workspace.yaml ❌ 已移除（workspace 配置在根目录）
├── README.md           ❌ 已移除（Next.js 模板文档）
└── public/
    ├── file.svg        ❌ 已移除（示例文件）
    ├── globe.svg       ❌ 已移除（示例文件）
    ├── next.svg        ❌ 已移除（示例文件）
    ├── vercel.svg      ❌ 已移除（示例文件）
    └── window.svg      ❌ 已移除（示例文件）
```

**apps/h5/common_h5/**
```
├── README.md           ❌ 已移除（Next.js 模板文档）
└── public/
    ├── file.svg        ❌ 已移除（示例文件）
    ├── globe.svg       ❌ 已移除（示例文件）
    ├── next.svg        ❌ 已移除（示例文件）
    ├── vercel.svg      ❌ 已移除（示例文件）
    └── window.svg      ❌ 已移除（示例文件）
```

> 注意：不同子项目可能包含的文件不同，请根据实际情况检查并移除上述文件。

#### 注意事项

- 如果子项目有特定的 `.gitignore` 规则需求，应该在根目录的 `.gitignore` 中使用路径前缀（如 `apps/web/common_web/.next/`）来指定
- 删除子项目的 `pnpm-lock.yaml` 后，确保在根目录运行 `pnpm install` 重新生成统一的 lock 文件
- 如果子项目需要独立的文档，建议创建项目特定的 README，而不是使用脚手架生成的模板

### 待办任务（TODO）

- **项目结构**
  - [ ] 在 `apps/` 下创建至少一个前端应用（如 `apps/web`）。
  - [ ] 在 `packages/` 下创建一个共享工具库（如 `packages/utils`）。
  - [ ] 为各子项目添加统一的 TypeScript / ESLint / Prettier 配置。

- **工程化**
  - [ ] 在 `turbo.json` 中补充构建、测试、Lint 的 pipeline。
  - [ ] 在根目录配置基础的 CI（如 GitHub Actions / GitLab CI 等）。
  - [ ] 增加 `commitlint` / `lint-staged` 等规范化工具（可选）。

- **文档**
  - [ ] 为每个 `app` 与 `package` 单独写 README，说明用途与使用方式。
  - [ ] 在根 README 中补充技术栈说明（React / Vue / Node / Nest 等）。
  - [ ] 记录常用开发命令与约定（代码风格、分支策略等）。



### 贡献与开发约定（可根据团队需要修改）

- **分支策略**：建议使用 `main` + feature 分支的方式进行开发。
- **提交信息**：推荐使用约定式提交（Conventional Commits），如 `feat: xxx`、`fix: yyy`。
- **代码风格**：统一使用 Prettier + ESLint 约束代码风格。

---

后续可以根据实际子项目与技术栈，对上述内容进行细化与补充。
