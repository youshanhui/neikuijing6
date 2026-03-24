import { createClient } from '@supabase/supabase-js';
import { newsData } from './src/components/InsertNews.tsx';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function importAllNews() {
  console.log('开始导入所有新闻文章...\n');

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (let i = 0; i < newsData.length; i++) {
    const news = newsData[i];

    try {
      // 检查是否已存在相同标题的新闻
      const { data: existing } = await supabase
        .from('news')
        .select('id')
        .eq('title', news.title)
        .single();

      if (existing) {
        console.log(`⚠️  已存在，跳过: ${news.title}`);
        continue;
      }

      // 插入新闻数据
      const { data, error } = await supabase
        .from('news')
        .insert([
          {
            title: news.title,
            category: news.category,
            short_description: news.short_description,
            content: news.content, // 完整的详细内容
            author: news.author || '上海世音内窥镜',
            image_url: news.image_url || '',
            active: true,
            sort_order: news.sort_order || (i + 1),
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        errorCount++;
        errors.push({ title: news.title, error: error.message });
        console.error(`❌ 导入失败: ${news.title}`);
        console.error(`   错误: ${error.message}`);
      } else {
        successCount++;
        console.log(`✅ 导入成功: ${news.title} (ID: ${data.id})`);
        console.log(`   分类: ${news.category}`);
        console.log(`   字数: ${news.content.length} 字符`);
      }
    } catch (err) {
      errorCount++;
      errors.push({ title: news.title, error: String(err) });
      console.error(`❌ 异常: ${news.title}`, err);
    }

    // 每5条打印进度
    if ((i + 1) % 5 === 0) {
      console.log(`\n📊 进度: ${i + 1}/${newsData.length} 已处理\n`);
    }
  }

  console.log('\n========================================');
  console.log('📋 导入统计');
  console.log('========================================');
  console.log(`✅ 成功: ${successCount} 篇`);
  console.log(`❌ 失败: ${errorCount} 篇`);
  console.log(`📄 总计: ${newsData.length} 篇`);
  console.log('========================================\n');

  if (errors.length > 0) {
    console.log('❌ 失败的文章:');
    errors.forEach((e, idx) => {
      console.log(`${idx + 1}. ${e.title}`);
      console.log(`   错误: ${e.error}\n`);
    });
  }

  // 验证导入的数据
  console.log('\n🔍 验证导入的数据...\n');
  const { data: allNews, count } = await supabase
    .from('news')
    .select('id, title, category, content', { count: 'exact' })
    .order('sort_order', { ascending: true });

  if (count !== null) {
    console.log(`数据库中共有 ${count} 篇新闻\n`);

    // 检查前3篇文章的详细内容
    if (allNews && allNews.length > 0) {
      console.log('📝 前3篇文章内容检查:');
      allNews.slice(0, 3).forEach((news, idx) => {
        console.log(`\n${idx + 1}. ${news.title}`);
        console.log(`   分类: ${news.category}`);
        console.log(`   内容长度: ${news.content ? news.content.length : 0} 字符`);
        console.log(`   内容预览: ${news.content ? news.content.substring(0, 100) + '...' : '无内容'}`);
      });
    }
  }
}

importAllNews().catch(console.error);
