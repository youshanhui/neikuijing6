import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nawfbpigrewriunvzqbn.supabase.co',
  'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d'
);

// Feature translations
const featureTranslations = {
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
  '高清摄像': 'HD Camera',
  '4K超高清': '4K Ultra HD',
  'LED光源': 'LED Light Source',
  '稳定可靠': 'Stable and reliable',
  '精确控制': 'Precise control',
  '安全保护': 'Safety protection',
  '自动调节': 'Auto adjustment',
  '高效节能': 'Energy efficient',
  '智能温控': 'Smart temperature control',
  '防雾设计': 'Anti-fog design',
  '防水等级': 'Waterproof rating',
  '使用寿命': 'Service life',
  '保修期': 'Warranty period',
  '认证': 'Certification',
  'CE认证': 'CE Certified',
  'FDA认证': 'FDA Certified',
  'ISO认证': 'ISO Certified',
  '输出功率': 'Output power',
  '输入电压': 'Input voltage',
  '工作温度': 'Working temperature',
  '存储温度': 'Storage temperature',
  '相对湿度': 'Relative humidity',
  '尺寸': 'Dimensions',
  '重量': 'Weight',
  '材质': 'Material',
  '不锈钢': 'Stainless steel',
  '铝合金': 'Aluminum alloy',
  'ABS塑料': 'ABS plastic',
  '额定功率': 'Rated power',
  '光源类型': 'Light source type',
  '照度': 'Illuminance',
  '色温范围': 'Color temperature range',
  '显色指数': 'Color rendering index',
  '寿命': 'Lifespan',
  '流量范围': 'Flow range',
  '压力范围': 'Pressure range',
  '最大流量': 'Max flow rate',
  '最大压力': 'Max pressure',
  '精度': 'Accuracy',
  '分辨率': 'Resolution',
  '屏幕尺寸': 'Screen size',
  '显示模式': 'Display mode',
  '接口类型': 'Interface type',
  'USB接口': 'USB interface',
  'HDMI接口': 'HDMI interface',
  'VGA接口': 'VGA interface',
  'DVI接口': 'DVI interface',
  '视频输入': 'Video input',
  '视频输出': 'Video output',
  '录像格式': 'Recording format',
  '存储容量': 'Storage capacity',
  '支持语言': 'Supported languages',
  '过热保护': 'Overheat protection',
  '过流保护': 'Overcurrent protection',
  '短路保护': 'Short circuit protection',
  '漏电保护': 'Leakage protection',
  '一键操作': 'One-key operation',
  '脚踏开关': 'Foot pedal',
  '手柄控制': 'Hand control',
  '遥控功能': 'Remote control',
  '无线连接': 'Wireless connection',
  '蓝牙连接': 'Bluetooth',
  'WiFi连接': 'WiFi',
  '低噪音': 'Low noise',
  '静音设计': 'Silent design',
  '易于清洁': 'Easy to clean',
  '可高温高压灭菌': 'Autoclavable',
  '符合人体工程学': 'Ergonomic design',
  '轻巧便携': 'Lightweight and portable',
  '坚固耐用': 'Sturdy and durable',
  '适用于各种手术': 'Suitable for various surgeries',
  '微创手术专用': 'For minimally invasive surgery',
  '腹腔镜手术专用': 'For laparoscopic surgery',
  '宫腔镜手术专用': 'For hysteroscopic surgery',
  '关节镜手术专用': 'For arthroscopic surgery',
  '泌尿外科手术专用': 'For urological surgery',
  '普外科手术专用': 'For general surgery',
  '妇科手术专用': 'For gynecological surgery',
  '胸外科手术专用': 'For thoracic surgery',
  '五官科手术专用': 'For ENT surgery',
  '标配': 'Standard',
  '选配': 'Optional',
  '高品质': 'High quality',
  '专业级': 'Professional grade',
  '医疗级': 'Medical grade',
  '医院专用': 'Hospital grade',
  '临床验证': 'Clinically verified',
  '性能卓越': 'Excellent performance',
  '技术领先': 'Technology leading',
  '品质保证': 'Quality assured',
  '厂家直销': 'Factory direct',
  '现货供应': 'In stock',
  '快速发货': 'Fast shipping',
  '专业技术支持': 'Professional technical support',
  '终身维护': 'Lifetime maintenance',
  '免费培训': 'Free training',
  '上门安装': 'On-site installation',
  '调试服务': 'Debugging service',
  '一年质保': '1-Year Warranty',
  '二年质保': '2-Year Warranty',
  '三年质保': '3-Year Warranty',
  '五年质保': '5-Year Warranty',
  '终身质保': 'Lifetime Warranty',
  '零配件供应': 'Spare parts supply',
  '售后服务': 'After-sales service',
  '技术支持': 'Technical support',
  '维修服务': 'Repair service',
  '校准服务': 'Calibration service',
  '保养服务': 'Maintenance service',
  '升级服务': 'Upgrade service',
  '咨询服务': 'Consulting service',
  '解决方案': 'Solutions',
  '一站式服务': 'One-stop service',
  '定制服务': 'Customized service',
  'OEM服务': 'OEM service',
  'ODM服务': 'ODM service',
  '来图加工': 'Custom processing',
  '批量生产': 'Mass production',
  '小批量': 'Small batch',
  '样品': 'Sample',
  '试用': 'Trial',
  '展示': 'Display',
  '培训': 'Training',
  '教学': 'Teaching',
  '科研': 'Research',
  '临床': 'Clinical',
  '手术室': 'Operating room',
  'ICU': 'ICU',
  '急诊室': 'Emergency room',
  '门诊': 'Outpatient',
  '病房': 'Ward',
  '检查室': 'Examination room',
  '实验室': 'Laboratory',
  '教学医院': 'Teaching hospital',
  '三甲医院': 'Tier-3 hospital',
  '三乙医院': 'Tier-2 hospital',
  '私立医院': 'Private hospital',
  '公立医院': 'Public hospital',
  '连锁诊所': 'Chain clinic',
  '单体诊所': 'Individual clinic',
  '社区卫生服务中心': 'Community health center',
  '乡镇卫生院': 'Township health center',
  '村卫生室': 'Village clinic',
  '体检中心': 'Physical examination center',
  '康复中心': 'Rehabilitation center',
  '美容机构': 'Beauty institution',
  '整形机构': 'Plastic surgery institution',
  '牙科诊所': 'Dental clinic',
  '眼科医院': 'Eye hospital',
  '耳鼻喉医院': 'ENT hospital',
  '专科医院': 'Specialty hospital',
  '综合医院': 'General hospital',
  '中医院': 'TCM hospital',
  '儿童医院': "Children's hospital",
  '妇产医院': "Women's hospital",
  '肿瘤医院': 'Cancer hospital',
  '心血管医院': 'Cardiovascular hospital',
  '神经外科医院': 'Neurosurgery hospital',
  '骨科医院': 'Orthopedic hospital',
  '眼科医院': 'Ophthalmology hospital',
  '皮肤科医院': 'Dermatology hospital',
  '泌尿科医院': 'Urology hospital',
  '消化科医院': 'Gastroenterology hospital',
  '呼吸科医院': 'Respiratory hospital',
  '内分泌科医院': 'Endocrinology hospital',
  '免疫科医院': 'Immunology hospital',
  '风湿科医院': 'Rheumatology hospital',
  '血液科医院': 'Hematology hospital',
  '感染科医院': 'Infectious disease hospital',
  '精神科医院': 'Psychiatric hospital',
  '康复科医院': 'Rehabilitation hospital',
  '麻醉科': 'Anesthesiology department',
  '手术室': 'Operating room',
  '消毒供应中心': 'Sterile supply center',
  '内镜中心': 'Endoscopy center',
  '导管室': 'Catheterization lab',
  '介入中心': 'Interventional center',
  '影像中心': 'Imaging center',
  '检验中心': 'Laboratory center',
  '病理中心': 'Pathology center',
  '输血科': 'Blood transfusion department',
  '供应室': 'Supply room',
  '设备科': 'Equipment department',
  '采购科': 'Procurement department',
  '后勤部': 'Logistics department',
  '财务部': 'Finance department',
  '人事部': 'HR department',
  '医务科': 'Medical affairs department',
  '护理部': 'Nursing department',
  '院感科': 'Infection control department',
  '质控科': 'Quality control department',
  '科教部': 'Education and research department',
  '信息科': 'Information department',
  '保卫科': 'Security department',
  '膳食科': 'Catering department',
  '设备处': 'Equipment office',
  '后勤处': 'Logistics office',
  '采购处': 'Procurement office',
  '财务处': 'Finance office',
  '人事处': 'HR office',
  '医务处': 'Medical affairs office',
  '护理处': 'Nursing office',
  '院感处': 'Infection control office',
  '质控处': 'Quality control office',
  '科教处': 'Education office',
  '信息处': 'Information office',
  '保卫处': 'Security office',
  '膳食处': 'Catering office'
};

