// 检查并创建 Storage bucket
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBuckets() {
  console.log('检查 Storage buckets...\n');

  try {
    // 列出所有 buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.log('❌ 列出 buckets 失败:', error.message);
      return;
    }

    console.log('Buckets 列表:');
    console.log(JSON.stringify(buckets, null, 2));

  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkBuckets();
