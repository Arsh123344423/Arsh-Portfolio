import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Verified Resume Knowledge Base for Arsh Srivastava.
 * All responses must strictly and exclusively ground on these facts.
 */
export const RESUME_CONTEXT = {
  personal: {
    name: 'Arsh Srivastava',
    location: 'Noida, UP, India',
    email: 'arxhdev3@gmail.com',
    linkedin: 'linkedin.com/in/arshsrivastava72235a300',
    github: 'github.com/Arsh123344423',
    portfolio: 'Available on this site',
  },
  education: {
    institution: 'Bennett University',
    location: 'Greater Noida, UP',
    degree: 'Bachelor of Science in Computer Science',
    duration: 'Aug. 2023 – May 2027',
    cgpa: '9.00 / 10.00',
    coursework: [
      'Data Structures & Algorithms',
      'Algorithms Analysis',
      'Computer Architecture',
      'Database Management',
      'Software Development',
      'Artificial Intelligence',
      'AI Agent Architecture',
      '3D Interactive UI/UX',
    ],
  },
  projects: [
    {
      name: 'SkillCAD EV',
      date: 'June 2026',
      techStack: 'LangGraph, Gemini, Kafka, DynamoDB, AWS (EC2/ECS/S3), FastAPI',
      github: 'https://github.com/Arsh123344423/SkillCAD_EV_V1',
      points: [
        'Deployed a multi-agent EV battery and supply-chain platform on AWS (ECS/EC2/S3), streaming telemetry through Kafka into MongoDB for real-time RUL prediction via LangGraph-orchestrated agents.',
        'Quantified EV supply-chain risk for India by modeling suppliers as a directed graph (NetworkX) with Gemini function-calling agents tied to KABIL and the ACC PLI scheme.',
      ],
    },
    {
      name: 'SwiftTrans',
      date: 'Jan 2025',
      techStack: 'Gen AI, JavaScript, Vercel AI SDK, CockroachDB',
      github: 'https://github.com/Arsh123344423/SwiftTrans',
      points: [
        'Improved backend throughput roughly 3x over a single-node setup by building a distributed, fault-tolerant fintech backend on CockroachDB, benchmarked under load.',
        'Reduced manual review overhead via a Gen AI transaction validation pipeline (Vercel AI SDK), and delivered low-latency JWT-authenticated REST APIs.',
      ],
    },
    {
      name: 'Git (git-scm) — Open Source Contribution',
      date: 'Jan 2025',
      techStack: 'C',
      github: 'https://github.com/git/git/pull/2233',
      points: [
        'Submitted a pull request to Git improving the checkout "dirty files" advisory message, clarifying guidance shown to CLI users when checkout is blocked by local changes (PR #2233, under maintainer review).',
      ],
    },
    {
      name: 'KalaKatha',
      date: 'Sept 2025',
      techStack: 'Flutter, Firebase, Vercel AI SDK, Google Maps',
      github: 'https://github.com/Arsh123344423/KalaKatha',
      points: [
        "KalaKatha is a platform that empowers India's traditional artisans by connecting them directly with buyers. Discover authentic handcrafted treasures, explore unique crafts, and support the preservation of cultural heritage. Every piece tells a story, and every purchase preserves a legacy.",
        "Implemented Outh for user access.",
        "Helped End users find local Artisans near their locations.",
        "Helped Artisans buy and sell products via integrated payment systems and AI powered Social media boost."
      ],
    },
    {
      name: 'VectorShift',
      date: 'June 2026',
      techStack: 'LLM, React, Tailwind CSS, Node.js, Python',
      github: 'github.com/Arsh123344423/VectorShift_test',
      points: [
        "VectorShift is a platform for users to drag and drop different components to create AI pipeline services.",
        "Users can create their own AI agents and pipelines using the components in the platform.",
        "Used ReactFlow for the drag and drop interface."
      ],
    },
    {
      name: 'PLQ : PII reduction pipeline',
      date: 'June 2026',
      techStack: 'NER, Scikit-learn, spaCy, Pandas, Python, Regex, Presidio',
      github: 'github.com/Arsh123344423/PlQ',
      points: [
        "Email address detection achieved perfect precision and recall (as regex is enough to get them)",
        "Strong and reliable detection of structured entities",
        "Hybrid approach meaningfully improved overall recall",
        "Consistent replacement mapping preserved document coherence"
      ],
    }
  ],
  experience: [
    {
      company: 'SyinQ (Start-up)',
      role: 'React Native Developer Intern',
      location: 'Remote',
      duration: 'Jan 2026 – May 2026',
      points: [
        'Improved mobile session reliability by migrating the authentication system to refresh tokens, eliminating random forced logouts, while maintaining CI/CD pipeline uptime across releases.',
        'Reduced onboarding drop-off ahead of the Version 2 launch by rebuilding core UI flows through iterative, agile development cycles.',
        'Enabled end-to-end user engagement features by designing and implementing login and push notification (Twilio) systems for the production mobile app.',
        'Improved code quality and maintainability by diagnosing and resolving iOS/Android performance issues, incorporating senior engineer feedback through code review.',
      ],
    },
    {
      company: 'Deliotte virtual internship',
      role: 'Data Analyst',
      location: 'Remote',
      duration: 'Dec 2025',
      points: [
        "Used tableau to analyze large datasets and create visualizations",
        "Performed data cleaning and preprocessing to ensure data quality",
        "Created visualizations and dashboards to communicate insights to stakeholders"
      ],
    }, {
      company: 'Social Winter of Code',
      role: 'Mentor',
      location: 'Remote',
      duration: 'Jan 2026 - May 2026',
      points: [
        'Mentored 15+ students in various programming languages including C++, Python, and Java.',
        'Conducted regular doubt-solving sessions and code reviews to help students improve their programming skills.',
        'Mentored over 3+ projects.'
      ]
    }
  ],
  technicalSkills: {
    languages: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'],
    developerTools: [
      'DynamoDB',
      'Azure Cloud',
      'AWS (EC2, ECS, S3)',
      'Docker',
      'Kubernetes',
      'VS Code',
      'Git/GitHub',
      'Android Studio',
      'Google Cloud Platform',
      'Tableau',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'SQLite',
    ],
    competitiveProgramming: 'LeetCode: 550+ solved | CodeChef: 4★ 1751 (Highest)',
    frameworksAndTech: ['RESTful APIs', 'FastAPI', 'Linux', 'React', 'React Native', 'LangChain', 'LangGraph'],
  },
  leadershipAndExtracurricular: {
    research: [
      'Co-authoring "Multi-Modal Spatio-Temporal Mapping via Drone", Bennett University (Feb–May 2026)',
      'AI Society Junior Core Research Team, Bennett University (2023–2024)',
    ],
    recognition: [
      "Dean's List Award, Bennett University (Spring 2025)",
      'Gen AI Academy & Google Cloud Certification – Gold League, Google (2025)',
      'McKinsey Forward (2026)',
    ],
  },
  certifications: [
    'Data Structures and Performance (Coursera) – University of California San Diego (Aug 2024)',
    'Operating Systems and You: Becoming a Power User – Google (Jan 2025)',
    'Object-Oriented Data Structures in C++ (Coursera) – University of Illinois Urbana-Champaign (Oct 2024)',
    'Algorithmic Toolbox (Coursera) – University of California San Diego (Jan 2026)',
    'Databases and SQL for Data Science with Python (Coursera) – IBM (Aug 2024)',
  ],
};

