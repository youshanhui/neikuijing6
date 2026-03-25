const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
  console.log('=== 检查 Supabase Storage ===\n');

  // List all buckets
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

  if (bucketError) {
    console.error('获取存储桶错误:', bucketError);
  } else {
    console.log('存储桶列表:');
    buckets.forEach(b => {
      console.log(`  - ${b.name} (public: ${b.public})`);
    });
    console.log('');
  }

  // List files in 'images' bucket
  console.log('检查 images 存储桶中的文件:');
  const { data: files, error: filesError } = await supabase.storage
    .from('images')
    .list('', { limit: 50 });

  if (filesError) {
    console.error('列出文件错误:', filesError);
  } else if (files && files.length > 0) {
    console.log(`找到 ${files.length} 个文件:\n`);
    files.forEach(f => {
      console.log(`  - ${f.name} (${f.metadata?.size || 'unknown size'})`);
    });
  } else {
    console.log('  暂无文件\n');
  }
}

checkStorage().catch(console.error);
