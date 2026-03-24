const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSolutions() {
  console.log('检查解决方案表...\n');

  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .limit(5);

    if (error) {
      console.log('❌ 查询失败:', error.message);
      return;
    }

    console.log('解决方案数据:');
    if (data && data.length > 0) {
      data.forEach((item, i) => {
        console.log(`\n--- 解决方案 ${i+1} ---`);
        console.log('名称:', item.name);
        console.log('描述:', item.description?.substring(0, 100));
      });
    } else {
      console.log('没有解决方案数据');
    }
  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

checkSolutions();
