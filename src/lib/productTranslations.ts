// 产品名称翻译映射（中文 → 英文）
export const productNameTranslations: Record<string, string> = {
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

// 产品分类翻译映射
export const categoryTranslations: Record<string, string> = {
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
  '光源': 'Light Source'
};

// 产品参数翻译映射
export const featureTranslations: Record<string, string> = {
  '型号': 'Model',
  '质保': 'Warranty',
  '三年免费保修': '3-Year Free Warranty',
  '适用': 'Application',
  '腹腔镜手术': 'Laparoscopic Surgery',
  '冷光源不发热': 'Cold light source, no heat',
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
  '噪音低': 'Low noise',
  '高分辨率显示': 'High resolution display',
  '广视角设计': 'Wide viewing angle',
  '模块化设计': 'Modular design',
  '移动灵活': 'Flexible mobility',
  '坚固耐用': 'Sturdy and durable',
  '不锈钢材质': 'Stainless steel',
  '大流量充气': 'High-flow insufflation',
  '精确压力控制': 'Precise pressure control',
  '安全可靠': 'Safe and reliable',
  '自动调节': 'Auto adjustment',
  '高清摄像': 'HD camera',
  '4K超高清分辨率': '4K Ultra HD resolution',
  '色彩还原真实': 'Realistic color',
  '便于清洁': 'Easy to clean',
  '高效节能': 'Energy efficient',
  '智能温控': 'Smart temp control',
  '防雾设计': 'Anti-fog design',
  '一键操作': 'One-button operation',
  '脚踏开关': 'Foot pedal',
  '过热保护': 'Overheat protection',
  '多种模式': 'Multiple modes',
  '触摸屏操作': 'Touch screen',
  '多种规格可选': 'Multiple specs',
  '品质保证': 'Quality assured',
  '终身维护': 'Lifetime maintenance',
  '技术支持': 'Technical support'
};

// 翻译函数
export function translateProductName(name: string, targetLang: string = 'en'): string {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    return productNameTranslations[name] || name;
  }
  return name;
}

export function translateCategory(category: string, targetLang: string = 'en'): string {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    return categoryTranslations[category] || category;
  }
  return category;
}

export function translateFeatures(features: string[], targetLang: string = 'en'): string[] {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    return features.map(f => featureTranslations[f] || f);
  }
  return features;
}
