// 检查 Supabase Storage 中的所有文件
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
  console.log('检查 Supabase Storage (根目录)...\n');

  try {
    // 列出 images bucket 中的所有文件
    const { data: files, error } = await supabase.storage
      .from('images')
      .list('', { limit: 50 });

    if (error) {
      console.log('❌ 列出文件失败:', error.message);
      return;
    }

    console.log('images bucket 根目录文件数量:', files?.length || 0);
    console.log('文件列表:');
    console.log(JSON.stringify(files, null, 2));

    // 也检查 products bucket
    console.log('\n\n检查 products bucket...');
    const { data: productsFiles, error: productsError } = await supabase.storage
      .from('products')
      .list('', { limit: 50 });

    if (productsError) {
      console.log('❌ products bucket 列出失败:', productsError.message);
    } else {
      console.log('products bucket 文件数量:', productsFiles?.length || 0);
      console.log(JSON.stringify(productsFiles, null, 2));
    }

  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkStorage();
