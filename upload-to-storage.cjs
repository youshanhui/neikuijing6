// 上传图片到 Supabase Storage
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
// 使用 service role key 来上传文件
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hd2ZiYnBpZ3Jld3JpdW52enFibiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE3NDA2MzM2NDYsImV4cCI6MjA1NjIwOTY0Nn0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImages() {
  const imagesDir = path.join(__dirname, 'public/uploads/products');

  console.log('读取图片目录:', imagesDir);

  try {
    // 列出所有图片文件
    const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp'));
    console.log('找到图片文件:', files);

    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `uploads/products/${file}`;

      console.log(`\n上传 ${file}...`);

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, fileBuffer, {
          contentType: 'image/webp',
          upsert: true
        });

      if (error) {
        console.log(`❌ 上传失败:`, error.message);
      } else {
        console.log(`✅ 上传成功:`, data);

        // 获取公共 URL
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        console.log(`📎 公共 URL:`, urlData.publicUrl);
      }
    }

    // 验证上传结果
    console.log('\n验证上传结果...');
    const { data: files2, error: listError } = await supabase.storage
      .from('images')
      .list('uploads/products', { limit: 10 });

    if (listError) {
      console.log('❌ 列出文件失败:', listError.message);
    } else {
      console.log('✅ Storage 中的文件:', files2?.map(f => f.name));
    }

  } catch (err) {
    console.log('❌ 错误:', err.message);
  }
}

uploadImages();