const SYSTEM_INSTRUCTIONS = `You are Arsh Srivastava's official AI Portfolio Assistant.

CRITICAL INSTRUCTIONS & STRICT RESUME-ONLY CONSTRAINT:
1. You must ONLY answer questions based STRICTLY and EXCLUSIVELY on the verified resume details provided below.
2. ABSOLUTELY NOTHING outside of this verified resume may be stated, inferred, or invented about Arsh.
3. If a user asks any question about Arsh's personal life, hobbies, unrelated past companies, unverified credentials, or topics not explicitly documented in this resume, politely reply:
"I am programmed to only share verified information directly from Arsh Srivastava's official resume (education at Bennett University, projects like SkillCAD EV and SwiftTrans, experience at SyinQ, competitive programming, and certifications)."
4. Keep your answers concise, structured in clear markdown (bullet points, bold highlights), professional, and accurate.
5. When asked about projects show only top 3 based on your understanding.
6. If someone asks any other projects he did then show the remaining projects from the verified resume. If None then reply "No projects found".
7. When someone asks about Arsh tell them he is also a national level football player meaning he is also a charesmatic team player.
8. if someone asks you about Arsh's hobbies tell them he loves dancing, playing badminton, football and is a true foodie (who also goes to GYM).
9. If someone asks you about Arsh's personality tell them he is an extrovert, charismatic, passionate, ambitious and a leader who always tries to make a difference. and he is always curious to know more and more and a very hard working person.

RESUME DATA:
${JSON.stringify(RESUME_CONTEXT, null, 2)}`;

// --- Rule-based fallback -----------------------------------------------

/**
 * Ordered, mutually-scored keyword buckets. Instead of "first match wins"
 * (which mis-routed multi-topic questions like "what tools does he use at
 * SyinQ"), every bucket is scored against the query and the highest-scoring
 * bucket wins. Ties fall through to the default resume-scope message.
 */
