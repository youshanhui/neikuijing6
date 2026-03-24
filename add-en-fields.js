import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nawfbpigrewriunvzqbn.supabase.co',
  'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d'
);

// 中文名称 → 英文翻译
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
  '台车（3D/4K）': 'Medical Trolley (3D/4K)',
  '吸烟器': 'Smoke Evacuator'
};

// 中文分类 → 英文翻译
const categoryTranslations = {
  '光源系统': 'Light Source System',
  '摄像系统': 'Camera System',
  '灌注系统': 'Irrigation System',
  '气腹系统': 'Insufflation System',
  '吸引系统': 'Aspiration System',
  '显示系统': 'Display System',
  '配套设备': 'Accessories',
  '气腹机': 'Insufflator',
  '吸引泵': 'Suction Pump',
  '灌注泵': 'Irrigation Pump',
  '配件': 'Accessories',
  '监视器': 'Monitor',
  '光源': 'Light Source',
  'Insufflator': 'Insufflator',
  'Suction Pump': 'Suction Pump',
  'Irrigation Pump': 'Irrigation Pump',
  'Accessories': 'Accessories',
  'Monitor': 'Monitor',
  'Light Source': 'Light Source'
};

// 中文参数 → 英文翻译
const featureTranslations = {
  '型号': 'Model',
  '质保': 'Warranty',
  '三年免费保修': '3-Year Free Warranty',
  '适用': 'Application',
  '腹腔镜手术': 'Laparoscopic Surgery',
  '冷光源不发热': 'Cold light source, no heat generation',
  '亮度可调节': 'Adjustable brightness',
  '使用寿命长': 'Long service life',
  '色温可调': 'Adjustable color temperature',
  '流量精确控制': 'Precise flow control',
  '多种液体兼容': 'Multi-liquid compatible',
  '智能报警系统': 'Smart alarm system',
  '操作简便': 'Easy operation',
  '压力精确控制': 'Precise pressure control',
  '自动安全监测': 'Automatic safety monitoring',
  '吸力可调节': 'Adjustable suction power',
  '噪音低': 'Low noise level',
  '高分辨率显示': 'High resolution display',
  '广视角设计': 'Wide viewing angle design',
  '模块化设计': 'Modular design',
  '移动灵活': 'Flexible mobility',
  '坚固耐用': 'Sturdy and durable',
  '不锈钢材质': 'Stainless steel construction',
  '大流量充气': 'High-flow insufflation',
  '精确压力控制': 'Precise pressure control',
  '安全可靠': 'Safe and reliable',
  '自动调节': 'Auto adjustment',
  '高清摄像': 'HD camera',
  '4K超高清分辨率': '4K ultra HD resolution',
  '色彩还原真实': 'Realistic color reproduction',
  '便于清洁': 'Easy to clean',
  '高效节能': 'Energy efficient',
  '智能温控': 'Smart temperature control',
  '防雾设计': 'Anti-fog design',
  '一键操作': 'One-button operation',
  '脚踏开关': 'Foot pedal compatible',
  '过热保护': 'Overheat protection',
  '多种模式': 'Multiple modes',
  '触摸屏操作': 'Touch screen operation',
  '多种规格可选': 'Multiple specifications available',
  '品质保证': 'Quality assured',
  '终身维护': 'Lifetime maintenance',
  '技术支持': 'Technical support'
};

function translateName(name) {
  return nameTranslations[name] || name;
}

function translateCategory(category) {
  return categoryTranslations[category] || category;
}

function translateFeatures(features) {
  if (!features || !Array.isArray(features)) return features;
  return features.map(f => featureTranslations[f] || f);
}

async function addEnglishFields() {
  console.log('开始添加英文翻译字段...\n');

  // 获取所有产品
  const { data: products } = await supabase.from('products').select('*');
  console.log(`找到 ${products.length} 个产品\n`);

  let updated = 0;
  let errors = 0;

  for (const product of products) {
    const nameEn = translateName(product.name);
    const categoryEn = translateCategory(product.category);
    const featuresEn = translateFeatures(product.features);

    console.log(`[${product.id}] ${product.name}`);
    console.log(`  英文名称: ${nameEn}`);
    console.log(`  英文分类: ${categoryEn}`);

    // 更新产品，添加英文字段
    const { error } = await supabase
      .from('products')
      .update({
        name_en: nameEn,
        category_en: categoryEn,
        features_en: featuresEn
      })
      .eq('id', product.id);

    if (error) {
      console.log(`  ✗ 错误: ${error.message}\n`);
      errors++;
    } else {
      console.log(`  ✓ 已添加英文字段\n`);
      updated++;
    }
  }

  console.log(`\n========================================`);
  console.log(`完成!`);
  console.log(`总产品数: ${products.length}`);
  console.log(`成功更新: ${updated}`);
  console.log(`错误: ${errors}`);
  console.log(`========================================`);
}

addEnglishFields().catch(console.error);
