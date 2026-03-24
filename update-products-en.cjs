const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

const productsEn = [
  {
    id: 1,
    name: '4K Ultra HD Camera System',
    category: 'Camera System',
    description: 'Advanced 4K Ultra HD imaging technology provides clear and detailed surgical views, supporting multiple department applications.',
    features: ['Model: SY-SHREK-7812', 'Warranty: 8-year free warranty', 'Application: General surgery, Gynecology, ENT, Orthopedics, Urology', 'Stainless steel construction', 'High anti-interference']
  },
  {
    id: 2,
    name: 'LED Cold Light Source',
    category: 'Light Source System',
    description: 'High-brightness LED cold light source with stable and uniform illumination, long service life.',
    features: ['Model: SY-SHREK-7718', 'Warranty: 8-year free warranty', 'Application: All endoscopic surgery illumination', 'LED light source', 'High brightness']
  },
  {
    id: 3,
    name: 'CO2 Insufflator',
    category: 'Insufflation System',
    description: 'Precisely controls abdominal pressure providing stable pneumoperitoneum environment, ensuring surgical safety.',
    features: ['Model: SY-SHREK-55L', 'Warranty: 3-year free warranty', 'Application: Laparoscopic surgery', '55L high-flow insufflation', 'High-precision pressure control']
  },
  {
    id: 7,
    name: 'Endoscopy Surgery Cart',
    category: 'Accessories',
    description: 'Modular design cart integrates all endoscopy equipment, clean and tidy, easy to operate.',
    features: ['Flexible movement', 'Multi-layer design', 'Cable management', 'Stable and reliable']
  }
];

async function updateProducts() {
  console.log('更新产品表为英文...\n');

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

  console.log('\n更新完成！');
}

updateProducts();
