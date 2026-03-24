// 科室解决方案翻译映射

// 科室分类翻译
export const departmentTranslations: Record<string, string> = {
  '消化内科': 'Gastroenterology',
  '呼吸内科': 'Respiratory Medicine',
  '妇科': 'Gynecology',
  '泌尿外科': 'Urology',
  '普外科': 'General Surgery',
  '胸外科': 'Thoracic Surgery',
  '骨科': 'Orthopedics',
  '儿科': 'Pediatrics',
  '神经外科': 'Neurosurgery',
  '心血管内科': 'Cardiology',
  '五官科': 'ENT',
  '眼科': 'Ophthalmology',
  '皮肤科': 'Dermatology',
  '急诊科': 'Emergency Medicine',
  'ICU': 'ICU',
  '麻醉科': 'Anesthesiology',
  '检验科': 'Laboratory Medicine',
  '影像科': 'Radiology'
};

// 科室图标
export const departmentIcons: Record<string, string> = {
  '消化内科': 'Lungs',
  '呼吸内科': 'Lungs',
  '妇科': 'Baby',
  '泌尿外科': 'Microscope',
  '普外科': 'Scissors',
  '胸外科': 'Heart',
  '骨科': 'Bone',
  '儿科': 'Baby',
  '神经外科': 'Brain',
  '心血管内科': 'Heart',
  '五官科': 'Ear',
  '眼科': 'Eye',
  '皮肤科': 'Hand',
  '急诊科': 'AlertCircle',
  'ICU': 'Activity',
  '麻醉科': 'Syringe',
  '检验科': 'TestTube',
  '影像科': 'Monitor'
};

// 解决方案常见特征翻译
export const featureTranslations: Record<string, string> = {
  '高清摄像': 'HD Camera',
  '4K超高清': '4K Ultra HD',
  '微创手术': 'Minimally Invasive',
  '精确诊断': 'Precise Diagnosis',
  '安全可靠': 'Safe and Reliable',
  '操作简便': 'Easy Operation',
  '图像清晰': 'Clear Imaging',
  '实时监控': 'Real-time Monitoring',
  '多功能集成': 'Multi-function Integration',
  '低辐射': 'Low Radiation',
  '高分辨率': 'High Resolution',
  '宽视角': 'Wide Viewing Angle',
  '色彩还原': 'Accurate Color',
  '自动对焦': 'Auto Focus',
  '光学变焦': 'Optical Zoom',
  '数字变焦': 'Digital Zoom',
  '图像存储': 'Image Storage',
  '远程会诊': 'Telemedicine',
  '教学演示': 'Teaching Demo',
  '手术录制': 'Surgical Recording',
  '三维成像': '3D Imaging',
  '荧光显影': 'Fluorescence Imaging',
  '窄带成像': 'NBI (Narrow Band Imaging)',
  '放大观察': 'Magnified Observation',
  '活检取样': 'Biopsy Sampling',
  '止血功能': 'Hemostasis Function',
  '切割功能': 'Cutting Function',
  '凝固功能': 'Coagulation Function',
  '冲洗吸引': 'Irrigation & Suction',
  '气体过滤': 'Gas Filtration',
  '温控系统': 'Temperature Control',
  '防雾设计': 'Anti-fog Design',
  '防水等级IPX7': 'Waterproof IPX7',
  '高温高压灭菌': 'Autoclavable',
  '符合人体工程学': 'Ergonomic Design',
  '轻量化设计': 'Lightweight Design',
  '长寿命光源': 'Long-life Light Source',
  'LED冷光源': 'LED Cold Light',
  '光纤传输': 'Fiber Optic Transmission',
  '无线连接': 'Wireless Connection',
  '模块化设计': 'Modular Design',
  '可扩展性': 'Scalable',
  '智能报警': 'Smart Alarm',
  '数据导出': 'Data Export',
  '云存储': 'Cloud Storage',
  '远程诊断': 'Remote Diagnosis',
  'AI辅助诊断': 'AI-assisted Diagnosis',
  '5G连接': '5G Connection',
  '4K录制': '4K Recording',
  '实时传输': 'Real-time Streaming',
  '多屏显示': 'Multi-screen Display',
  '触摸屏操作': 'Touch Screen Operation',
  '语音控制': 'Voice Control',
  '手势识别': 'Gesture Control',
  '眼控追踪': 'Eye Tracking',
  '术前规划': 'Preoperative Planning',
  '术中导航': 'Intraoperative Navigation',
  '术后分析': 'Postoperative Analysis',
  '3D重建': '3D Reconstruction',
  '虚拟现实': 'Virtual Reality',
  '增强现实': 'Augmented Reality',
  '混合现实': 'Mixed Reality',
  '术前模拟': 'Preoperative Simulation',
  '教学培训': 'Training & Education',
  '学术研究': 'Academic Research',
  '病例管理': 'Case Management',
  '随访追踪': 'Follow-up Tracking',
  '质量控制': 'Quality Control',
  '标准流程': 'Standard Protocol',
  '认证标准': 'Certified Standards',
  'ISO认证': 'ISO Certified',
  'CE认证': 'CE Certified',
  'FDA认证': 'FDA Approved',
  'NMPA认证': 'NMPA Approved'
};

// 翻译函数
export function translateDepartment(department: string, targetLang: string = 'en'): string {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    return departmentTranslations[department] || department;
  }
  return department;
}

export function translateFeatures(features: string[], targetLang: string = 'en'): string[] {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    return features.map(f => featureTranslations[f] || f);
  }
  return features;
}

export function translateDepartmentIcon(department: string): string {
  return departmentIcons[department] || 'Hospital';
}