// Category translations
const categoryTranslations = {
  '光源系统': 'Light Source System',
  '灌注系统': 'Irrigation System',
  '摄像系统': 'Camera System',
  '气腹机': 'Insufflator',
  '手术器械': 'Surgical Instruments',
  '监视器': 'Monitor',
  '台车': 'Trolley',
  '配件': 'Accessories',
  ' recorder': 'Recorder',
  '吸引器': 'Aspirator',
  '加热器': 'Warming Unit'
};

function translateFeature(text) {
  if (!text) return text;

  // Check exact match first
  if (featureTranslations[text]) {
    return featureTranslations[text];
  }

  // Translate common patterns
  let translated = text
    .replace(/质保/g, 'Warranty: ')
    .replace(/保修/g, 'Warranty')
    .replace(/型号/g, 'Model: ')
    .replace(/适用/g, 'Application: ')
    .replace(/用于/g, 'For ')
    .replace(/规格/g, 'Specification: ')
    .replace(/尺寸/g, 'Size: ')
    .replace(/重量/g, 'Weight: ')
    .replace(/功率/g, 'Power: ')
    .replace(/电压/g, 'Voltage: ')
    .replace(/电流/g, 'Current: ')
    .replace(/频率/g, 'Frequency: ')
    .replace(/温度/g, 'Temperature: ')
    .replace(/湿度/g, 'Humidity: ')
    .replace(/压力/g, 'Pressure: ')
    .replace(/流量/g, 'Flow: ')
    .replace(/容量/g, 'Capacity: ')
    .replace(/分辨率/g, 'Resolution: ')
    .replace(/像素/g, 'Pixels')
    .replace(/焦距/g, 'Focal length: ')
    .replace(/视角/g, 'View angle: ')
    .replace(/光圈/g, 'Aperture: ')
    .replace(/增益/g, 'Gain: ')
    .replace(/白平衡/g, 'White balance: ')
    .replace(/伽马/g, 'Gamma: ')
    .replace(/色温/g, 'Color temp: ')
    .replace(/显色/g, 'Color rendering')
    .replace(/照度/g, 'Illuminance: ')
    .replace(/光源/g, 'Light source: ')
    .replace(/LED/g, 'LED ')
    .replace(/寿命/g, 'Lifespan: ')
    .replace(/小时/g, 'hours')
    .replace(/年/g, 'years')
    .replace(/不锈钢/g, 'Stainless steel')
    .replace(/铝合金/g, 'Aluminum alloy')
    .replace(/ABS/g, 'ABS ')
    .replace(/PC/g, 'PC ')
    .replace(/材质/g, 'Material: ')
    .replace(/认证/g, 'Certification')
    .replace(/CE/g, 'CE ')
    .replace(/FDA/g, 'FDA ')
    .replace(/ISO/g, 'ISO ')
    .replace(/医疗/g, 'Medical ')
    .replace(/级/g, '-grade')
    .replace(/高清/g, 'HD')
    .replace(/超高清/g, 'Ultra HD')
  ;

  return translated;
}

