import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixCategories() {
  console.log('🔄 重试更新分类...\n');

  // 重试失败的那条
  const { error: retry1 } = await supabase
    .from('news')
    .update({ category: '展会信息' })
    .eq('id', 3);

  if (retry1) {
    console.log(`❌ 重试失败: id=3 - ${retry1.message}`);
  } else {
    console.log('✅ id=3 更新成功');
  }

  // 调整：把"千亿贴息贷"改回行业动态
  const { error: fix1 } = await supabase
    .from('news')
    .update({ category: '行业动态' })
    .eq('id', 10);

  if (fix1) {
    console.log(`❌ 调整失败: id=10`);
  } else {
    console.log('✅ id=10 调整为"行业动态"');
  }

  // 添加更多展会信息
  const { error: add1 } = await supabase
    .from('news')
    .update({ category: '展会信息' })
    .eq('id', 8); // 胃袖状切除术

  if (add1) {
    console.log(`❌ 添加展会信息失败: id=8`);
  } else {
    console.log('✅ id=8 添加为"展会信息"');
  }

  console.log('\n🔍 最终分类结果：\n');

  const { data } = await supabase
    .from('news')
    .select('id, title, category')
    .order('category', { ascending: true });

  console.log('【行业动态】共', data.filter(n => n.category === '行业动态').length, '条:');
  data.filter(n => n.category === '行业动态').forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title.substring(0, 40)}...`);
  });

  console.log('\n【展会信息】共', data.filter(n => n.category === '展会信息').length, '条:');
  data.filter(n => n.category === '展会信息').forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.title.substring(0, 40)}...`);
  });
}

fixCategories();
