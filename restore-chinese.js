import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nawfbpigrewriunvzqbn.supabase.co',
  'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d'
);

// 中文名称映射（英文 → 中文）
const nameChinese = {
  'Medical Endoscope Camera System': '医用内窥镜摄像系统',
  'LED Medical Endoscope Cold Light Source': 'LED医用内窥镜冷光源',
  'CO2 Insufflator 55L': 'CO2气腹机 55L',
  'LED Cold Light Source': 'LED冷光源',
  '4K Ultra HD Camera System': '4K超高清摄像系统',
  'CO2 Insufflator': 'CO2气腹机',
  'Irrigation Pump': '灌注泵',
  '4K Ultra HD Endoscope Camera System': '4K超高清内窥镜摄像系统',
  'Negative Pressure Aspirator': '负压吸引器',
  'Medical Monitor': '医用监视器',
  'Endoscopic Surgery Trolley': '内镜手术推车',
  'CO2 Insufflator 40L': 'CO2气腹机 40L',
  'Endoscope Irrigation Aspirator': '内窥镜冲洗吸引器',
  'Workstation Cart': '工作站台车',
  'Full HD Surgical Recorder': '全高清手术录像机',
  'CO2 Insufflator 35L': 'CO2气腹机 35L',
  'Medical Monitor (LCD Touch Screen)': '监视器（液晶触摸屏）',
  'Medical Trolley': '台车',
  'Endoscope Warmer': '内窥镜加热器',
  'Medical Pressure Pump (Irrigation Pump)': '医用加压器（灌注泵）',
  'Medical Trolley (3D/4K)': '台车（3D/4K）',
  'Smoke Evacuator': '吸烟器'
};

// 中文分类映射
const categoryChinese = {
  'Light Source System': '光源系统',
  'Irrigation System': '灌注系统',
  'Camera System': '摄像系统',
  'Aspiration System': '吸引系统',
  '显示 System': '显示系统',
  '配套设备': '配套设备',
  'Insufflator': '气腹机',
  'Insufflation System': '气腹系统',
  'Suction Pump': '吸引泵',
  'Irrigation Pump': '灌注泵',
  'Accessories': '配件',
  'Monitor': '监视器',
  'Light Source': '光源系统'
};

// 中文参数映射
const featureChinese = {
  'Model': '型号',
  '型号': '型号',
  'Warranty': '质保',
  '质保': '质保',
  '3-Year Free Warranty': '三年免费保修',
  'Application': '适用',
  '适用': '适用',
  'Laparoscopic Surgery': '腹腔镜手术',
  'Cold light source, no heat': '冷光源不发热',
  '冷光源不发热': '冷光源不发热',
  'Adjustable brightness': '亮度可调节',
  '亮度可调节': '亮度可调节',
  'Long service life': '使用寿命长',
  '使用寿命长': '使用寿命长',
  'Adjustable color temperature': '色温可调',
  '色温可调': '色温可调',
  'Precise flow control': '流量精确控制',
  '流量精确控制': '流量精确控制',
  'Multi-liquid compatible': '多种液体兼容',
  '多种液体兼容': '多种液体兼容',
  'Smart alarm system': '智能报警系统',
  '智能报警系统': '智能报警系统',
  'Easy operation': '操作简便',
  '操作简便': '操作简便',
  'Precise control': '精确控制',
  '精确控制': '精确控制',
  'High flow insufflation': '大流量充气',
  'Stable and reliable': '稳定可靠',
  'Stable pressure control': '压力稳定控制',
  'Easy to clean': '易于清洁',
  'Compact design': '设计精巧',
  'High quality material': '优质材料'
};

function restoreName(name) {
  if (nameChinese[name]) {
    return nameChinese[name];
  }
  return name;
}

function restoreCategory(category) {
  if (categoryChinese[category]) {
    return categoryChinese[category];
  }
  // 如果是英文字符串但不在映射中，保持原样
  if (/^[a-zA-Z\s\-()]+$/.test(category)) {
    return category;
  }
  return category;
}

function restoreFeatures(features) {
  if (!features || !Array.isArray(features)) return features;
  return features.map(f => featureChinese[f] || f);
}

async function restoreChinese() {
  console.log('开始恢复中文内容...\n');

  const { data: products } = await supabase.from('products').select('*');
  console.log(`找到 ${products.length} 个产品\n`);

  let restored = 0;
  let errors = 0;

  for (const product of products) {
    const nameZh = restoreName(product.name);
    const categoryZh = restoreCategory(product.category);
    const featuresZh = restoreFeatures(product.features);

    console.log(`[${product.id}] ${product.name}`);
    console.log(`  → ${nameZh}`);

    const { error } = await supabase
      .from('products')
      .update({
        name: nameZh,
        category: categoryZh,
        features: featuresZh
      })
      .eq('id', product.id);

    if (error) {
      console.log(`  ✗ 错误: ${error.message}\n`);
      errors++;
    } else {
      console.log(`  ✓ 已恢复\n`);
      restored++;
    }
  }

  console.log(`\n========================================`);
  console.log(`恢复完成!`);
  console.log(`总产品数: ${products.length}`);
  console.log(`成功恢复: ${restored}`);
  console.log(`错误: ${errors}`);
  console.log(`========================================`);
}

restoreChinese().catch(console.error);
