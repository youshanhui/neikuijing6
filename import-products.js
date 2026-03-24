import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

// 产品数据 - 从shshiyin.cn抓取
const productsData = [
  // 医用内窥镜摄像系统
  {
    name: '4K超高清内窥镜摄像系统',
    model: 'SY-SHREK-UHD909',
    category: '摄像系统',
    description: '型号：SY-SHREK-UHD909 | 质保：八年免费保修，八年零费用维护 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室内窥镜手术 | 分辨率：4K分辨率 (3840x2160) | 采用不锈钢材质，稳定耐用 | 紧定螺丝防锈处理，避免短路 | 内部金属保护罩，高抗干扰 | 信号线双屏蔽增强抗干扰',
    features: '{型号,SY-SHREK-UHD909,质保,八年免费保修,适用,全科室内窥镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Video',
    featured: true
  },
  {
    name: '医用内窥镜摄像系统',
    model: 'SY-SHREK-7818',
    category: '摄像系统',
    description: '型号：SY-SHREK-7818 | 质保：八年免费保修，八年零费用维护 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室内窥镜手术 | 采用不锈钢材质，稳定耐用 | 紧定螺丝防锈处理，避免短路 | 内部金属保护罩，高抗干扰 | 信号线双屏蔽增强抗干扰',
    features: '{型号,SY-SHREK-7818,质保,八年免费保修,适用,全科室内窥镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Video',
    featured: true
  },
  {
    name: '医用内窥镜摄像系统',
    model: 'SY-SHREK-7815',
    category: '摄像系统',
    description: '型号：SY-SHREK-7815 | 质保：八年免费保修，八年零费用维护 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室内窥镜手术 | 采用不锈钢材质，稳定耐用 | 紧定螺丝防锈处理，避免短路 | 内部金属保护罩，高抗干扰 | 信号线双屏蔽增强抗干扰',
    features: '{型号,SY-SHREK-7815,质保,八年免费保修,适用,全科室内窥镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Video',
    featured: false
  },
  {
    name: '医用内窥镜摄像系统',
    model: 'SY-SHREK-7812',
    category: '摄像系统',
    description: '型号：SY-SHREK-7812 | 质保：八年免费保修，八年零费用维护 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室内窥镜手术 | 采用不锈钢材质，稳定耐用 | 紧定螺丝防锈处理，避免短路 | 内部金属保护罩，高抗干扰 | 信号线双屏蔽增强抗干扰',
    features: '{型号,SY-SHREK-7812,质保,八年免费保修,适用,全科室内窥镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Video',
    featured: false
  },

  // LED医用内窥镜冷光源
  {
    name: 'LED医用内窥镜冷光源',
    model: 'SY-SHREK-7718',
    category: '冷光源',
    description: '型号：SY-SHREK-7718 | 质保：八年免费保修，八年零费用维护 | 适用：适用于各类内窥镜手术照明 | 光源类型：LED光源，高亮度 | 长寿命设计 | 采用不锈钢材质，稳定耐用',
    features: '{型号,SY-SHREK-7718,质保,八年免费保修,适用,内窥镜手术照明}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Sun',
    featured: true
  },
  {
    name: 'LED医用内窥镜冷光源',
    model: 'SY-SHREK-7717',
    category: '冷光源',
    description: '型号：SY-SHREK-7717 | 质保：八年免费保修，八年零费用维护 | 适用：适用于各类内窥镜手术照明 | 光源类型：LED光源，高亮度 | 长寿命设计 | 采用不锈钢材质，稳定耐用',
    features: '{型号,SY-SHREK-7717,质保,八年免费保修,适用,内窥镜手术照明}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Sun',
    featured: false
  },

  // CO2气腹机
  {
    name: 'CO2气腹机 55L',
    model: 'SY-SHREK-55L',
    category: '气腹机',
    description: '型号：SY-SHREK-55L | 质保：三年免费保修 | 适用：腹腔镜手术 | 充气量：55L/min | 55L大流量充气 | 高精度压力控制 | 安全可靠 | 采用不锈钢材质，稳固耐用',
    features: '{型号,SY-SHREK-55L,质保,三年免费保修,适用,腹腔镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Wind',
    featured: true
  },
  {
    name: 'CO2气腹机 40L',
    model: 'SY-SHREK-40L',
    category: '气腹机',
    description: '型号：SY-SHREK-40L | 质保：三年免费保修 | 适用：腹腔镜手术 | 充气量：40L/min | 40L中流量充气 | 高精度压力控制 | 安全可靠 | 采用不锈钢材质，稳固耐用',
    features: '{型号,SY-SHREK-40L,质保,三年免费保修,适用,腹腔镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Wind',
    featured: false
  },
  {
    name: 'CO2气腹机 35L',
    model: 'SY-SHREK-35L',
    category: '气腹机',
    description: '型号：SY-SHREK-35L | 质保：三年免费保修 | 适用：腹腔镜手术 | 充气量：35L/min | 35L标准流量充气 | 高精度压力控制 | 安全可靠 | 采用不锈钢材质，稳固耐用',
    features: '{型号,SY-SHREK-35L,质保,三年免费保修,适用,腹腔镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Wind',
    featured: false
  },

  // 灌注泵
  {
    name: '医用加压器（灌注泵）',
    model: 'SY-SHREK-INF',
    category: '灌注泵',
    description: '型号：SY-SHREK-INF | 质保：三年免费保修 | 适用：宫腔镜膨宫、泌尿科、关节镜、腹腔镜等手术液体灌注 | 精确压力控制 | 多模式灌注 | 安全可靠 | 采用不锈钢材质，稳固耐用',
    features: '{型号,SY-SHREK-INF,质保,三年免费保修,适用,液体灌注}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Droplet',
    featured: true
  },

  // 冲吸泵
  {
    name: '内窥镜冲洗吸引器',
    model: 'SY-SHREK-SUC',
    category: '冲吸泵',
    description: '型号：SY-SHREK-SUC | 质保：三年免费保修 | 适用：腔镜手术清洗、废液吸引 | 大流量冲洗 | 强效吸引 | 一键式操作 | 采用不锈钢材质，稳固耐用',
    features: '{型号,SY-SHREK-SUC,质保,三年免费保修,适用,腔镜手术清洗}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Vacuum',
    featured: false
  },

  // 相关设备 - 监视器
  {
    name: '监视器（液晶触摸屏）',
    model: 'SY-MON-TS',
    category: '相关设备',
    description: '型号：SY-MON-TS | 质保：一年保修 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室 | 全高清显示 | 液晶触摸屏 | 医用级标准 | 高清晰度图像',
    features: '{型号,SY-MON-TS,质保,一年保修,适用,全科室}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Monitor',
    featured: true
  },
  {
    name: '监视器',
    model: 'SY-MON-STD',
    category: '相关设备',
    description: '型号：SY-MON-STD | 质保：一年保修 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室 | 全高清显示 | 医用级标准 | 高清晰度图像 | 稳固耐用',
    features: '{型号,SY-MON-STD,质保,一年保修,适用,全科室}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Monitor',
    featured: false
  },

  // 台车
  {
    name: '工作站台车',
    model: 'SY-CART-WS',
    category: '相关设备',
    description: '型号：SY-CART-WS | 质保：一年保修 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室 | 加固设计 | 万向轮 | 可调节高度 | 稳固耐用',
    features: '{型号,SY-CART-WS,质保,一年保修,适用,全科室}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'ShoppingCart',
    featured: false
  },
  {
    name: '台车',
    model: 'SY-CART-STD',
    category: '相关设备',
    description: '型号：SY-CART-STD | 质保：一年保修 | 适用：普外科、妇科、耳鼻喉科、骨科、泌尿科等全科室 | 标准设计 | 万向轮 | 稳固耐用 | 承重能力强',
    features: '{型号,SY-CART-STD,质保,一年保修,适用,全科室}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'ShoppingCart',
    featured: false
  },
  {
    name: '台车（3D/4K）',
    model: 'SY-CART-3D4K',
    category: '相关设备',
    description: '型号：SY-CART-3D4K | 质保：一年保修 | 适用：3D腹腔镜、4K内窥镜系统 | 加强设计 | 适配3D/4K设备 | 线缆管理 | 稳固耐用',
    features: '{型号,SY-CART-3D4K,质保,一年保修,适用,3D/4K内窥镜}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'ShoppingCart',
    featured: false
  },

  // 其他设备
  {
    name: '全高清手术录像机',
    model: 'SY-REC-HD',
    category: '相关设备',
    description: '型号：SY-REC-HD | 质保：三个月保修 | 适用：妇科、耳鼻喉科、产科、泌尿科、骨科、胸外科、普外科等全科室手术录像 | 全高清录制 | 长时间录像 | 便捷操作 | 存储容量大',
    features: '{型号,SY-REC-HD,质保,三个月保修,适用,手术录像}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Film',
    featured: false
  },
  {
    name: '内窥镜加热器',
    model: 'SY-HEATER',
    category: '相关设备',
    description: '型号：SY-HEATER | 质保：保修一年 | 适用：普外科、泌尿外科、妇科、骨科、神经外科、心胸外科、五官科等 | 快速加热 | 温度可控 | 安全可靠 | 防止镜头起雾',
    features: '{型号,SY-HEATER,质保,保修一年,适用,防止镜头起雾}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Thermometer',
    featured: false
  },
  {
    name: '吸烟器',
    model: 'SY-SMOKE',
    category: '相关设备',
    description: '型号：SY-SMOKE | 质保：保修一年 | 适用：普外科、泌尿外科、妇科等腹腔镜手术 | 高效过滤 | 低噪音 | 一键式操作 | 净化手术视野',
    features: '{型号,SY-SMOKE,质保,保修一年,适用,腹腔镜手术}',
    image: 'https://www.shshiyin.cn/uploads/allimg/c230613/168662415910910-0-lp.jpg',
    icon: 'Wind',
    featured: false
  }
];

async function importProducts() {
  console.log('开始导入产品数据...\n');

  let successCount = 0;
  let failCount = 0;

  for (const product of productsData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          category: product.category,
          description: product.description,
          features: product.features,
          image: product.image,
          icon: product.icon,
          featured: product.featured
        }, { count: 'exact' });

      if (error) {
        console.log(`❌ 导入失败: ${product.name}`);
        console.log(`   错误: ${error.message}`);
        failCount++;
      } else {
        console.log(`✅ 导入成功: ${product.name} (${product.model})`);
        successCount++;
      }
    } catch (err) {
      console.log(`❌ 导入失败: ${product.name}`);
      console.log(`   错误: ${err}`);
      failCount++;
    }
  }

  console.log('\n========================================');
  console.log('导入完成！');
  console.log(`成功: ${successCount} 个`);
  console.log(`失败: ${failCount} 个`);
  console.log(`总计: ${productsData.length} 个`);
  console.log('========================================\n');

  // 验证导入
  const { data, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' });

  console.log(`数据库中现有 ${count} 个产品`);
}

importProducts().catch(console.error);
