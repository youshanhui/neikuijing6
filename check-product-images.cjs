const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  console.log('=== 检查产品图片数据 ===\n');

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, image')
    .order('id');

  if (error) {
    console.error('查询错误:', error);
    return;
  }

  console.log(`找到 ${products.length} 个产品:\n`);

  products.forEach((p, i) => {
    console.log(`${i + 1}. ID: ${p.id}`);
    console.log(`   名称: ${p.name}`);
    console.log(`   图片: ${p.image || '(无图片)'}`);
    console.log('---');
  });
}

checkProducts().catch(console.error);
