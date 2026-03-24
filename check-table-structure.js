import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  console.log('🔍 检查 news 表结构...\n');

  try {
    // 尝试查询表结构
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ 查询 news 表时出错:');
      console.log('   错误代码:', error.code);
      console.log('   错误消息:', error.message);
      console.log('   错误详情:', error.details);

      // 检查是否是列不存在的问题
      if (error.code === 'PGRST204' || error.message.includes('short_description')) {
        console.log('\n⚠️  表中缺少 short_description 列！');
        console.log('\n📋 需要执行的 SQL：');
        console.log(`
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
        `);
      }
    } else {
      console.log('✅ news 表查询成功');
      console.log('   返回数据:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('❌ 发生异常:', err);
  }
}

checkTableStructure();