const INTENT_BUCKETS: { keywords: string[]; respond: () => string }[] = [
  {
    keywords: ['who', 'about', 'bio', 'background', 'summary'],
    respond: () =>
      `**Arsh Srivastava** is a Computer Science undergraduate at **Bennett University** (CGPA: **9.00/10**, 2023–2027) based in Noida, UP, India.\n\n` +
      `✦ **Specialization**: AI Agent Architecture (LangGraph, Gemini), Distributed Backend Systems (FastAPI, CockroachDB, Kafka), and Full-Stack/Mobile (React Native, Next.js).\n` +
      `✦ **Experience**: Former React Native Developer Intern at **SyinQ**.\n` +
      `✦ **Competitive Programming**: **550+ LeetCode problems solved** & **4★ on CodeChef** (Highest: 1751).\n` +
      `✦ **Research & Recognition**: Co-authoring drone spatio-temporal mapping research; Dean's List Award; Google Cloud Gold League.`,
  },
  {
    keywords: ['project', 'skillcad', 'swifttrans', 'git', 'pull request', 'open source'],
    respond: () =>
      `Here are **Arsh's key projects** from his verified resume:\n\n` +
      `✦ **SkillCAD EV** *(LangGraph, Gemini, Kafka, DynamoDB, AWS ECS/EC2/S3, FastAPI)*\n` +
      `• Multi-agent EV battery & supply chain platform with real-time RUL prediction via Kafka & MongoDB.\n` +
      `• Quantified India's EV supply-chain risks via directed graph modeling (NetworkX) and Gemini function-calling.\n\n` +
      `✦ **SwiftTrans** *(Gen AI, JavaScript, Vercel AI SDK, CockroachDB)*\n` +
      `• Built a distributed, fault-tolerant fintech backend improving throughput ~3x under load.\n` +
      `• Integrated Gen AI transaction validation (Vercel AI SDK) with JWT-authenticated REST APIs.\n\n` +
      `✦ **Git (git-scm) Open Source Contribution** *(C)*\n` +
      `• PR #2233 improving checkout 'dirty files' CLI advisory messages (under maintainer review).`,
  },
  {
    keywords: ['experience', 'intern', 'syinq', 'job', 'company', 'work history'],
    respond: () =>
      `**Work Experience:**\n\n` +
      `✦ **SyinQ (Start-up)** — *React Native Developer Intern* (Jan 2026 – May 2026 | Remote)\n` +
      `• Migrated authentication to refresh tokens, eliminating forced logouts while sustaining CI/CD uptime.\n` +
      `• Redesigned core Version 2 onboarding UI flows to cut user drop-off.\n` +
      `• Built login & Twilio push notifications for production mobile app.\n` +
      `• Optimized iOS/Android runtime performance through structured code reviews.`,
  },
  {
    keywords: ['skill', 'stack', 'tech', 'language', 'tool', 'framework'],
    respond: () =>
      `**Arsh's Verified Technical Skills:**\n\n` +
      `• **Languages**: Python, Java, C++, JavaScript, TypeScript, SQL, HTML/CSS\n` +
      `• **Frameworks & Libs**: FastAPI, LangChain, LangGraph, React, React Native, RESTful APIs, Linux\n` +
      `• **Cloud & Tools**: AWS (EC2, ECS, S3), DynamoDB, Azure Cloud, Docker, Kubernetes, GCP, Git/GitHub, Android Studio, Figma\n` +
      `• **Competitive Programming**: LeetCode (550+ solved), CodeChef (4★ 1751 rating)`,
  },
  {
    keywords: ['leetcode', 'codechef', 'competitive', ' cp ', 'dsa', 'problem'],
    respond: () =>
      `**Competitive Programming & Problem Solving:**\n\n` +
      `• **LeetCode**: 550+ problems solved across Data Structures & Algorithms.\n` +
      `• **CodeChef**: 4★ rating with highest rating of **1751**.\n` +
      `• **Coursework**: Algorithms Analysis, Data Structures & Algorithms, Object-Oriented DS in C++ (UIUC), Algorithmic Toolbox (UC San Diego).`,
  },
  {
    keywords: ['education', 'college', 'university', 'bennett', 'cgpa', 'degree', 'course'],
    respond: () =>
      `**Education:**\n\n` +
      `✦ **Bennett University** (Greater Noida, UP)\n` +
      `• **Degree**: Bachelor of Science in Computer Science (Aug. 2023 – May 2027)\n` +
      `• **CGPA**: **9.00 / 10.00**\n` +
      `• **Relevant Coursework**: Data Structures & Algorithms, Algorithms Analysis, Computer Architecture, Database Management, Software Development, Artificial Intelligence, AI Agent Architecture, 3D Interactive UI/UX.`,
  },
  {
    keywords: ['research', 'paper', 'award', 'certif', 'leadership', 'drone'],
    respond: () =>
      `**Research, Awards & Certifications:**\n\n` +
      `✦ **Research & Leadership**:\n` +
      `• Co-authoring *"Multi-Modal Spatio-Temporal Mapping via Drone"*, Bennett University (2026).\n` +
      `• AI Society Junior Core Research Team (2023–2024).\n` +
      `• Dean's List Award (Spring 2025).\n` +
      `• Google Cloud & Gen AI Academy – Gold League (2025) | McKinsey Forward (2026).\n\n` +
      `✦ **Certifications**:\n` +
      `• UC San Diego: Data Structures and Performance & Algorithmic Toolbox\n` +
      `• UIUC: Object-Oriented Data Structures in C++\n` +
      `• Google: Operating Systems and You: Becoming a Power User\n` +
      `• IBM: Databases and SQL for Data Science with Python`,
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'github'],
    respond: () =>
      `**Connect with Arsh Srivastava:**\n\n` +
      `• **Email**: [arshsrivastava00@gmail.com](mailto:arshsrivastava00@gmail.com)\n` +
      `• **LinkedIn**: [linkedin.com/in/arshsrivastava72235a300](https://linkedin.com/in/arshsrivastava72235a300)\n` +
      `• **GitHub**: [github.com/Arsh123344423](https://github.com/Arsh123344423)\n` +
      `• **Location**: Noida, UP, India`,
  },
  {
    keywords: ['hi', 'hello', 'hey', 'sup', 'greetings'],
    respond: () =>
      `Hello! I'm **Arsh's AI Assistant**. I can answer anything strictly based on his **official resume**:\n\n` +
      `✦ **Education**: Bennett University (CGPA 9.00/10)\n` +
      `✦ **Projects**: SkillCAD EV, SwiftTrans, Git Open Source (PR #2233)\n` +
      `✦ **Experience**: SyinQ React Native Intern\n` +
      `✦ **Skills & CP**: Python, LangGraph, AWS, LeetCode (550+), CodeChef (4★)\n` +
      `✦ **Research & Certifications**: Drone Mapping Paper, Google Cloud Gold League\n\n` +
      `What would you like to explore?`,
  },
];

