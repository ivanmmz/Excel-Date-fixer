# Excel Date Fixer Pro (Excel 日期与数据修复大师)

一款基于 **Tauri 2 + Vite + Tailwind CSS + ExcelJS** 构建的高性能现代桌面与 Web 双模工具，专为自动整理、补全、规范化和格式化带有日期/时间戳的 Excel 和 CSV 数据集而设计。

本工具采用了 Material Design 3 现代暗色主题与 Mica 半透明磨砂玻璃效果，并配备了动态数据预览表格和实时系统日志面板，方便用户跟踪数据流水线的处理进度。

---

## 📸 软件界面与运行截图

### 1. 软件初始主界面
简洁美观的 Material Design 3 界面，上方为可开关的任务处理卡片，左下角为操作区，右下角为日志面板：
![初始界面](docs/images/initial_dashboard.png)

### 2. 导入数据及原始预览
当导入 CSV 或 Excel 文件（如 `Sep_2025.csv`）时，预览表格将实时呈现原始数据的表头及首部行数据，且文件队列显示文件就绪状态：
![导入数据预览](docs/images/imported_data.png)

### 3. 执行流水线及成功状态
点击 **RUN PIPELINE** 运行后，系统将自动执行勾选的修复任务，在日志区域实时输出操作日志。处理成功后，预览区域切换为带有绿色 `PROCESSED PREVIEW` 徽标的修复后预览数据，并允许用户导出：
![处理成功预览](docs/images/processed_data.png)

---

## 🚀 核心功能特性

Excel Date Fixer Pro 提供了一个多任务顺序处理的流水线（Pipeline），以批量清洗您的时序数据集：

1. **日期格式校正 (Date Format Correction)** (`date_format`)
   - 智能识别并纠正日/月颠倒（例如 DD/MM 与 MM/DD）的歧义数据。
   - 自动纠正日期分隔符，将英文句号 `.` 或减号 `-` 统一规范化为 Excel 标准的斜杠 `/`。
   - 自动提取时间组件，确保秒级精度的对齐。

2. **缺失数据前向填充 (Gap Fill / Forward Fill)** (`fix_missing`)
   - 自动扫描数值列中的空缺值（Null/Empty/""）。
   - 按指定的“阈值（Threshold）”自动进行前向填充（用前一个有效值覆盖，支持自定义最大连续填充行数，如 20 行）。
   - 日期列与时间列受到保护，避免填充覆盖，保证时间轴的绝对准确性。

3. **1440分钟标准化 (1440 Minute-by-Minute Standardization)** (`standard_1440`)
   - 将记录按日历天（Calendar Day）进行分组。
   - 对同分钟内的重复记录进行去重，保留每分钟的首条观察数据。
   - 对不足 1440 行（即一天有缺失的分钟）的天数进行末尾补全，自动复制最后一分钟的数据，以保证每一天恰好拥有 1440 行记录。
   - 广泛适用于电力负荷分析、气象监测、太阳能/风能发电建模等需要分钟级完整时序数据的场景。

4. **日期转数值 (Date → Val)** (`date_to_value`)
   - 将 Date 和 Time 格式单元格全部转换为 Excel 的原始序列数（即自 1899-12-30 起的天数，时间表现为天数小数）。
   - 适合将清洗后的数据直接对接科学计算引擎或 Excel 高级透视分析。

5. **智能单元格格式与时间公式** (自动执行)
   - 在导出时自动将 JS Date 类型转换为原生的 Excel 日期格式，并应用如 `DD/MM/YYYY` 的自定义单元格格式。
   - 将文本时间转换为 Excel 原生的 `=TIME(hour, minute, second)` 公式，避免导出为死文本，保留 Excel 的内置时间计算和运算功能。

---

## 🛠️ 以 `Sep_2025.csv` 为例的演练步骤

您可以导入包含时序负荷数据的 `C:\Users\Ivan\Desktop\Sep_2025.csv` 进行测试：

