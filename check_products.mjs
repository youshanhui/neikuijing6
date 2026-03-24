import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category')
    .order('id');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('Total products:', data.length);
  console.log('\nAll products:');
  data.forEach(p => {
    console.log(`ID: ${p.id}, Name: ${p.name}, Category: ${p.category}`);
  });
}

checkProducts();
