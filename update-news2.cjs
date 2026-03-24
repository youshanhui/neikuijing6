const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function update() {
  const { data, error } = await supabase
    .from('news')
    .update({
      title: 'Knee Arthroscopy: Posterolateral vs Anterior Approach Techniques',
      content: 'The posterolateral approach is one of the important approaches for knee arthroscopy, mainly used for posterior cruciate ligament injuries, lateral meniscus posterior horn tears, and other pathological conditions.\n\nApplied Anatomy:\n1. Popliteal artery: Located behind the knee joint, the most important anatomical landmark\n2. Popliteal vein: Located behind the popliteal artery\n3. Common peroneal nerve: Runs laterally around the fibular neck\n\nOur advanced arthroscopy system provides excellent image quality for precise surgical planning and execution.'
    })
    .eq('id', 2)
    .select();

  if (error) {
    console.log('❌ 更新失败:', error.message);
  } else {
    console.log('✅ 更新成功:', data?.title);
  }
}

update();
