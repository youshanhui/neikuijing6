// 创建 Storage bucket 并上传图片
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  const imagesDir = path.join(__dirname, 'public/uploads/products');

  console.log('=== Supabase Storage 设置 ===\n');

  try {
    // 1. 创建 images bucket (公开访问)
    console.log('1. 创建 images bucket...');
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket('images', {
      public: true,
      fileSizeLimit: 5242880 // 5MB
    });

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ images bucket 已存在');
      } else {
        console.log('❌ 创建 bucket 失败:', bucketError.message);
        // 继续尝试上传
      }
    } else {
      console.log('✅ images bucket 创建成功:', bucket);
    }

    // 2. 列出所有图片文件
    const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp'));
    console.log(`\n2. 找到 ${files.length} 个图片文件:`, files);

    // 3. 上传每个图片
    console.log('\n3. 上传图片...');
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `products/${file}`; // 使用 products 子文件夹

      console.log(`\n   上传 ${file}...`);

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, fileBuffer, {
          contentType: 'image/webp',
          upsert: true
        });

      if (error) {
        console.log(`   ❌ 上传失败:`, error.message);
      } else {
        console.log(`   ✅ 上传成功`);

        // 获取公共 URL
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        console.log(`   📎 URL: ${urlData.publicUrl}`);
      }
    }

    // 4. 验证结果
    console.log('\n4. 验证上传结果...');
    const { data: files2, error: listError } = await supabase.storage
      .from('images')
      .list('products', { limit: 10 });

    if (listError) {
      console.log('   ❌ 列出失败:', listError.message);
    } else {
      console.log('   ✅ Storage 中的文件:', files2?.map(f => f.name));
    }

  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

setupStorage();
