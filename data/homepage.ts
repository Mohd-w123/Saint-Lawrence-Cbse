import { images } from "@/lib/images";

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "#",
    children: [
      "About Mayoor",
      "Legacy & Leadership",
      "Management & Board",
      "Directors' Desk",
      "Facilities",
    ],
  },
  {
    label: "Admissions",
    href: "#",
    children: ["Admission Process", "Fee Structure"],
  },
  {
    label: "Academics",
    href: "#",
    children: ["Curriculum Overview", "Pre-school Program"],
  },
  { label: "Awards", href: "#" },
  {
    label: "Resources",
    href: "#",
    children: ["News", "Mayoor Gazette", "Blog", "Gallery", "School App"],
  },
  { label: "Mandatory Public Disclosure", href: "/" },
  { label: "Contact Us", href: "#" },
];

export const newsItems = [
  {
    title:
      'Investiture Ceremony 2026–27 | Mayoor School Jaipur. "Empowering Young Minds Today, Inspiring Tomorrow\'s Leaders."',
    date: "18th July'26",
    excerpt:
      "Mayoor School Jaipur proudly conducted its Investiture Ceremony for the academic session 2026–27, graced by Sh. Himanshu Kuldeep, Additional Superintendent of Police, Anti-Corruption Bureau, Jaipur, as the Chief Guest.",
    image: images.news.investiture,
  },
  {
    title:
      "Inter-House Sports Competitions: Celebrating Talent, Skills & Sportsmanship.",
    date: "8th - 10th July'26",
    excerpt:
      "The Inter-House Sports Competitions for Grades I to XI were successfully organised in Tennis, Squash, Skating, Badminton, and Table Tennis.",
    image: images.news.sports,
  },
  {
    title:
      "Shark Tank Season 2: Celebrating Young Entrepreneurs at Mayoor School Jaipur.",
    date: "4th July'26",
    excerpt:
      "Mayoor School Jaipur successfully organised the Second Season of Shark Tank, celebrating innovation, creativity, and entrepreneurial spirit among students.",
    image: images.news.sharkTank,
  },
  {
    title: "Splash, Fun & Frolic: Pool Party for Early Years Students.",
    date: "29th June'26",
    excerpt:
      "A fun-filled Pool Party was organised for the little toddlers of Early Years I, II, and III during the scorching summer days.",
    image: images.news.poolParty,
  },
  {
    title:
      "Mayoor School Jaipur Organizes Star Gazing Camp Before Summer Breaks.",
    date: "13th-14th May'26",
    excerpt:
      "Mayoor School Jaipur organized an exciting Star Gazing Activity for students from Grades I to XI before the commencement of summer breaks.",
    image: images.news.starGazing,
  },
  {
    title:
      "Mayoor School Jaipur Hosts Fourth Consecutive Inter-School STEM Challenge.",
    date: "12th May'26",
    excerpt:
      "Mayoor School Jaipur successfully hosted the fourth consecutive season of its much-awaited Inter-School STEM Competition.",
    image: images.news.stem,
  },
];

export const testimonials = [
  {
    quote:
      "As a doctor and mother, I value Mayoor School Jaipur's nurturing environment. The school combines academic excellence with holistic development, fostering empathy, confidence, and curiosity.",
    name: "Dr. Anju Sharma",
    role: "Mother of Nyra Sharma (Grade I-Tulip)",
    image: images.testimonials.anju,
  },
  {
    quote:
      "Mayoor School Jaipur seamlessly combines academic excellence with holistic development. The dedicated teachers provide personal attention, fostering a love for learning beyond textbooks.",
    name: "Ms. Aayushi and Mr. Ankit Agarwal",
    role: "Proud parents of Ayansh Agarwal (Grade I-Orchid)",
    image: images.testimonials.agarwal,
  },
  {
    quote:
      "I've witnessed the school's holistic approach to nurturing young minds, blending academic excellence with overall development. Co-curricular activities are a standout feature.",
    name: "Dr. Shruti Thapar",
    role: "Parent of Mahransh Maan (Grade III-Orchid)",
    image: images.testimonials.thapar,
  },
  {
    quote:
      "Thanks to the incredible support from the Mayoor School team, our son adapted smoothly and confidently. The Himachal trekking trip was a transformative experience for him.",
    name: "Ms. Astha & Mr. Himanshu Kapoor",
    role: "Parent of Aadit Kapoor (Grade VII-Orchid)",
    image: images.testimonials.astha,
  },
];

export const whyChooseUsCards = [
  {
    title: "Good Teachers and Staffs",
    description:
      "Our dedicated faculty brings expertise, warmth, and personal attention to every classroom, ensuring each child feels seen and supported.",
    image: images.teachers,
  },
  {
    title: "We Value Good Characters",
    description:
      "Character education is woven into daily life at Mayoor — building integrity, empathy, and responsibility alongside academic achievement.",
    image: images.character,
  },
  {
    title: "Your Children are Safe",
    description:
      "A secure, GPS-tracked campus with trained staff gives parents peace of mind while students explore, learn, and grow with confidence.",
    image: images.safety,
  },
];

