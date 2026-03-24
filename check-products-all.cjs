// 检查所有产品的图片路径
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  console.log('检查所有产品及其图片路径...\n');

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, image')
      .limit(10);

    if (error) {
      console.log('❌ 查询失败:', error.message);
      return;
    }

    console.log('产品图片路径:');
    data.forEach(p => {
      console.log(`ID ${p.id}: ${p.name}`);
      console.log(`  图片: ${p.image}`);
      // 检查是否以 http 开头
      if (p.image && p.image.startsWith('http')) {
        console.log(`  (完整URL)`);
      } else if (p.image) {
        console.log(`  (相对路径)`);
      }
    });

    // 检查 public bucket
    console.log('\n\n检查 public bucket...');
    const { data: publicFiles, error: publicError } = await supabase.storage
      .from('public')
      .list('', { limit: 50 });

    if (publicError) {
      console.log('❌ public bucket 失败:', publicError.message);
    } else {
      console.log('public bucket 文件数量:', publicFiles?.length || 0);
      if (publicFiles && publicFiles.length > 0) {
        console.log(JSON.stringify(publicFiles, null, 2));
      }
    }

  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkProducts();
