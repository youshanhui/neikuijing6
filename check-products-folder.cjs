const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProductsFolder() {
  console.log('=== 检查 images/products 文件夹 ===\n');

  // List files in 'images/products' folder
  const { data: files, error: filesError } = await supabase.storage
    .from('images')
    .list('products', { limit: 100 });

  if (filesError) {
    console.error('列出文件错误:', filesError);
  } else if (files && files.length > 0) {
    console.log(`找到 ${files.length} 个文件:\n`);
    files.forEach(f => {
      const url = supabase.storage.from('images').getPublicUrl(`products/${f.name}`);
      console.log(`  - ${f.name}`);
      console.log(`    URL: ${url.data.publicUrl}`);
    });
  } else {
    console.log('  products文件夹为空或不存在\n');
  }
}

checkProductsFolder().catch(console.error);
