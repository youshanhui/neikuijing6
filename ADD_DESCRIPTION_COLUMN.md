---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100ac279efa4ea2aa7110435d4b5b37d20b584bba67ee84da61f516f38445721e68022005dd3135d80abd9915eccfb56257e6b7cdb91ffe1556209797fa2bde4833cd1f
    ReservedCode2: 304402205fe329f2bc29b7d6578cbf0c64444a2e153b730966a37630414a085c936ef63402202ffe0a4b6a134b1b197c165b5129848b88558511b4419cc37f8b364c294d3ea1
---

# 添加缺失的 description 列

请在 Supabase SQL Editor 中执行以下 SQL：

```sql
-- 添加缺失的 description 列
ALTER TABLE banners ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
```

## 如果还有其他列缺失，请执行完整修复：

```sql
-- 确保所有必要的列都存在
ALTER TABLE banners ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS mobile_image_url TEXT DEFAULT '';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS link_url TEXT DEFAULT '';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS button_text TEXT DEFAULT '了解更多';
```

## 完整重建表结构（如果上述命令失败）：

```sql
-- 备份现有数据
CREATE TABLE IF NOT EXISTS banners_backup AS SELECT * FROM banners;

-- 删除并重建表
DROP TABLE IF EXISTS banners;

CREATE TABLE banners (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  description TEXT DEFAULT '',
  image_url TEXT,
  mobile_image_url TEXT,
  link_url TEXT,
  button_text TEXT DEFAULT '了解更多',
  sort_order INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用安全策略
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to banners"
ON banners FOR SELECT TO anon USING (true);

CREATE POLICY "Allow authenticated modifications"
ON banners FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 恢复数据（如果成功）
INSERT INTO banners (title, subtitle, image_url, sort_order, active)
SELECT title, subtitle, image_url, sort_order, active FROM banners_backup;

DROP TABLE IF EXISTS banners_backup;
```

执行完 SQL 后，请重新在后台保存轮播图即可。