export const visionStages = [
  {
    name: "Chetna",
    grades: "Early Year I, II, & III",
    description:
      "The foundational preschool stage. Chetna embodies consciousness, awareness, perception, and insight, gently nurturing young minds to explore, understand, and grow.",
  },
  {
    name: "Ananda",
    grades: "Grades I-II",
    description:
      "Joy, laughter, and glee open an impressionable mind to learning. We call this early phase of enchantment and bliss 'Ananda', where the love of school begins.",
  },
  {
    name: "Kalpana",
    grades: "Grades III-V",
    description:
      "Children imagine boldly and explore inventive ideas. Flights of fancy fuel their thinking — we call this 'Kalpana', the innate creative power of the mind.",
  },
  {
    name: "Jigyasa",
    grades: "Grades VI-VIII",
    description:
      "A wealth of experiences sparks genuine curiosity. This is the right moment to introduce scientific enquiry as a growing mind develops a deeper 'Jigyasa'.",
  },
  {
    name: "Sadhana",
    grades: "Grades IX-XII",
    description:
      "The drive to express skill and talent takes hold. Through practice and perseverance, this phase of 'Sadhana' empowers the self in its totality.",
  },
];

export const developmentPillars = [
  {
    title: "Establishing Identity",
    description:
      "Understanding who they are and what they value is essential to building a sense of purpose and direction in life.",
    image: images.shooting,
  },
  {
    title: "Clarifying Purpose",
    description:
      "A clear sense of purpose gives students motivation, direction, and focus for their education and career paths.",
    image: images.chess,
  },
  {
    title: "Developing Integrity",
    description:
      "Integrity means becoming responsible, trustworthy individuals who make sound decisions and stand up for their beliefs.",
    image: images.integrity,
  },
  {
    title: "Developing Competence",
    description:
      "Students gain the skills and knowledge they need to succeed in school, work, and life through problem-solving and critical thinking.",
    image: images.competence,
  },
  {
    title: "Managing Emotions",
    description:
      "Learning to regulate emotions, cope with stress, and make healthy decisions supports both personal and academic lives.",
    image: images.emotions,
  },
  {
    title: "Becoming Autonomous",
    description:
      "Autonomy is about independence and self-determination — taking ownership of one's learning and decisions.",
    image: images.autonomous,
  },
];

export const manifestoPoints = [
  {
    title: "Personalized Learning",
    text: "Every child learns differently. We help each student find their own pace and path through personal attention, hands-on projects, and smart use of technology.",
  },
  {
    title: "Equal Opportunity for Every Learner",
    text: "We make sure every child — regardless of background or ability — gets the resources, support, and encouragement needed to succeed.",
  },
  {
    title: "Thinking and Problem-solving",
    text: "Our classrooms are places where questions are encouraged and ideas are explored. Students learn to think deeply and find real-world solutions.",
  },
  {
    title: "Creativity and Innovation",
    text: "Whether through art, science, or entrepreneurship, our students learn to create, experiment, and express their ideas with confidence.",
  },
  {
    title: "Teamwork and Communication",
    text: "Group projects, discussions, and presentations teach students how to share ideas, listen to others, and lead with empathy.",
  },
];

export const faqItems = [
  {
    question: "Which board is Mayoor School Jaipur affiliated with?",
    answer:
      "Mayoor School Jaipur follows the CBSE curriculum. Our learning is structured across five developmental stages — Chetna, Ananda, Kalpana, Jigyasa, and Sadhana — each designed to match a child's natural growth and curiosity.",
  },
  {
    question:
      "What is the admission process at Mayoor School Jaipur for the 2026–27 session?",
    answer:
      'Admissions are open for Nursery to Grade IX and Grade XI. Parents can apply through the "Apply Now" form on our website. Once your application is submitted, our admissions team will reach out with the next steps.',
  },
  {
    question:
      "From what grade can my child take admission at Mayoor School Jaipur?",
    answer:
      "Mayoor welcomes children from Early Year I (Nursery) all the way through Grade XII, supporting every stage of a child's educational journey under one roof.",
  },
  {
    question: "Does Mayoor offer English-medium education in Jaipur?",
    answer:
      "Yes, Mayoor School Jaipur is a fully English-medium school. All subjects are taught in English, building strong communication skills and academic fluency alongside the CBSE curriculum.",
  },
  {
    question: "What facilities does Mayoor School Jaipur provide?",
    answer:
      "Our campus includes modern classrooms, STEM and STEAM labs, sports facilities including shooting and chess, a safe transport system, and spaces designed for arts, culture, and creative expression.",
  },
  {
    question:
      "Where is Mayoor School Jaipur located, and is transport available?",
    answer:
      "Mayoor School Jaipur is located at ITS 1, IT Park Road, EPIP, Sitapura, Jaipur – 302022, Rajasthan. Safe, GPS-tracked transport with trained staff is available across key routes in the city.",
  },
  {
    question: "What makes Mayoor stand out among CBSE schools in Jaipur?",
    answer:
      "Mayoor combines academic excellence with holistic growth, experienced faculty, modern classrooms, STEAM learning, a safe campus, and values like empathy, integrity, perseverance, and autonomy.",
  },
  {
    question: "Where can I find the fee structure and apply online?",
    answer:
      'The fee structure is available under Mandatory Disclosures on our website. You can apply anytime through the "Apply Now" button on the homepage or admissions page.',
  },
];

export const footerLinks = {
  quick: ["About Us", "Admissions", "Academics", "Awards", "Gallery", "Contact"],
  important: [
    "Privacy Policy",
    "Disclosures",
    "School News",
    "Admissions",
    "Download Notice",
    "School Prospectus",
  ],
};
