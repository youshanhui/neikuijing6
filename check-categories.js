import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCategories() {
  const { data, error } = await supabase
    .from('news')
    .select('id, title, category')
    .order('category', { ascending: true });

  if (error) {
    console.log('查询失败:', error.message);
    return;
  }

  console.log('📊 当前新闻分类：\n');
  console.log('【行业动态】', data.filter(n => n.category === '行业动态').length, '条');
  data.filter(n => n.category === '行业动态').forEach((item, i) => {
    console.log(`  ${i + 1}. [${item.id}] ${item.title.substring(0, 35)}...`);
  });

  console.log('\n【展会信息】', data.filter(n => n.category === '展会信息').length, '条');
  data.filter(n => n.category === '展会信息').forEach((item, i) => {
    console.log(`  ${i + 1}. [${item.id}] ${item.title.substring(0, 35)}...`);
  });
}

checkCategories();