function translateFeatures(features) {
  if (!features || !Array.isArray(features)) return features;
  return features.map(f => translateFeature(f));
}

function translateCategory(category) {
  if (!category) return category;
  if (categoryTranslations[category]) {
    return categoryTranslations[category];
  }

  let translated = category
    .replace(/系统/g, ' System')
    .replace(/摄像/g, 'Camera')
    .replace(/光源/g, 'Light Source')
    .replace(/冷光源/g, 'Cold Light Source')
    .replace(/LED/g, 'LED ')
    .replace(/灌注/g, 'Irrigation')
    .replace(/气腹/g, 'Insufflation')
    .replace(/气腹机/g, 'Insufflator')
    .replace(/手术/g, 'Surgical')
    .replace(/器械/g, 'Instruments')
    .replace(/监视/g, 'Monitor')
    .replace(/监视器/g, 'Monitor')
    .replace(/台车/g, 'Trolley')
    .replace(/配件/g, 'Accessories')
    .replace(/录像/g, 'Recording')
    .replace(/ recorder/g, ' Recorder')
    .replace(/吸引/g, 'Aspiration')
    .replace(/吸引器/g, 'Aspirator')
    .replace(/加热/g, 'Warming')
    .replace(/加热器/g, 'Warming Unit')
    .replace(/4K/g, '4K ')
    .replace(/3D/g, '3D ')
    .replace(/高清/g, 'HD ')
    .replace(/超高清/g, 'Ultra HD ')
    .replace(/\s+/g, ' ')
    .trim();

  return translated;
}

async function translateAll() {
  console.log('Starting product features and category translation...\n');

  const { data: products } = await supabase.from('products').select('*');
  console.log(`Found ${products.length} products\n`);

  let translated = 0;
  let errors = 0;

  for (const product of products) {
    const featuresEn = translateFeatures(product.features);
    const categoryEn = translateCategory(product.category);

    console.log(`[${product.id}] ${product.name}`);
    console.log(`  Category: ${product.category} → ${categoryEn}`);
    console.log(`  Features: ${product.features?.length || 0} items`);
    if (product.features?.length > 0) {
      console.log(`    Examples: ${product.features.slice(0, 2).join(', ')}`);
      console.log(`    → ${featuresEn.slice(0, 2).join(', ')}`);
    }

    const { error } = await supabase
      .from('products')
      .update({
        features: featuresEn,
        category: categoryEn
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

translateAll().catch(console.error);
