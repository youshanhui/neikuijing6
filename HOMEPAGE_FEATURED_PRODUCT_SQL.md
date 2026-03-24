---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100de88df74678287784c0167c7d9e671db32ef165086378f8ec61acde37c8e0e2c022100b748668c8e4a6e996fd75a6f18a1b92050c15db15a38e1c8f04162a146287760
    ReservedCode2: 3046022100fb0eab75f7815a931f7230d1ceb636721d0d4bd8b2f148e2d20aa6dd1e54a575022100c106a36896aac521053c10083daaa3608ba99b1fcbee255dc2261fe21347344f
---

# 首页精选产品数据库设置

请在 Supabase SQL Editor 中执行以下 SQL 来创建首页精选产品表：

```sql
-- 创建首页精选产品表
CREATE TABLE IF NOT EXISTS homepage_featured (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  title TEXT DEFAULT '',
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  link_url TEXT DEFAULT '',
  button_text TEXT DEFAULT '了解更多',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 RLS
ALTER TABLE homepage_featured ENABLE ROW LEVEL SECURITY;

-- 允许公开读取
CREATE POLICY "Allow public read access to homepage_featured"
ON homepage_featured FOR SELECT TO anon USING (true);

-- 允许公开插入
CREATE POLICY "Allow public insert access to homepage_featured"
ON homepage_featured FOR INSERT TO anon WITH CHECK (true);

-- 允许公开更新
CREATE POLICY "Allow public update access to homepage_featured"
ON homepage_featured FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- 允许公开删除
CREATE POLICY "Allow public delete access to homepage_featured"
ON homepage_featured FOR DELETE TO anon USING (true);

-- 插入一条默认数据
INSERT INTO homepage_featured (title, subtitle, description, active, sort_order)
VALUES ('首页精选产品', '精选推荐', '展示在首页的精选产品', true, 1)
ON CONFLICT DO NOTHING;
```

## 表结构说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGSERIAL | 主键 |
| product_id | INTEGER | 关联的产品ID（可选） |
| title | TEXT | 标题 |
| subtitle | TEXT | 副标题 |
| description | TEXT | 描述文本 |
| image_url | TEXT | 图片URL |
| link_url | TEXT | 链接地址 |
| button_text | TEXT | 按钮文字 |
| active | BOOLEAN | 是否启用 |
| sort_order | INTEGER | 排序顺序 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 使用说明

1. 执行上述 SQL 创建表
2. 在后台管理系统中可以管理首页精选产品
3. 可以在"关联产品"字段中选择一个产品，或只使用自定义标题/图片
