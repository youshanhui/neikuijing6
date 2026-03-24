---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402206838fe99f03c4c571deba6152771274b02d6012c42f3ef4ab1caacc5b022e3b1022079f54a4a7ae396a98fc269ef2a0642b1c7e19acee85519c615fce6cbd6dfe166
    ReservedCode2: 3046022100bdc0ca50ad42f795b090e8bc0081fbbae6296d55dc6f84aeacf890c6a00ac6d50221008434e603ad9d0f06ce963ee2eddfaf679ae33f74252d87951a262135a48e7e6d
---

# 轮播图表设置说明

## 问题诊断

轮播图不显示的可能原因：

1. **数据库中缺少 banners 表**
2. **RLS 策略阻止了数据访问**
3. **轮播图未设置为激活状态**

## 解决方案

### 方法一：在 Supabase Dashboard 中执行 SQL（推荐）

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目：`nawfbpigrewriunvzqbn`
3. 进入 **SQL Editor**
4. 点击 **New Query**
5. 粘贴以下 SQL 并执行：

```sql
-- Create banners table if it doesn't exist
CREATE TABLE IF NOT EXISTS banners (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  mobile_image_url TEXT,
  link_url TEXT,
  button_text TEXT DEFAULT '了解更多',
  sort_order INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to banners"
ON banners
FOR SELECT
TO anon
USING (true);

-- Create policy to allow authenticated insert/update/delete
CREATE POLICY "Allow authenticated modifications"
ON banners
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active);
CREATE INDEX IF NOT EXISTS idx_banners_sort_order ON banners(sort_order);
```

6. （可选）插入示例数据：

```sql
-- Insert sample banners
INSERT INTO banners (title, subtitle, description, image_url, link_url, button_text, sort_order, active)
VALUES
  ('专业医疗器械制造商', '创新科技 · 守护健康', '我们致力于为全球医疗机构提供高品质的诊断设备、治疗设备和手术器械，让科技造福人类健康。', '', '/products', '了解更多', 1, true),
  ('20年行业经验', '品质保障 · 服务全球', '产品通过FDA、CE、ISO等国际认证，服务全球50多个国家和地区，赢得广泛信赖。', '', '/about', '关于我们', 2, true),
  ('新品上市', '内镜系统全面升级', '最新一代高清内镜诊断系统，带来更清晰的成像效果和更精准的诊断能力。', '', '/products', '查看产品', 3, true);
```

### 方法二：检查现有表结构

如果 banners 表已存在，可以检查其结构：

```sql
-- 查看表结构
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'banners';

-- 查看现有数据
SELECT * FROM banners;
```

### 方法三：在后台添加轮播图

1. 访问 `/admin` 登录后台
2. 点击 "首页轮播图"
3. 点击 "添加轮播图"
4. 填写内容并保存
5. 确保点击"启用"复选框

## 验证步骤

1. 打开浏览器开发者工具（F12）
2. 切换到 Console 标签
3. 刷新网站首页
4. 查看是否有 "Loaded banners:" 的日志输出
5. 如果有数据，说明表已存在且配置正确

## 常见错误

### Error: relation "banners" does not exist
**解决方案**：执行上面的 CREATE TABLE SQL

### Error: permission denied
**解决方案**：检查 RLS 策略，确保创建了 public read 策略

### Error: column "description" does not exist
**解决方案**：执行 ALTER TABLE 添加缺失的列
```sql
ALTER TABLE banners ADD COLUMN IF NOT EXISTS description TEXT;
```

## 后续维护

- 添加新轮播图：在后台管理界面操作
- 修改轮播图：点击编辑按钮
- 删除轮播图：点击删除按钮
- 调整顺序：修改排序数字
- 禁用轮播图：取消"启用"复选框
