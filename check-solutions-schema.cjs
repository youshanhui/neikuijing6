const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase
    .from('solutions')
    .select('*')
    .limit(1);

  if (error) {
    console.log('❌ 错误:', error.message);
  } else if (data && data.length > 0) {
    console.log('Solutions 表字段:', Object.keys(data[0]));
    console.log('\n示例数据:', JSON.stringify(data[0], null, 2));
  }
}

checkSchema();
