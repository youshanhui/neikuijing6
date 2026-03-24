/**
 * 新闻表重建脚本
 *
 * 由于 Supabase 的 news 表缺少 short_description 列，需要重建表结构
 *
 * 请在 Supabase Dashboard -> SQL Editor 中执行以下 SQL：
 */

// 步骤1: 删除旧表（如果存在）
DROP TABLE IF EXISTS public.news;

// 步骤2: 创建新表
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

// 步骤3: 启用 RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

// 步骤4: 创建 RLS 策略
CREATE POLICY "Allow public read access\" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow public insert\" ON public.news FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update\" ON public.news FOR UPDATE USING (true);
CREATE POLICY "Allow public delete\" ON public.news FOR DELETE USING (true);

console.log('✅ 表结构重建完成！');
