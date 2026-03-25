---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022038c60dc140128ac973502838eed7fab4539771b42bb7fa0b7fd65cddc0b05848022100ff927f668548ce8eff5d1c5fa6bd471e7bdd06c10d158c8427fc72b5eb778081
    ReservedCode2: 30460221008ab220412962d323c637d481f313e61fa7e9b6c827ffe74fb5ee8877eb22767f022100e8212fd6bb2be92600ade624d886a49504d6563df2353f3006cefc24476be928
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
