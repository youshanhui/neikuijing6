import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyImport() {
  console.log('🔍 验证新闻数据导入结果...\n');

  try {
    const { data, error } = await supabase
      .from('news')
      .select('id, title, category, short_description, created_at')
      .order('sort_order', { ascending: true });

    if (error) {
      console.log(`❌ 查询失败: ${error.message}`);
      return;
    }

    console.log(`✅ 共导入 ${data.length} 条新闻：\n`);

    data.forEach((item, index) => {
      console.log(`${index + 1}. [${item.category}] ${item.title}`);
      console.log(`   摘要: ${item.short_description?.substring(0, 50)}...`);
      console.log('');
    });
  } catch (err) {
    console.log(`❌ 异常: ${err}`);
  }
}

verifyImport();
