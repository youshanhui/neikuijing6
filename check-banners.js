import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBannersTable() {
  console.log('Checking banners table...\n');

  // Try to fetch all banners
  const { data, error } = await supabase
    .from('banners')
    .select('*');

  if (error) {
    console.error('Error fetching banners:', error);
    console.log('\nPossible issues:');
    console.log('1. The banners table might not exist');
    console.log('2. The table might not have the correct columns');
    console.log('3. RLS policies might be blocking access');
  } else {
    console.log(`Found ${data?.length || 0} banners:`);
    console.log(JSON.stringify(data, null, 2));
  }

  // Check if table exists by trying to get schema
  console.log('\nChecking table schema...');
  const { data: schemaData, error: schemaError } = await supabase
    .rpc('get_table_info', { table_name: 'banners' })
    .catch(() => null);

  if (schemaError) {
    console.log('Could not get schema info (might be permissions issue)');
  }

  // List all tables
  console.log('\nAttempting to check other tables...');
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id')
    .limit(1);

  if (productsError) {
    console.log('Products table check failed:', productsError.message);
  } else {
    console.log('Products table is accessible');
  }
}

checkBannersTable();
