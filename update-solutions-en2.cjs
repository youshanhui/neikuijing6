const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

const solutionsEn = [
  {
    id: 1,
    title: 'General Surgery Solutions',
    description: 'Our 4K laparoscopic system provides crystal-clear visualization for general surgery procedures.',
    content: 'General surgery laparoscopic solutions including cholecystectomy, appendectomy, and gastrointestinal surgery. High-definition imaging enables precise dissection and minimal tissue trauma.'
  },
  {
    id: 2,
    title: 'Thoracic Surgery Solutions',
    description: 'Advanced thoracoscopy system for lobectomy, esophageal surgery, and thymectomy.',
    content: 'Thoracoscopic surgery is considered a revolutionary breakthrough in thoracic surgery. Our advanced thoracoscopy system provides excellent visualization for various thoracic procedures.'
  },
  {
    id: 3,
    title: 'Gynecology Solutions',
    description: 'Advanced endoscopic system for hysteroscopic and laparoscopic gynecological procedures.',
    content: 'Hysteroscopic surgery using our advanced endoscopic system allows clear visualization of the uterine cavity. Ideal for myomectomy, ovarian cyst removal, and ectopic pregnancy surgery.'
  },
  {
    id: 4,
    title: 'Abdominal Surgery Solutions',
    description: 'Laparoscopic technology for various abdominal procedures with minimal invasiveness.',
    content: 'Laparoscopic technology provides minimally invasive access allowing surgeons to clearly view pelvic and abdominal structures. Our system offers superior image quality.'
  },
  {
    id: 5,
    title: 'ENT Surgery Solutions',
    description: 'Advanced endoscopic system for sinus, laryngeal, and ear surgeries.',
    content: 'Microsurgery using suspension laryngoscopy combined with our advanced endoscopic system provides clear imaging. Ideal for sinus surgery, vocal cord polyp removal, and ear endoscopy.'
  }
];

async function updateSolutions() {
  console.log('更新解决方案为英文...\n');

  for (const sol of solutionsEn) {
    const { data, error } = await supabase
      .from('solutions')
      .update({
        title: sol.title,
        description: sol.description,
        content: sol.content
      })
      .eq('id', sol.id)
      .select();

    if (error) {
      console.log(`❌ 更新 ${sol.id} 失败:`, error.message);
    } else {
      console.log(`✅ 更新 ${sol.id}: ${sol.title}`);
    }
  }

  console.log('\n解决方案更新完成！');
}

updateSolutions();
