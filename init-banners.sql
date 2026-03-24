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

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active);
CREATE INDEX IF NOT EXISTS idx_banners_sort_order ON banners(sort_order);

-- Insert sample banners
INSERT INTO banners (title, subtitle, description, image_url, link_url, button_text, sort_order, active)
VALUES
  ('专业医疗器械制造商', '创新科技 · 守护健康', '我们致力于为全球医疗机构提供高品质的诊断设备、治疗设备和手术器械，让科技造福人类健康。', '', '/products', '了解更多', 1, true),
  ('20年行业经验', '品质保障 · 服务全球', '产品通过FDA、CE、ISO等国际认证，服务全球50多个国家和地区，赢得广泛信赖。', '', '/about', '关于我们', 2, true),
  ('新品上市', '内镜系统全面升级', '最新一代高清内镜诊断系统，带来更清晰的成像效果和更精准的诊断能力。', '', '/products', '查看产品', 3, true)
ON CONFLICT DO NOTHING;
