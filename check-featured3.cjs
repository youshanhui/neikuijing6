// 检查精选产品图片
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFeatured() {
  console.log('检查精选产品数据...\n');

  try {
    const { data, error } = await supabase
      .from('homepage_featured')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .limit(1);

    if (error) {
      console.log('❌ 查询失败:', error.message);
      return;
    }

    console.log('查询结果:');
    console.log(JSON.stringify(data, null, 2));

    if (data && data.length > 0) {
      const item = data[0];
      console.log('\n第一条精选产品:');
      console.log('- ID:', item.id);
      console.log('- Title:', item.title);
      console.log('- Image URL:', item.image_url || '(空)');
      console.log('- Product ID:', item.product_id);
    }
  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkFeatured();
