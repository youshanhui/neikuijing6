// 检查 homepage_featured 表是否存在
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
  console.log('检查 homepage_featured 表...\n');

  try {
    // 尝试查询表
    const { data, error } = await supabase
      .from('homepage_featured')
      .select('*')
      .limit(5);

    if (error) {
      console.log('❌ 表不存在或查询失败:');
      console.log('错误信息:', error.message);
      console.log('\n请在 Supabase SQL Editor 中执行以下 SQL 来创建表:\n');
      console.log(`
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
      `);
    } else {
      console.log('✅ 表存在!');
      console.log('当前数据:', data);

      if (data.length === 0) {
        console.log('\n⚠️ 表存在但没有数据。请在后台添加精选产品。');
      }
    }
  } catch (err) {
    console.log('❌ 连接失败:', err.message);
  }
}

checkTable();
