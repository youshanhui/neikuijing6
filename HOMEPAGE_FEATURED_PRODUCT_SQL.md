---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022035981f5f1d8d64fd6df6d9118931b7ad187d302f6cf9fd2f8828f4646d7a7076022100d9f25216af9ae26e908798818dea6d1d9fd576ac060ba852721c95d89baf654e
    ReservedCode2: 3046022100dee9bfd9ee5285b87e29f14a322b9ddb560446834d69b952ed3ad293c00bba60022100916b42c3f8d6a694549af7b9948cadcea4399c8efc1210cb1ab4d2df2fbc751e
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
