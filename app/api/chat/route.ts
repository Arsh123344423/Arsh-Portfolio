import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Portfolio knowledge base
const PORTFOLIO_CONTEXT = {
  name: 'Arsh Srivastava',
  role: 'AI · Full-Stack · Software Developer',
  email: 'arxh.dev3@gmail.com',
  location: 'India (working globally)',
  education: 'Final year B.Tech student',
  sports: 'National level team sports player with high discipline, teamwork, and leadership skills',
  stack: ['TypeScript', 'Next.js', 'React', 'Python', 'Three.js', 'WebGL', 'LangChain', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GSAP', 'Anime.js'],
  projects: [
    {
      name: 'Cortex',
      category: 'AI Research Copilot',
      description: 'An AI copilot that reads, summarizes, and cross-references research papers in real time with a RAG pipeline over user libraries.',
      stack: ['Next.js', 'LangChain', 'PostgreSQL', 'Vector DBs'],
    },
    {
      name: 'Aether',
      category: '3D Product Configurator',
      description: 'A real-time WebGL/Three.js interactive product customizer running smoothly directly in the browser with zero install.',
      stack: ['Three.js', 'React Three Fiber', 'WebGL', 'Shaders'],
    },
    {
      name: 'Sentry',
      category: 'Real-Time Systems Monitor',
      description: 'Distributed telemetry dashboard handling live socket data streams with sub-50ms latency visual alerts.',
      stack: ['Node.js', 'WebSockets', 'TimeSeries DB', 'React'],
    },
    {
      name: 'Kinetic',
      category: 'Design System & Motion Framework',
      description: 'Token-driven component architecture with integrated micro-motion curves for scalable enterprise apps.',
      stack: ['TypeScript', 'CSS Tokens', 'Storybook', 'Figma'],
    }
  ],
  capabilities: [
    'AI & ML Integration (LLM agents, RAG pipelines, Vector Search)',
    'Full-Stack Web Engineering (Next.js, typed APIs, resilient backends)',
    '3D & WebGL Graphics (Three.js interactive shaders, immersive UI)',
    'Motion & Micro-interactions (GSAP, Anime.js, responsive physics)',
    'Design Systems (Token architecture, accessible UI)',
    'Product & Architecture Design (Zero-to-one scalable builds)'
  ],
};

function generateSmartResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('who') || q.includes('about') || q.includes('background') || q.includes('bio') || q.includes('intro')) {
    return `**Arsh Srivastava** is an AI & Full-Stack Software Developer and final-year B.Tech student based in India, working with clients and teams worldwide.\n\nHe specializes in building AI-native products from architecture to polished 3D frontends. In addition to software engineering, Arsh is a **national-level team sports player**, bringing high discipline, resilience, and collaborative energy to every build.`;
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('cortex') || q.includes('aether')) {
    return `Here are some of Arsh's featured builds:\n\n` +
      `✦ **Cortex (AI Research Copilot)**: Real-time RAG pipeline over research papers with vector embeddings.\n` +
      `✦ **Aether (3D Product Configurator)**: Zero-lag WebGL/Three.js customizer in the browser.\n` +
      `✦ **Sentry (Real-Time Systems Monitor)**: Sub-50ms streaming telemetry visualization.\n` +
      `✦ **Kinetic (Design System & Motion)**: Scalable token-driven UI component library.\n\n` +
      `You can explore each of these in the **Selected Work** section below!`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework')) {
    return `**Arsh's Core Tech Stack:**\n\n` +
      `• **Frontend & 3D**: Next.js 15, React 19, TypeScript, Three.js, WebGL/GLSL, GSAP, Tailwind CSS\n` +
      `• **Backend & AI**: Python, Node.js, LangChain, PostgreSQL, Vector Databases (Pinecone/pgvector), WebSockets\n` +
      `• **Architectures**: AI-Native RAG pipelines, Real-Time Distributed Systems, Motion Design Systems`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('freelance') || q.includes('collaborat')) {
    return `You can connect directly with Arsh at **[arxh.dev3@gmail.com](mailto:arxh.dev3@gmail.com)**.\n\nHe is open to select freelance projects, full-stack & AI collaborations, and high-impact engineering opportunities. You can also drop a message through the **Let's Build Together** section below!`;
  }

  if (q.includes('sport') || q.includes('athlete') || q.includes('fitness') || q.includes('personal')) {
    return `Beyond engineering, Arsh is a **national-level team sports player**. This athletic background shapes his work ethic: relentless consistency, split-second problem solving under pressure, and strong team leadership.`;
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('sup')) {
    return `Hello! I'm Arsh's AI assistant. I can tell you about his **AI projects**, **tech stack**, **engineering background**, or help you get in touch. What would you like to explore?`;
  }

  return `Arsh Srivastava is a full-stack engineer and AI specialist with expertise across **Next.js, Python, LangChain, Three.js, and WebGL**.\n\nFeel free to ask about his **projects** (like Cortex or Aether), his **technical stack**, or reach out directly at **arxh.dev3@gmail.com**.`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message || '';

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simulate realistic generation delay for glassmorphic loading experience
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Optional LLM key integration check (OpenAI / Gemini if provided in env)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are the personal AI assistant for Arsh Srivastava's interactive portfolio. Answer concisely, professionally, and warmly in markdown.\nContext: ${JSON.stringify(PORTFOLIO_CONTEXT)}\nUser query: ${message}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generated) {
            return NextResponse.json({ reply: generated });
          }
        }
      } catch {
        // Fallback gracefully to smart rule-based engine
      }
    }

    const reply = generateSmartResponse(message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json(
      { reply: "I'm having a brief connection moment. Feel free to explore Arsh's work below or email him directly at arxh.dev3@gmail.com!" },
      { status: 200 }
    );
  }
}
