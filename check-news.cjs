const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkNews() {
  console.log('检查新闻表...\n');

  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .limit(5);

    if (error) {
      console.log('❌ 查询失败:', error.message);
      return;
    }

    console.log('新闻数据:');
    if (data && data.length > 0) {
      data.forEach((item, i) => {
        console.log(`\n--- 新闻 ${i+1} ---`);
        console.log('标题:', item.title);
        console.log('内容:', item.content?.substring(0, 100) + '...');
      });
    } else {
      console.log('没有新闻数据');
    }
  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkNews();
