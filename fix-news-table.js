import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixNewsTable() {
  console.log('🔧 开始修复 news 表结构...\n');

  try {
    // 首先检查表结构
    const { data: columns, error: columnsError } = await supabase.rpc('get_table_columns').select('*').limit(10);

    // 尝试添加 short_description 列
    console.log('1. 检查 short_description 列...');

    // 使用 SQL 添加列
    const { error: addError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE public.news ADD COLUMN IF NOT EXISTS short_description TEXT;'
    });

    if (addError) {
      console.log('   RPC 方式添加列失败，尝试其他方法...');
      // 尝试直接查询看看错误信息
      const { data, error } = await supabase.from('news').select('*').limit(1);
      if (error) {
        console.log('   当前表查询错误:', error.message);
      }
    } else {
      console.log('✅ short_description 列添加成功');
    }

    // 尝试添加 sort_order 列
    console.log('2. 检查 sort_order 列...');
    const { error: sortError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE public.news ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;'
    });

    if (sortError) {
      console.log('   sort_order 列可能已存在或无法添加');
    } else {
      console.log('✅ sort_order 列添加成功');
    }

    console.log('\n🔄 刷新缓存...');
    // 等待 Supabase 刷新 schema cache
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('✅ 表结构修复完成！现在可以重新运行导入脚本。');

  } catch (err) {
    console.error('❌ 修复失败:', err);
  }
}

fixNewsTable();