1. **导入文件**：点击左下角的 **`+ Add File`** 按钮并选择 `Sep_2025.csv`，或者直接将文件拖拽到应用程序窗口中。
2. **预览原始数据**：加载后，动态表格会展示出表头（`Date`, `Time`, `CH1_KW` 等）和包含空缺时间的原始负荷数据。
3. **配置处理参数**：
   - 在 **Date Format** 输入框中填入目标日期格式 `DD/MM/YYYY`。
   - 在 **Time Format** 输入框中填入目标时间格式 `HH:mm:ss`。
   - 在 **Threshold (Val)** 栏中填入缺失填充阈值（如 `20`）。
   - 确认激活了需要的任务卡片（点击卡片即可切换激活状态，激活后卡片右上角会显示绿色勾选标志）。
4. **运行流水线**：点击 **`RUN PIPELINE`** 按钮。
   - 状态栏将变为 `PROCESSING...`，进度条开始流动。
   - **SYSTEM LOGS** 日志控制台会同步打印出具体操作日志（如读取文件、在 A 列应用日期格式规范化、在数值列进行缺失值填充、对全天数据补全至 1440 行等）。
5. **数据导出**：
   - 运行完成后，状态栏将显示 `READY TO EXPORT`，且预览徽标切换为绿色的 `PROCESSED PREVIEW`。
   - 点击 **`Export / Save As (另存为/导出)`**，可将修复后的结果保存为规范的 `.xlsx` Excel 表格。

---

## 🖥️ 本地运行与构建

### 开发环境准备
* 安装 **Node.js** v18+ (推荐 LTS 版本)
* 安装 **Rust** 工具链（如需编译 Tauri 桌面客户端）

### 安装依赖
在 Windows 系统下直接双击运行：
```cmd
./requirement.win.cmd
```
在 macOS/Linux 系统下运行：
```bash
chmod +x requirement.mac.sh && ./requirement.mac.sh
```
或者手动执行 npm 安装：
```bash
npm install
```

### 启动开发服务器
启动带热重载的 Tauri 桌面应用程序开发模式：
```bash
npm run dev:tauri
```
如果只需在普通网页浏览器中预览运行：
```bash
npm run dev
```
然后在浏览器中打开服务地址 [http://localhost:5173](http://localhost:5173)。

### 编译打包
如需打包为独立的 `.exe` 可执行安装程序：
```bash
npm run build:tauri
```
打包输出的可执行文件将会保存在 `src-tauri/target/release/bundle/` 目录下。

---

## 📁 项目目录结构

```
excel-date-fixer/
├── index.html                  # 应用程序主 UI 界面
├── src/
│   ├── style.css               # 主题样式与 Mica Translucency 磨砂材质效果定义
│   ├── dataProcessor.js        # 核心数据清洗、日期修正与标准化算法
│   └── main.js                 # UI 交互、队列管理与 Tauri 接口调用
├── docs/
│   └── images/                 # 文档配套演示截图
├── src-tauri/
│   ├── Cargo.toml              # Rust 依赖项配置文件
│   ├── tauri.conf.json         # Tauri 客户端参数设置
│   └── src/main.rs             # Tauri Rust 主入口
├── package.json                # npm 脚本与包依赖配置
└── vite.config.js              # Vite 热重载与构建配置
```

---

## License
本项目采用 MIT 许可协议开源 - 详情请参阅 [LICENSE](LICENSE) 文件。

## Contributing
欢迎提交贡献！请随时提交 Pull Request。
提交 Pull Request 即表示您同意在相同的 [MIT 许可协议](LICENSE) 下授权您的贡献。

---

## 支持与赞助 (Buy Me a Coffee)
如果您觉得 Excel Date Fixer Pro 帮您节省了时间、解决了数据修复难题，欢迎请开发者喝杯咖啡，支持持续的开发和维护！☕

![请喝咖啡](docs/images/一杯咖啡.JPG)
