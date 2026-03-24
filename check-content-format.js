import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkContentFormat() {
  console.log('🔍 检查新闻内容格式...\n');

  // 获取前5条新闻
  const { data: news, error } = await supabase
    .from('news')
    .select('id, title, content')
    .order('id', { ascending: true })
    .limit(5);

  if (error) {
    console.error('❌ 获取新闻失败:', error);
    return;
  }

  news.forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.title}`);
    console.log(`   ID: ${item.id}`);
    console.log(`   内容长度: ${item.content.length} 字符`);

    // 检查换行符格式
    const hasDoubleNewline = item.content.includes('\n\n');
    const hasSingleNewline = item.content.includes('\n');
    const hasLineBreak = item.content.includes('<br') || item.content.includes('<p');

    console.log(`   包含 \\n\\n: ${hasDoubleNewline ? '是' : '否'}`);
    console.log(`   包含 \\n: ${hasSingleNewline ? '是' : '否'}`);
    console.log(`   包含 HTML 标签: ${hasLineBreak ? '是' : '否'}`);

    // 显示内容预览
    const preview = item.content.substring(0, 200);
    console.log(`   内容预览: ${preview.replace(/\n/g, '\\n')}...`);
  });

  console.log('\n💡 如果内容使用 \\n 换行而不是 \\n\\n，需要修改 NewsDetail.tsx 中的分割逻辑。');
}

checkContentFormat().catch(console.error);
