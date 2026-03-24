import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('检查products表结构...\n');

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);

  if (error) {
    console.error('获取表结构失败:', error);
    return;
  }

  console.log('现有产品字段:');
  if (data && data.length > 0) {
    Object.keys(data[0]).forEach(key => {
      console.log(`  - ${key}: ${typeof data[0][key]}`);
    });
  }

  console.log('\n现有产品数据:');
  const { data: allProducts } = await supabase
    .from('products')
    .select('*');

  if (allProducts) {
    allProducts.forEach(p => {
      console.log(`  - ${p.name} (${p.model || '无型号'})`);
    });
  }
}

checkSchema().catch(console.error);
