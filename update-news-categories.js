import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateNewsCategories() {
  console.log('🔄 更新新闻分类...\n');

  // 将一些新闻更新为展会信息
  const exhibitionNews = [
    { id: 3, title: '【普外科腹腔镜篇】4K超高清腹腔镜下左肾根治性切除术' },
    { id: 5, title: '【普外科腹腔镜篇】4K超高清腹腔镜根治性胆囊切除术治疗T3胆囊癌' },
    { id: 10, title: '千亿贴息贷！央行：优先国产自主品牌' },
    { id: 11, title: '中国4K超高清医疗微创领域的发展' }
  ];

  console.log('更新以下新闻为"展会信息"分类：');
  for (const news of exhibitionNews) {
    const { error } = await supabase
      .from('news')
      .update({ category: '展会信息' })
      .eq('id', news.id);

    if (error) {
      console.log(`❌ 更新失败: ${news.title} - ${error.message}`);
    } else {
      console.log(`✅ 已更新: ${news.title}`);
    }
  }

  console.log('\n🔍 验证分类结果...\n');

  const { data } = await supabase
    .from('news')
    .select('id, title, category')
    .order('category', { ascending: true });

  console.log('行业动态:');
  data.filter(n => n.category === '行业动态').forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title}`);
  });

  console.log('\n展会信息:');
  data.filter(n => n.category === '展会信息').forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title}`);
  });

  console.log('\n✅ 分类更新完成！');
}

updateNewsCategories();