const DEFAULT_REPLY =
  `I am programmed to only share verified information directly from **Arsh Srivastava's official resume**.\n\n` +
  `You can ask about his **education at Bennett University (CGPA 9.00)**, **projects (SkillCAD EV, SwiftTrans, Git PR #2233)**, ` +
  `**internship at SyinQ**, **technical skills (Python, LangGraph, AWS, Docker)**, **competitive programming (LeetCode 550+, CodeChef 4★)**, ` +
  `or reach out at **arshsrivastava00@gmail.com**.`;

function generateSmartResumeResponse(query: string): string {
  const q = ` ${query.toLowerCase()} `;

  let bestBucket: (typeof INTENT_BUCKETS)[number] | null = null;
  let bestScore = 0;

  for (const bucket of INTENT_BUCKETS) {
    const score = bucket.keywords.reduce(
      (count, kw) => count + (q.includes(kw) ? 1 : 0),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      bestBucket = bucket;
    }
  }

  return bestBucket ? bestBucket.respond() : DEFAULT_REPLY;
}

// --- Gemini integration ---------------------------------------------------

const GEMINI_MODEL = process.env.GEMINI_MODEL; // fast/cheap, good fit for short Q&A
const GEMINI_TIMEOUT_MS = 8000;
const MAX_MESSAGE_LENGTH = 2000;

async function callGemini(message: string, apiKey: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_INSTRUCTIONS}\n\nUser Question: ${message}` }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text().catch(() => ''));
      return null;
    }

    const data = await response.json();
    const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return typeof generated === 'string' && generated.trim() ? generated : null;
  } catch (err) {
    // Covers network errors and the abort-on-timeout case.
    console.error('Gemini call failed:', err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rawMessage = (body as { message?: unknown })?.message;
  if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const message = rawMessage.trim().slice(0, MAX_MESSAGE_LENGTH);

  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    const generated = await callGemini(message, geminiKey);
    if (generated) {
      return NextResponse.json({ reply: generated });
    }
    // Falls through to the rule-based engine below on any failure/timeout.
  }

  const reply = generateSmartResumeResponse(message);
  return NextResponse.json({ reply });
}