import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nawfbpigrewriunvzqbn.supabase.co',
  'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d'
);

// Complete translations for medical device names
const nameTranslations = {
  '医用内窥镜摄像系统': 'Medical Endoscope Camera System',
  'LED医用内窥镜冷光源': 'LED Medical Endoscope Cold Light Source',
  'CO2气腹机 55L': 'CO2 Insufflator 55L',
  'LED冷光源': 'LED Cold Light Source',
  '4K超高清摄像系统': '4K Ultra HD Camera System',
  'CO2气腹机': 'CO2 Insufflator',
  '灌注泵': 'Irrigation Pump',
  '4K超高清内窥镜摄像系统': '4K Ultra HD Endoscope Camera System',
  '负压吸引器': 'Negative Pressure Aspirator',
  '医用监视器': 'Medical Monitor',
  '内镜手术推车': 'Endoscopic Surgery Trolley',
  'CO2气腹机 40L': 'CO2 Insufflator 40L',
  '内窥镜冲洗吸引器': 'Endoscope Irrigation Aspirator',
  '工作站台车': 'Workstation Cart',
  '全高清手术录像机': 'Full HD Surgical Recorder',
  'CO2气腹机 35L': 'CO2 Insufflator 35L',
  '监视器（液晶触摸屏）': 'Medical Monitor (LCD Touch Screen)',
  '台车': 'Medical Trolley',
  '内窥镜加热器': 'Endoscope Warmer',
  '医用加压器（灌注泵）': 'Medical Pressure Pump (Irrigation Pump)',
  '监视器': 'Medical Monitor',
  '台车（3D/4K）': 'Medical Trolley (3D/4K)',
  '吸烟器': 'Smoke Evacuator',
  '超声刀系统': 'Ultrasonic Scalpel System',
  '高频手术电极': 'High-Frequency Surgical Electrode',
  '宫腔电切镜': 'Hysteroscopic Resectoscope',
  '内窥镜手术器械': 'Endoscopic Surgical Instruments'
};

// Description translations (keeping Model info)
const descTranslations = {
  '高效节能的LED冷光源，提供稳定均匀的照明': 'Energy-efficient LED cold light source providing stable and uniform illumination',
  '精确控制液体流量，确保手术视野清晰': 'Precise control of liquid flow ensuring clear surgical field',
  '精确控制腹腔压力，提供稳定的手术操作空间': 'Precise control of abdominal pressure providing stable surgical workspace',
  '先进的4K超高清成像技术，提供清晰细腻的手术视野': 'Advanced 4K Ultra HD imaging technology providing clear and detailed surgical field'
};

function translateName(name) {
  // First check dictionary
  if (nameTranslations[name]) {
    return nameTranslations[name];
  }

  // Pattern-based translation
  let translated = name
    .replace(/4K/g, '4K ')
    .replace(/3D/g, '3D ')
    .replace(/超高清/g, 'Ultra HD ')
    .replace(/全高清/g, 'Full HD ')
    .replace(/摄像系统/g, 'Camera System')
    .replace(/摄像/g, 'Camera')
    .replace(/内窥镜/g, 'Endoscope ')
    .replace(/内镜/g, 'Endoscopic ')
    .replace(/光源/g, 'Light Source')
    .replace(/冷光源/g, 'Cold Light Source')
    .replace(/LED/g, 'LED ')
    .replace(/CO2气腹机/g, 'CO2 Insufflator ')
    .replace(/气腹机/g, 'Insufflator ')
    .replace(/灌注泵/g, 'Irrigation Pump')
    .replace(/加压器/g, 'Pressure Pump')
    .replace(/冲洗吸引器/g, 'Irrigation Aspirator')
    .replace(/吸引器/g, 'Aspirator')
    .replace(/医用/g, 'Medical ')
    .replace(/监视器/g, 'Medical Monitor')
    .replace(/手术推车/g, 'Surgery Trolley')
    .replace(/工作站台车/g, 'Workstation Cart')
    .replace(/手术录像机/g, 'Surgical Recorder')
    .replace(/台车/g, 'Medical Trolley')
    .replace(/加热器/g, 'Warming Unit')
    .replace(/吸烟器/g, 'Smoke Evacuator')
    .replace(/超声刀/g, 'Ultrasonic Scalpel')
    .replace(/高频手术电极/g, 'High-Frequency Surgical Electrode')
    .replace(/宫腔电切镜/g, 'Hysteroscopic Resectoscope')
    .replace(/宫腔镜/g, 'Hysteroscope')
    .replace(/腹腔镜/g, 'Laparoscope')
    .replace(/手术器械/g, 'Surgical Instruments')
    .replace(/负压/g, 'Negative Pressure ')
    .replace(/\s+/g, ' ')
    .trim();

  return translated;
}

