import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndCreateNewsTable() {
  console.log('🔍 检查 news 表结构...\n');

  try {
    // 检查表是否存在
    const { data: tableInfo, error: tableError } = await supabase
      .from('news')
      .select('*')
      .limit(1);

    if (tableError) {
      console.log('❌ news 表不存在或出错:', tableError.message);
      console.log('\n请在 Supabase 后台执行以下 SQL 创建表：\n');

      const createTableSQL = `
-- 创建 news 表
CREATE TABLE IF NOT EXISTS public.news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT '行业动态',
  short_description TEXT,
  content TEXT,
  author TEXT DEFAULT '上海世音内窥镜',
  image_url TEXT DEFAULT '',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 启用 RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 允许公开读取
CREATE POLICY "Allow public read access\" ON public.news FOR SELECT USING (true);

-- 允许公开插入
CREATE POLICY "Allow public insert\" ON public.news FOR INSERT WITH CHECK (true);

-- 允许公开更新
CREATE POLICY "Allow public update\" ON public.news FOR UPDATE USING (true);

-- 允许公开删除
CREATE POLICY "Allow public delete\" ON public.news FOR DELETE USING (true);
      `;

      console.log(createTableSQL);
      return false;
    } else {
      console.log('✅ news 表已存在');
      return true;
    }
  } catch (err) {
    console.error('❌ 检查失败:', err);
    return false;
  }
}

checkAndCreateNewsTable();
