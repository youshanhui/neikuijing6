import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function retryUpdate() {
  console.log('🔄 重试更新剩余的新闻...\n');

  const remainingNews = [
    {
      id: 11,
      title: '中国4K超高清医疗微创领域的发展',
      content: `4K超高清腹腔镜技术作为微创外科的重要发展方向，正在引领手术精准化的新革命。

技术发展历程：

1. 第一代：标清腹腔镜（分辨率640×480）
2. 第二代：高清腹腔镜（分辨率1920×1080）
3. 第三代：全高清腹腔镜（分辨率1920×1080，60帧/秒）
4. 第四代：4K超高清腹腔镜（分辨率3840×2160）

4K技术优势：

1. 画质提升：4K分辨率是全高清的4倍，细节更加清晰
2. 色彩还原：广色域技术，色彩更加真实自然
3. 手术视野：更大范围的手术视野，便于观察整体结构
4. 操作精度：更高的图像清晰度，提高手术精准性

临床应用：

1. 普外科：胃肠、肝胆、疝气等手术
2. 泌尿外科：肾脏、前列腺、膀胱手术
3. 妇科：子宫、卵巢、输卵管手术
4. 胸外科：肺、食管、纵隔手术
5. 骨科：关节镜手术

国产化进程：

1. 技术突破：国内企业已掌握4K核心技术
2. 产品上市：多款国产4K腹腔镜系统上市
3. 临床认可：国产设备在多家三甲医院应用

未来展望：

1. 8K超高清腹腔镜
2. 3D腹腔镜技术
3. 荧光腹腔镜技术
4. 人工智能辅助诊断
5. 远程手术指导系统

声明：本文重在行业资讯普及，不求任何经济效益，如有侵权，及时联系我们。`
    },
    {
      id: 10,
      title: '千亿贴息贷！央行：优先国产自主品牌',
      content: `近日，国家出台医疗设备更新改造贴息贷款政策，为医疗器械行业带来重大利好。

政策要点：

1. 贴息贷款规模：千亿元级别
2. 贷款期限：最长可达3年
3. 贴息比例：由中央财政贴息2.5个百分点
4. 支持方向：重点支持医疗设备更新改造

政策意义：

· 推动医疗设备升级换代
· 促进国产医疗器械发展
· 提升基层医疗机构服务能力
· 推动医疗技术进步

优先支持领域：

1. 医学影像设备（CT、MRI、超声等）
2. 腔镜手术系统
3. 体外诊断设备
4. 康复器械
5. 高端植介入器械

对国产医疗器械的影响：

1. 市场需求增加：贴息贷款将释放大量医疗设备采购需求
2. 国产替代加速：政策明确优先支持国产自主品牌
3. 技术创新推动：企业将有更多资金投入研发
4. 产业链发展：带动上下游产业链协同发展

声明：本文重在行业资讯普及，不求任何经济效益，如有侵权，及时联系我们。`
    }
  ];

  for (const news of remainingNews) {
    const { error } = await supabase
      .from('news')
      .update({ content: news.content })
      .eq('id', news.id);

    if (error) {
      console.log(`❌ ID ${news.id}: ${error.message}`);
    } else {
      console.log(`✅ ID ${news.id}: ${news.title.substring(0, 30)}...`);
    }
  }
}

retryUpdate();