function translateDesc(desc) {
  if (!desc) return desc;

  // Keep Model info if exists
  let modelInfo = '';
  const modelMatch = desc.match(/Model：([^|]+)/);
  const warrantyMatch = desc.match(/Warranty：([^|]+)/);
  const appMatch = desc.match(/Application：([^\|]+)/);

  if (modelMatch) {
    modelInfo += `Model: ${modelMatch[1].trim()}`;
  }
  if (warrantyMatch) {
    modelInfo += ` | Warranty: ${warrantyMatch[1].trim()}`;
  }
  if (appMatch) {
    modelInfo += ` | Application: ${appMatch[1].trim()}`;
  }

  // Check dictionary first
  if (descTranslations[desc]) {
    return modelInfo ? `${descTranslations[desc]} | ${modelInfo}` : descTranslations[desc];
  }

  // Translate key terms
  let translated = desc
    .replace(/高效节能/g, 'Energy-efficient')
    .replace(/LED/g, 'LED')
    .replace(/冷光源/g, 'cold light source')
    .replace(/提供/g, 'provides')
    .replace(/稳定/g, 'stable')
    .replace(/均匀/g, 'uniform')
    .replace(/照明/g, 'illumination')
    .replace(/先进的/g, 'Advanced')
    .replace(/4K超高清/g, '4K Ultra HD')
    .replace(/成像技术/g, 'imaging technology')
    .replace(/清晰/g, 'clear')
    .replace(/细腻/g, 'detailed')
    .replace(/手术视野/g, 'surgical field')
    .replace(/精确/g, 'Precise')
    .replace(/控制/g, 'control')
    .replace(/腹腔/g, 'abdominal')
    .replace(/压力/g, 'pressure')
    .replace(/液体/g, 'liquid')
    .replace(/流量/g, 'flow rate')
    .replace(/确保/g, 'ensuring')
    .replace(/使用寿命/g, 'service life')
    .replace(/长/g, 'long')
    .replace(/采用/g, 'using')
    .replace(/先进技术/g, 'advanced technology')
    .replace(/性能/g, 'performance')
    .replace(/稳定可靠/g, 'stable and reliable')
    .replace(/设计精巧/g, 'Compact design')
    .replace(/操作简便/g, 'easy operation')
    .replace(/明亮/g, 'bright')
    .replace(/适用于/g, 'suitable for')
    .replace(/各种/g, 'various')
    .replace(/内窥镜/g, 'endoscopic')
    .replace(/手术/g, 'surgeries')
    .replace(/高精度/g, 'High precision')
    .replace(/高可靠性/g, 'high reliability')
    .replace(/快速/g, 'quick')
    .replace(/切换/g, 'switching')
    .replace(/模式/g, 'modes')
    .replace(/智能/g, 'intelligent')
    .replace(/系统/g, 'system')
    .replace(/便捷/g, 'easy')
    .replace(/安全/g, 'safe')
    .replace(/保护/g, 'protecting')
    .replace(/患者/g, 'patient')
    .replace(/最新/g, 'latest')
    .replace(/提升/g, 'improving')
    .replace(/效率/g, 'efficiency')
    .replace(/微创/g, 'minimally invasive')
    .replace(/画质/g, 'image quality')
    .replace(/色彩/g, 'color')
    .replace(/还原/g, 'reproduction')
    .replace(/真实/g, 'realistic')
    .replace(/维护/g, 'maintenance')
    .replace(/成本/g, 'cost')
    .replace(/低/g, 'low')
    .replace(/学习/g, 'learning')
    .replace(/曲线/g, 'curve')
    .replace(/短/g, 'short')
    .replace(/规格/g, 'specifications')
    .replace(/可选/g, 'available')
    .replace(/满足/g, 'meeting')
    .replace(/不同/g, 'different')
    .replace(/需求/g, 'needs')
    .replace(/国产/g, 'domestic')
    .replace(/高端/g, 'high-end')
    .replace(/品牌/g, 'brand')
    .replace(/品质/g, 'quality')
    .replace(/保证/g, 'assurance')
    .replace(/Model：/g, 'Model: ')
    .replace(/Warranty：/g, 'Warranty: ')
    .replace(/Application：/g, 'Application: ')
    .replace(/\|/g, ' | ')
    .replace(/，/g, ', ')
    .replace(/\s*\|\s*/g, ' | ')
    .replace(/\s+/g, ' ')
    .trim();

  return translated;
}

async function translateProducts() {
  console.log('Starting product translation...\n');

  const { data: products } = await supabase.from('products').select('*');
  console.log(`Found ${products.length} products to translate\n`);

  let translated = 0;
  let errors = 0;

  for (const product of products) {
    const nameEn = translateName(product.name);
    const descEn = translateDesc(product.description);

    console.log(`[${product.id}] ${product.name}`);
    console.log(`  → ${nameEn}`);

    // Update name and description directly
    const { error } = await supabase
      .from('products')
      .update({
        name: nameEn,
        description: descEn
      })
      .eq('id', product.id);

    if (error) {
      console.log(`  ✗ Error: ${error.message}\n`);
      errors++;
    } else {
      console.log(`  ✓ Updated\n`);
      translated++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Translation complete!`);
  console.log(`Total products: ${products.length}`);
  console.log(`Successfully translated: ${translated}`);
  console.log(`Errors: ${errors}`);
  console.log(`========================================`);
}

translateProducts().catch(console.error);
