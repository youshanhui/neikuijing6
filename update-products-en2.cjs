const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

const productsEn = [
  {
    id: 9,
    name: '4K Medical Endoscopic Camera System',
    category: 'Camera System',
    description: 'Model: SY-SHREK-7818 | Warranty: 8-year free warranty, 8-year zero-cost maintenance | Application: General surgery, Gynecology, ENT, Orthopedics, Urology, all endoscopic surgeries | Stainless steel construction, stable and durable | Rust-proof fixed screws | Internal metal shield, high anti-interference | Dual-shielded signal cables',
    features: ['Model: SY-SHREK-7818', 'Warranty: 8-year free warranty', 'Application: All endoscopic surgeries', 'Stainless steel construction', 'High anti-interference']
  },
  {
    id: 10,
    name: '4K Medical Endoscopic Camera System Pro',
    category: 'Camera System',
    description: 'Model: SY-SHREK-7815 | Warranty: 8-year free warranty, 8-year zero-cost maintenance | Application: General surgery, Gynecology, ENT, Orthopedics, Urology, all endoscopic surgeries | Stainless steel construction | High anti-interference',
    features: ['Model: SY-SHREK-7815', 'Warranty: 8-year free warranty', 'Application: All endoscopic surgeries', 'Professional grade']
  },
  {
    id: 11,
    name: '4K Medical Endoscopic Camera System Lite',
    category: 'Camera System',
    description: 'Model: SY-SHREK-7812 | Warranty: 8-year free warranty | Application: General surgery, Gynecology, ENT, Orthopedics, Urology | Compact design | Easy to operate',
    features: ['Model: SY-SHREK-7812', 'Warranty: 8-year free warranty', 'Application: All endoscopic surgeries', 'Compact design']
  },
  {
    id: 12,
    name: 'LED Medical Endoscopic Cold Light Source',
    category: 'Light Source System',
    description: 'Model: SY-SHREK-7718 | Warranty: 8-year free warranty, 8-year zero-cost maintenance | Application: All endoscopic surgery illumination | LED light source, high brightness | Long lifespan design | Stainless steel construction',
    features: ['Model: SY-SHREK-7718', 'Warranty: 8-year free warranty', 'Application: Endoscopic illumination', 'LED high brightness']
  },
  {
    id: 13,
    name: 'LED Medical Endoscopic Cold Light Source Pro',
    category: 'Light Source System',
    description: 'Model: SY-SHREK-7717 | Warranty: 8-year free warranty | Application: All endoscopic surgery illumination | LED light source, high brightness | Long lifespan | Stainless steel construction',
    features: ['Model: SY-SHREK-7717', 'Warranty: 8-year free warranty', 'Application: Endoscopic illumination', 'Professional grade']
  },
  {
    id: 14,
    name: 'CO2 Insufflator 55L',
    category: 'Insufflator',
    description: 'Model: SY-SHREK-55L | Warranty: 3-year free warranty | Application: Laparoscopic surgery | Flow rate: 55L/min | 55L high-flow insufflation | High-precision pressure control | Safe and reliable | Stainless steel construction',
    features: ['Model: SY-SHREK-55L', 'Warranty: 3-year free warranty', 'Flow rate: 55L/min', 'High-precision control']
  }
];

async function updateProducts() {
  console.log('更新剩余产品为英文...\n');

  for (const product of productsEn) {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        category: product.category,
        description: product.description,
        features: product.features
      })
      .eq('id', product.id)
      .select();

    if (error) {
      console.log(`❌ 更新产品 ${product.id} 失败:`, error.message);
    } else {
      console.log(`✅ 更新产品 ${product.id}: ${product.name}`);
    }
  }

  console.log('\n所有产品更新完成！');
}

updateProducts();
