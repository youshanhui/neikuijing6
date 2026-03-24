// 检查 Supabase Storage 中的图片
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
  console.log('检查 Supabase Storage...\n');

  try {
    // 列出 images bucket 中的文件
    const { data: files, error } = await supabase.storage
      .from('images')
      .list('uploads/products', {
        limit: 10
      });

    if (error) {
      console.log('❌ 列出文件失败:', error.message);
      // 尝试列出根目录
      console.log('\n尝试列出根目录...');
      const { data: rootFiles, error: rootError } = await supabase.storage
        .from('images')
        .list('', { limit: 20 });

      if (rootError) {
        console.log('❌ 列出根目录也失败:', rootError.message);
      } else {
        console.log('根目录文件:');
        console.log(JSON.stringify(rootFiles, null, 2));
      }
      return;
    }

    console.log('uploads/products 目录中的文件:');
    console.log(JSON.stringify(files, null, 2));

    // 尝试获取第一个文件的公共URL
    if (files && files.length > 0) {
      const file = files[0];
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(`uploads/products/${file.name}`);

      console.log('\n完整图片URL:', urlData.publicUrl);
    }

  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkStorage();
