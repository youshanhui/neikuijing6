// 修复数据库表结构和权限
// 请在 Supabase SQL Editor 中执行以下 SQL

const FIX_SQL = `
-- =============================================
-- 1. 确保 products 表有所有必要的列
-- =============================================
ALTER TABLE products ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'Camera';
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- =============================================
-- 2. 禁用 products 表的 RLS（临时解决方案，让所有人都可以读写）
-- =============================================
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- =============================================
-- 3. 确保 images 存储桶存在且公开
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- =============================================
-- 4. 确保 images 存储桶有公开访问策略
-- =============================================
DROP POLICY IF EXISTS "Allow public access to images" ON storage.objects;
CREATE POLICY "Allow public access to images" ON storage.objects
  FOR ALL USING (bucket_id = 'images') WITH CHECK (true);

-- =============================================
-- 5. 确保 videos 存储桶存在且公开
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Allow public access to videos" ON storage.objects;
CREATE POLICY "Allow public access to videos" ON storage.objects
  FOR ALL USING (bucket_id = 'videos') WITH CHECK (true);

-- =============================================
-- 6. 查看 products 表结构
-- =============================================
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products';

-- =============================================
-- 7. 查看现有产品数据
-- =============================================
SELECT id, name, category, image_url FROM products LIMIT 10;
`;

console.log('请在 Supabase SQL Editor 中执行以下 SQL 来修复数据库问题：\n');
console.log(FIX_SQL);
console.log('\n\n========================================');
console.log('执行完上述 SQL 后，请刷新后台页面并重试。');
console.log('========================================');
