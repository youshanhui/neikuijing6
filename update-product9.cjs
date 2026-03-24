const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateProduct9() {
  console.log('更新产品 9...\n');

  const { data, error } = await supabase
    .from('products')
    .update({
      name: '4K Medical Endoscopic Camera System Premium',
      category: 'Camera System',
      description: 'Model: SY-SHREK-7818 | Warranty: 8-year free warranty, 8-year zero-cost maintenance | Application: General surgery, Gynecology, ENT, Orthopedics, Urology, all endoscopic surgeries | Stainless steel construction, stable and durable | Rust-proof fixed screws | Internal metal shield, high anti-interference | Dual-shielded signal cables',
      features: ['Model: SY-SHREK-7818', 'Warranty: 8-year free warranty', 'Application: All endoscopic surgeries', 'Premium grade']
    })
    .eq('id', 9)
    .select();

  if (error) {
    console.log('❌ 更新失败:', error.message);
  } else {
    console.log('✅ 更新成功:', data);
  }
}

updateProduct9();
