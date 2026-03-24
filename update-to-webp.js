import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateToWebP() {
  console.log('更新产品图片为WebP格式...\n');

  // 获取所有产品
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('获取产品失败:', error);
    return;
  }

  let successCount = 0;

  for (const product of products) {
    if (product.image && product.image.endsWith('.png')) {
      const newImage = product.image.replace('.png', '.webp');
      const { error: updateError } = await supabase
        .from('products')
        .update({ image: newImage })
        .eq('id', product.id);

      if (!updateError) {
        console.log(`✅ ${product.name}: ${product.image} → ${newImage}`);
        successCount++;
      }
    }
  }

  console.log(`\n更新完成: ${successCount} 个产品`);
}

updateToWebP().catch(console.error);
