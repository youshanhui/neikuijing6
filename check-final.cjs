// 检查精选产品及其关联产品
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFeatured() {
  console.log('检查精选产品及其关联产品...\n');

  try {
    // 获取第一条启用的精选产品
    const { data, error } = await supabase
      .from('homepage_featured')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .limit(1);

    if (error) {
      console.log('❌ 查询精选产品失败:', error.message);
      return;
    }

    console.log('精选产品数据:');
    console.log(JSON.stringify(data, null, 2));

    if (data && data.length > 0) {
      const featured = data[0];

      if (featured.product_id) {
        console.log(`\n关联的产品ID: ${featured.product_id}`);

        // 获取关联产品
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('id, name, image')
          .eq('id', featured.product_id)
          .single();

        if (productError) {
          console.log('❌ 查询产品失败:', productError.message);
        } else {
          console.log('\n关联产品数据:');
          console.log(JSON.stringify(product, null, 2));

          // 构造完整的图片URL
          const imagePath = product.image;
          const fullUrl = imagePath ? imagePath : '';
          console.log(`\n图片路径: ${imagePath}`);
          console.log(`完整URL: ${fullUrl}`);
        }
      } else {
        console.log('\n⚠️ 没有关联产品');
      }
    }
  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkFeatured();
