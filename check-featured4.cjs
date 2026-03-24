// 检查产品表和产品图片
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  console.log('检查产品表结构...\n');

  try {
    // 获取第一条产品的所有字段
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.log('❌ 查询失败:', error.message);
      return;
    }

    console.log('产品 ID=1 的所有字段:');
    console.log(JSON.stringify(data, null, 2));

    // 检查是否有图片相关字段
    const keys = Object.keys(data);
    console.log('\n所有字段名:', keys.join(', '));

    // 查找可能包含图片的字段
    const imageFields = keys.filter(k => k.toLowerCase().includes('image') || k.toLowerCase().includes('img') || k.toLowerCase().includes('photo'));
    console.log('图片相关字段:', imageFields.join(', ') || '无');

  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkProducts();
