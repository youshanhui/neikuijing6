import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyData() {
  console.log('验证数据库中的新闻数据...\n');

  // 获取所有新闻
  const { data: allNews, count, error } = await supabase
    .from('news')
    .select('id, title, category, short_description, content', { count: 'exact' })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('❌ 获取数据失败:', error);
    return;
  }

  console.log(`📊 数据库中共有 ${count} 篇新闻\n`);

  // 检查数据质量
  let emptyContentCount = 0;
  let shortContentCount = 0;
  let goodContentCount = 0;

  allNews.forEach(news => {
    const contentLength = news.content ? news.content.length : 0;
    if (contentLength === 0) {
      emptyContentCount++;
    } else if (contentLength < 100) {
      shortContentCount++;
    } else {
      goodContentCount++;
    }
  });

  console.log('📋 内容质量统计:');
  console.log(`   ✅ 完整内容 (>100字符): ${goodContentCount} 篇`);
  console.log(`   ⚠️  简短内容 (<100字符): ${shortContentCount} 篇`);
  console.log(`   ❌ 无内容: ${emptyContentCount} 篇\n`);

  // 显示前3篇和后3篇文章作为样本
  console.log('📝 文章样本 (前3篇):\n');
  allNews.slice(0, 3).forEach((news, idx) => {
    console.log(`${idx + 1}. ${news.title}`);
    console.log(`   分类: ${news.category}`);
    console.log(`   内容长度: ${news.content ? news.content.length : 0} 字符`);
    console.log(`   内容预览: ${news.content ? news.content.substring(0, 150) + '...' : '无内容'}\n`);
  });

  console.log('📝 文章样本 (后3篇):\n');
  allNews.slice(-3).forEach((news, idx) => {
    console.log(`${allNews.length - 2 + idx}. ${news.title}`);
    console.log(`   分类: ${news.category}`);
    console.log(`   内容长度: ${news.content ? news.content.length : 0} 字符`);
    console.log(`   内容预览: ${news.content ? news.content.substring(0, 150) + '...' : '无内容'}\n`);
  });

  // 检查行业动态和展会信息
  const { count: industryCount } = await supabase
    .from('news')
    .select('*', { count: 'exact', head: true })
    .eq('category', '行业动态');

  const { count: exhibitionCount } = await supabase
    .from('news')
    .select('*', { count: 'exact', head: true })
    .eq('category', '展会信息');

  console.log('📊 分类统计:');
  console.log(`   行业动态: ${industryCount} 篇`);
  console.log(`   展会信息: ${exhibitionCount} 篇\n`);

  if (goodContentCount === count) {
    console.log('✅✅✅ 所有文章都已正确导入并包含详细内容！');
    console.log('请刷新网站新闻页面，点击"阅读更多"查看完整文章内容。');
  } else {
    console.log('⚠️  部分文章可能需要检查内容。');
  }
}

verifyData().catch(console.error);
