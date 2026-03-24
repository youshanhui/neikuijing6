import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

// 图片映射 - 使用本地相对路径
const imageMap = {
  // 摄像系统 - 4K摄像头
  'SY-SHREK-UHD909': '/uploads/products/4k-camera.png',
  'SY-SHREK-7818': '/uploads/products/4k-camera.png',
  'SY-SHREK-7815': '/uploads/products/4k-camera.png',
  'SY-SHREK-7812': '/uploads/products/4k-camera.png',
  // 冷光源
  'SY-SHREK-7718': '/uploads/products/led-light.png',
  'SY-SHREK-7717': '/uploads/products/led-light.png',
  // 气腹机
  'SY-SHREK-55L': '/uploads/products/co2-insufflator.png',
  'SY-SHREK-40L': '/uploads/products/co2-insufflator.png',
  'SY-SHREK-35L': '/uploads/products/co2-insufflator.png',
  // 灌注泵
  'SY-SHREK-INF': '/uploads/products/irrigation-pump.png',
  // 冲吸泵
  'SY-SHREK-SUC': '/uploads/products/suction.png',
  // 监视器
  'SY-MON-TS': '/uploads/products/monitor.png',
  'SY-MON-STD': '/uploads/products/monitor.png',
  // 台车
  'SY-CART-WS': '/uploads/products/surgery-cart.png',
  'SY-CART-STD': '/uploads/products/surgery-cart.png',
  'SY-CART-3D4K': '/uploads/products/surgery-cart.png',
  // 录像机
  'SY-REC-HD': '/uploads/products/recorder.png',
  // 加热器
  'SY-HEATER': '/uploads/products/heater.png',
  // 吸烟器
  'SY-SMOKE': '/uploads/products/smoke-evacuator.png',
};

async function updateProductImages() {
  console.log('开始更新产品图片...\n');

  // 获取所有产品
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('获取产品失败:', error);
    return;
  }

  console.log(`找到 ${products.length} 个产品\n`);

  let successCount = 0;
  let failCount = 0;

  for (const product of products) {
    // 从description中提取型号
    const modelMatch = product.description?.match(/型号：([^|]+)/);
    const model = modelMatch ? modelMatch[1].trim() : null;

    let newImage = null;

    // 尝试通过型号匹配
    if (model && imageMap[model]) {
      newImage = imageMap[model];
    }

    // 尝试通过产品名称匹配
    if (!newImage) {
      const name = product.name || '';
      if (name.includes('4K') || name.includes('摄像')) {
        newImage = '/uploads/products/4k-camera.png';
      } else if (name.includes('光源') || name.includes('LED')) {
        newImage = '/uploads/products/led-light.png';
      } else if (name.includes('气腹')) {
        newImage = '/uploads/products/co2-insufflator.png';
      } else if (name.includes('灌注')) {
        newImage = '/uploads/products/irrigation-pump.png';
      } else if (name.includes('冲吸') || name.includes('吸引')) {
        newImage = '/uploads/products/suction.png';
      } else if (name.includes('监视器') || name.includes('显示器')) {
        newImage = '/uploads/products/monitor.png';
      } else if (name.includes('台车') || name.includes('推车')) {
        newImage = '/uploads/products/surgery-cart.png';
      } else if (name.includes('录像')) {
        newImage = '/uploads/products/recorder.png';
      } else if (name.includes('加热')) {
        newImage = '/uploads/products/heater.png';
      } else if (name.includes('吸烟')) {
        newImage = '/uploads/products/smoke-evacuator.png';
      }
    }

    if (newImage) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ image: newImage })
        .eq('id', product.id);

      if (updateError) {
        console.log(`❌ 更新失败: ${product.name}`);
        console.log(`   错误: ${updateError.message}`);
        failCount++;
      } else {
        console.log(`✅ 更新成功: ${product.name} -> ${newImage}`);
        successCount++;
      }
    } else {
      console.log(`⚠️ 未找到匹配图片: ${product.name}`);
      failCount++;
    }
  }

  console.log('\n========================================');
  console.log('更新完成！');
  console.log(`成功: ${successCount} 个`);
  console.log(`失败: ${failCount} 个`);
  console.log(`总计: ${products.length} 个`);
  console.log('========================================\n');

  // 验证更新
  const { data: updatedProducts } = await supabase
    .from('products')
    .select('id, name, image');

  console.log('更新后的产品图片:');
  updatedProducts?.forEach(p => {
    console.log(`  ${p.name}: ${p.image}`);
  });
}

updateProductImages().catch(console.error);
