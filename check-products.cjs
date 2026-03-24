// 检查产品表
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  console.log('检查产品表中 ID=1 的产品图片...\n');

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, image_url')
      .eq('id', 1)
      .single();

    if (error) {
      console.log('❌ 查询失败:', error.message);
    } else {
      console.log('产品信息:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.log('❌ 连接失败:', err.message);
  }
}

checkProducts();
