const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

const supabase = createClient(supabaseUrl, supabaseKey);

const newsEn = [
  {
    id: 1,
    title: '4K Ultra HD Laparoscopic Esophageal Hiatal Hernia Repair',
    content: 'Esophageal hiatal hernia repair is a procedure to correct herniation of abdominal organs through the diaphragmatic esophageal hiatus. Small hernias may be asymptomatic, while large hernias can cause heartburn, acid reflux, dysphagia, chest pain, upper abdominal pain, and chronic iron deficiency anemia.\n\nOur 4K Ultra HD laparoscopic system provides crystal-clear visualization of the surgical field, enabling precise dissection and repair of the diaphragmatic hiatus with minimal invasiveness.'
  },
  {
    id: 2,
    title: 'Knee Arthroscopy: Posterolateral Approach vs Anterior Approach Techniques',
    content: 'The posterolateral approach is one of the important approaches for knee arthroscopy, mainly used for posterior cruciate ligament injuries, lateral meniscus posterior horn tears, and other pathological conditions.\n\nApplied Anatomy:\n1. Popliteal artery: Located behind the knee joint, the most important anatomical landmark\n2. Popliteal vein: Located behind the popliteal artery\n3. Common peroneal nerve: Runs laterally around the fibular neck\n\nOur advanced arthroscopy system provides excellent image quality for precise surgical planning and execution.'
  },
  {
    id: 3,
    title: '4K Ultra HD Laparoscopic Radical Right Nephrectomy',
    content: 'The incidence of kidney cancer in China has been increasing at an alarming rate of 6.5% annually over the past 20 years, ranking second among urinary tumors and becoming a leading cause of cancer death.\n\nOur 4K Ultra HD laparoscopic system provides superior visualization for radical nephrectomy procedures, enabling precise tumor dissection and complete removal while preserving surrounding tissues.'
  },
  {
    id: 4,
    title: '4K Ultra HD Laparoscopic Total Hysterectomy',
    content: 'Laparoscopic total hysterectomy is one of the most common minimally invasive surgeries in gynecology, suitable for the treatment of various uterine diseases.\n\nSurgical indications:\n1. Benign uterine tumors (fibroids, adenomyosis)\n2. Endometrial hyperplasia\n3. Endometrial cancer (early stage)\n4. Cervical cancer (early stage)\n\nOur advanced laparoscopic system provides excellent visualization for safe and efficient hysterectomy procedures.'
  },
  {
    id: 5,
    title: '4K Ultra HD Laparoscopic Pyeloplasty',
    content: 'Pyeloplasty is a surgical procedure used to treat kidney diseases by reconstructing the junction between the renal pelvis and ureter.\n\nThe procedure involves creating a funnel-shaped connection between the renal pelvis and ureter through meticulous suturing, restoring physiological peristalsis and protecting kidney function.\n\nOur 4K Ultra HD system provides exceptional visualization for precise surgical technique and optimal outcomes.'
  }
];

async function updateNews() {
  console.log('更新新闻表为英文...\n');

  for (const news of newsEn) {
    const { data, error } = await supabase
      .from('news')
      .update({
        title: news.title,
        content: news.content
      })
      .eq('id', news.id)
      .select();

    if (error) {
      console.log(`❌ 更新新闻 ${news.id} 失败:`, error.message);
    } else {
      console.log(`✅ 更新新闻 ${news.id}: ${news.title.substring(0, 40)}...`);
    }
  }

  console.log('\n新闻更新完成！');
}

updateNews();
