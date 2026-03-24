const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

const solutionsEn = [
  {
    id: 1,
    name: 'General Surgery Solutions',
    description: 'Our 4K laparoscopic system provides crystal-clear visualization for general surgery procedures including cholecystectomy, appendectomy, and gastrointestinal surgery. The high-definition imaging enables precise dissection and minimal tissue trauma.'
  },
  {
    id: 2,
    name: 'Thoracic Surgery Solutions',
    description: 'Thoracoscopic surgery is considered one of the most revolutionary breakthroughs in thoracic surgery at the end of the 20th century. Our advanced thoracoscopy system provides excellent visualization for lobectomy, esophageal surgery, and thymectomy procedures.'
  },
  {
    id: 3,
    name: 'Gynecology Solutions',
    description: 'Hysteroscopic surgery using our advanced endoscopic system allows clear visualization of the uterine cavity for accurate diagnosis and treatment. Ideal for myomectomy, ovarian cyst removal, and ectopic pregnancy surgery.'
  },
  {
    id: 4,
    name: 'Abdominal Surgery Solutions',
    description: 'Laparoscopic technology provides minimally invasive access allowing surgeons to clearly view pelvic and abdominal structures. Our system offers superior image quality for various abdominal procedures.'
  },
  {
    id: 5,
    name: 'ENT Surgery Solutions',
    description: 'Microsurgery using suspension laryngoscopy combined with our advanced endoscopic system provides clear imaging for precise surgical procedures. Ideal for sinus surgery, vocal cord polyp removal, and ear endoscopy.'
  }
];

async function updateSolutions() {
  console.log('更新解决方案为英文...\n');

  for (const sol of solutionsEn) {
    const { data, error } = await supabase
      .from('solutions')
      .update({
        name: sol.name,
        description: sol.description
      })
      .eq('id', sol.id)
      .select();

    if (error) {
      console.log(`❌ 更新 ${sol.id} 失败:`, error.message);
    } else {
      console.log(`✅ 更新 ${sol.id}: ${sol.name}`);
    }
  }

  console.log('\n解决方案更新完成！');
}

updateSolutions();
