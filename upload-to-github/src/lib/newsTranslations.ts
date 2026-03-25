// 新闻内容翻译映射
// 使用 MyMemory Translation API 进行全文翻译

// 翻译缓存
const translationCache: Record<string, string> = {};

// 调用 MyMemory API 进行翻译
async function translateWithAPI(text: string, fromLang: string = 'zh-CN', toLang: string = 'en'): Promise<string> {
  // 缓存键
  const cacheKey = `${fromLang}:${toLang}:${text}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    // MyMemory API - 免费翻译API
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${fromLang}|${toLang}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Translation API error');
    }

    const data = await response.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      translationCache[cacheKey] = translated;
      return translated;
    }
  } catch (error) {
    console.warn('Translation API failed, using fallback:', error);
  }

  return text;
}

// 翻译整篇新闻内容（标题、描述、正文）
export async function translateNewsFull(
  title: string,
  shortDescription: string,
  content: string
): Promise<{ title: string; shortDescription: string; content: string }> {
  try {
    // 并行翻译所有字段
    const [translatedTitle, translatedShortDesc, translatedContent] = await Promise.all([
      translateWithAPI(title),
      translateWithAPI(shortDescription),
      translateWithAPI(content)
    ]);

    return {
      title: translatedTitle,
      shortDescription: translatedShortDesc,
      content: translatedContent
    };
  } catch (error) {
    console.error('Translation failed:', error);
    return { title, shortDescription, content };
  }
}

// 新闻类别翻译
export const newsCategoryTranslations: Record<string, string> = {
  '行业动态': 'Industry News',
  '展会信息': 'Exhibition News',
  '产品更新': 'Product Updates',
  '技术文章': 'Technical Articles',
  '公司新闻': 'Company News',
};

// 常见新闻标题关键词翻译
export const newsTitleTranslations: Record<string, string> = {
  '上海世音': 'Shanghai Shiyin',
  '内窥镜': 'Endoscope',
  '腹腔镜': 'Laparoscope',
  '胸腔镜': 'Thoracoscope',
  '关节镜': 'Arthroscope',
  '耳鼻喉内镜': 'ENT Endoscope',
  '泌尿外科': 'Urology',
  '妇科': 'Gynecology',
  '普外科': 'General Surgery',
  '呼吸内科': 'Respiratory Medicine',
  '消化内科': 'Gastroenterology',
  '神经外科': 'Neurosurgery',
  '骨科': 'Orthopedics',
  '新产品': 'New Product',
  '新品发布': 'New Product Launch',
  '技术创新': 'Technical Innovation',
  '展会': 'Exhibition',
  '博览会': 'Expo',
  '国际医疗器械博览会': 'International Medical Device Expo',
  '全国医疗器械博览会': 'National Medical Device Expo',
  'CMEF': 'CMEF',
  '学术会议': 'Academic Conference',
  '研讨会': 'Seminar',
  '培训': 'Training',
  '年会': 'Annual Meeting',
  '高峰论坛': 'Summit Forum',
  '产品发布会': 'Product Launch Event',
  '临床应用': 'Clinical Application',
  '手术演示': 'Surgical Demonstration',
  '案例分享': 'Case Sharing',
  '解决方案': 'Solutions',
  '系统集成': 'System Integration',
  '4K超高清': '4K Ultra HD',
  'LED冷光源': 'LED Cold Light Source',
  '气腹机': 'Insufflator',
  '灌注泵': 'Irrigation Pump',
  '摄像系统': 'Camera System',
  '医用监视器': 'Medical Monitor',
  '获奖': 'Award',
  '认证': 'Certification',
  'ISO认证': 'ISO Certification',
  'CE认证': 'CE Certification',
  'FDA认证': 'FDA Approval',
  'NMPA认证': 'NMPA Approval',
  '荣誉': 'Honor',
  '资质': 'Qualification',
  '合作': 'Cooperation',
  '签约': 'Signing',
  '战略合作': 'Strategic Partnership',
  '经销商': 'Distributor',
  '代理商': 'Agent',
  '合作伙伴': 'Partner',
  '中标': 'Won Bid',
  '采购': 'Procurement',
  '订单': 'Order',
  '出货': 'Shipment',
  '发货': 'Delivery',
  '安装': 'Installation',
  '调试': 'Commissioning',
  '验收': 'Acceptance',
  '临床': 'Clinical',
  '医院': 'Hospital',
  '科室': 'Department',
  '专家': 'Expert',
  '主任': 'Director',
  '教授': 'Professor',
  '博士': 'PhD',
  '医师': 'Physician',
  '医生': 'Doctor',
  '手术': 'Surgery',
  '微创': 'Minimally Invasive',
  '检查': 'Examination',
  '诊断': 'Diagnosis',
  '治疗': 'Treatment',
  '患者': 'Patient',
  '关怀': 'Care',
  '服务': 'Service',
  '支持': 'Support',
  '售后': 'After-sales',
  '保修': 'Warranty',
  '维修': 'Repair',
  '配件': 'Accessories',
  '耗材': 'Consumables',
  '升级': 'Upgrade',
  '更新': 'Update',
  '发布': 'Release',
  '推出': 'Launch',
  '上市': 'Market Launch',
  '走进': 'Visiting',
  '走进医院': 'Hospital Visit',
  '参观': 'Visit',
  '考察': 'Inspection',
  '调研': 'Research',
  '慰问': 'Condolences',
  '公益': 'Charity',
  '捐赠': 'Donation',
  '资助': 'Sponsorship',
  '社会责任': 'Social Responsibility',
  '展望': 'Outlook',
  '回顾': 'Review',
  '年度总结': 'Annual Summary',
  '年终': 'Year-end',
  '新年': 'New Year',
  '元旦': 'New Year',
  '春节': 'Spring Festival',
  '中秋': 'Mid-Autumn Festival',
  '国庆': 'National Day',
  '劳动节': 'Labor Day',
  '清明': 'Qingming Festival',
  '端午': 'Dragon Boat Festival',
};

// 常见描述关键词翻译
export const newsDescriptionTranslations: Record<string, string> = {
  '近日': 'Recently',
  '日前': 'A few days ago',
  '本周': 'This week',
  '本月': 'This month',
  '本季度': 'This quarter',
  '今年': 'This year',
  '近日来': 'Recently',
  '最新消息': 'Latest news',
  '好消息': 'Good news',
  '隆重推出': 'Proudly introduce',
  '正式发布': 'Officially released',
  '正式上市': 'Officially launched',
  '火热进行': 'In full swing',
  '圆满成功': 'Successfully concluded',
  '顺利召开': 'Successfully held',
  '成功举办': 'Successfully organized',
  '顺利完成': 'Successfully completed',
  '取得圆满成功': 'Achieved complete success',
  '获得一致好评': 'Received unanimous praise',
  '深受好评': 'Highly praised',
  '备受关注': 'Received much attention',
  '受到广泛关注': 'Gained wide attention',
  '引领行业': 'Leading the industry',
  '行业领先': 'Industry-leading',
  '技术领先': 'Technology-leading',
  '品质卓越': 'Excellent quality',
  '性能优异': 'Excellent performance',
  '功能强大': 'Powerful features',
  '操作简便': 'Easy to operate',
  '安全可靠': 'Safe and reliable',
  '质量保证': 'Quality guaranteed',
  '值得信赖': 'Trustworthy',
  '专业': 'Professional',
  '专注': 'Focused',
  '创新': 'Innovation',
  '高效': 'Efficient',
  '精准': 'Precise',
  '稳定': 'Stable',
  '可靠': 'Reliable',
  '优质': 'High-quality',
  '卓越': 'Outstanding',
  '领先': 'Leading',
  '领先技术': 'Leading technology',
  '先进': 'Advanced',
  '尖端': 'Cutting-edge',
  '一流': 'First-class',
  '顶级': 'Top-tier',
  '全球': 'Global',
  '国际': 'International',
  '国内': 'Domestic',
  '国产': 'Made in China',
  '进口': 'Imported',
  '出口': 'Export',
  '外贸': 'Foreign trade',
};

// 内容段落常用短语翻译
export const newsContentTranslations: Record<string, string> = {
  '前言': 'Introduction',
  '概述': 'Overview',
  '背景': 'Background',
  '正文': 'Main Content',
  '详情': 'Details',
  '详细内容': 'Detailed Content',
  '详细介绍': 'Detailed Introduction',
  '详细说明': 'Detailed Description',
  '具体内容': 'Specific Content',
  '具体情况': 'Specific Situation',
  '总结': 'Summary',
  '结语': 'Conclusion',
  '展望': 'Outlook',
  '未来展望': 'Future Outlook',
  '发展前景': 'Development Prospects',
  '市场前景': 'Market Prospects',
  '发展趋势': 'Development Trends',
  '行业趋势': 'Industry Trends',
  '技术趋势': 'Technology Trends',
  '创新技术': 'Innovative Technology',
  '核心技术': 'Core Technology',
  '关键技术': 'Key Technology',
  '先进技术': 'Advanced Technology',
  '应用技术': 'Applied Technology',
  '应用场景': 'Application Scenarios',
  '应用领域': 'Application Areas',
  '适用范围': 'Scope of Application',
  '使用范围': 'Usage Range',
  '使用方法': 'Usage Method',
  '使用说明': 'User Guide',
  '操作指南': 'Operation Guide',
  '安装说明': 'Installation Guide',
  '维护保养': 'Maintenance',
  '注意事项': 'Notes',
  '温馨提示': 'Tips',
  '特别提示': 'Special Notice',
  '重要通知': 'Important Notice',
  '会议通知': 'Meeting Notice',
  '邀请函': 'Invitation',
  '邀请您': 'You are invited',
  '诚挚邀请': 'Sincerely invite',
  '欢迎参加': 'Welcome to participate',
  '期待您的参与': 'Looking forward to your participation',
  '不见不散': 'See you there',
  '联系我们': 'Contact Us',
  '有意者请': 'Those interested please',
  '请致电': 'Please call',
  '请联系我们': 'Please contact us',
  '咨询热线': 'Hotline',
  '全国热线': 'National Hotline',
  '服务热线': 'Service Hotline',
  '商务合作': 'Business Cooperation',
  '洽谈合作': 'Discuss Cooperation',
  '寻求合作': 'Seek Cooperation',
  '合作共赢': 'Win-win Cooperation',
  '互利共赢': 'Mutual Benefit',
  '共创未来': 'Create the Future Together',
  '共谋发展': 'Joint Development',
  '携手共进': 'Move Forward Together',
  '强强联合': 'Strategic Alliance',
  '战略合作': 'Strategic Cooperation',
  '深度合作': 'Deep Cooperation',
  '全面合作': 'Comprehensive Cooperation',
  '长期合作': 'Long-term Cooperation',
  '友好合作': 'Friendly Cooperation',
  '深入交流': 'In-depth Exchange',
  '密切合作': 'Close Cooperation',
  '加强合作': 'Strengthen Cooperation',
  '拓展合作': 'Expand Cooperation',
  '达成合作': 'Reached Cooperation',
  '签订合同': 'Signed Contract',
  '签署协议': 'Signed Agreement',
  '战略签约': 'Strategic Signing',
  '正式签约': 'Officially Signed',
  '成功签约': 'Successfully Signed',
  '达成共识': 'Reached Consensus',
  '达成协议': 'Reached Agreement',
  '顺利签约': 'Smooth Signing',
  '圆满签约': 'Successful Signing',
};

// 翻译函数
export function translateNewsTitle(title: string, targetLang: string = 'en'): string {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    let translated = title;
    // 先处理较长关键词，再处理较短关键词
    const sortedKeys = Object.keys(newsTitleTranslations).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      translated = translated.replace(new RegExp(escapeRegExp(key), 'g'), newsTitleTranslations[key]);
    }
    return translated;
  }
  return title;
}

export function translateNewsCategory(category: string, targetLang: string = 'en'): string {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    return newsCategoryTranslations[category] || category;
  }
  return category;
}

export function translateNewsDescription(description: string, targetLang: string = 'en'): string {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    let translated = description;
    // 先处理较长关键词，再处理较短关键词
    const sortedKeys = Object.keys(newsDescriptionTranslations).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      translated = translated.replace(new RegExp(escapeRegExp(key), 'g'), newsDescriptionTranslations[key]);
    }
    return translated;
  }
  return description;
}

export function translateNewsContent(content: string, targetLang: string = 'en'): string {
  if (targetLang === 'en' || targetLang.startsWith('en')) {
    let translated = content;
    // 先处理较长关键词，再处理较短关键词
    const sortedKeys = Object.keys(newsContentTranslations).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      translated = translated.replace(new RegExp(escapeRegExp(key), 'g'), newsContentTranslations[key]);
    }
    return translated;
  }
  return content;
}

// 辅助函数：转义正则特殊字符
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
