import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('检查数据库数据...\n');

  const { data: solutions, count: solCount } = await supabase
    .from('solutions')
    .select('*', { count: 'exact' });

  const { data: news, count: newsCount } = await supabase
    .from('news')
    .select('*', { count: 'exact' });

  console.log(`解决方案: ${solCount || 0} 条`);
  console.log(`新闻资讯: ${newsCount || 0} 条`);

  if (solutions?.length > 0) {
    console.log('\n解决方案示例:');
    solutions.slice(0, 3).forEach(s => {
      console.log(`  - ${s.title} (active: ${s.active})`);
    });
  }

  if (news?.length > 0) {
    console.log('\n新闻示例:');
    news.slice(0, 3).forEach(n => {
      console.log(`  - ${n.title} (active: ${n.active})`);
    });
  }
}

checkData().catch(console.error);
