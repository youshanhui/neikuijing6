const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hd2ZiUGlncmV3cml1bnZ6cWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNzQ5MTAsImV4cCI6MjA0OTY1MDkwMH0.EGYo2RZ2iQ4KjCCpT3W_sO7_BbK2eOG9T9W19l3Y8Y8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .limit(3);

  if (error) {
    console.error('查询错误:', error);
    return;
  }

  console.log('=== 产品表字段 ===');
  console.log('字段:', Object.keys(products[0]).join(', '));
  console.log('\n前3个产品:');
  
  products.forEach((p, i) => {
    console.log(`\n${i + 1}. ${p.name}`);
    console.log(`   image: ${p.image || '(无)'}`);
    console.log(`   image_url: ${p.image_url || '(无)'}`);
  });
}

checkProducts().catch(console.error);
