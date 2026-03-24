const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  console.log('检查数据库产品数据...\n');

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(10);

    if (error) {
      console.log('❌ 查询失败:', error.message);
      return;
    }

    console.log('产品数据:');
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkProducts();
