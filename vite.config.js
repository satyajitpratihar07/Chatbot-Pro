import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function cleanHtml(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/\s+/g, ' ') // Collapse whitespaces
    .trim();
}

async function performWebSearch(query) {
  try {
    if (!query || query.trim().length === 0) {
      return '';
    }

    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!response.ok) return '';
    const html = await response.text();
    
    // Parse individual search result blocks
    const blocks = html.split('class="links_main');
    const results = [];
    
    for (let i = 1; i < blocks.length && results.length < 5; i++) {
      const block = blocks[i];
      
      const titleMatch = block.match(/class="result__a"[^>]*>([\s\S]*?)<\/a>/i);
      const snippetMatch = block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i);
      
      // Match URL parameter redirect
      const urlMatch = block.match(/href="([^"]*)"/i);

      if (titleMatch && snippetMatch) {
        const title = cleanHtml(titleMatch[1]);
        const snippet = cleanHtml(snippetMatch[1]);
        let url = urlMatch ? urlMatch[1] : '';
        
        // Extract the direct target link from DuckDuckGo redirect queries
        if (url.includes('uddg=')) {
          const parts = url.split('uddg=');
          if (parts[1]) {
            url = decodeURIComponent(parts[1].split('&')[0]);
          }
        }

        results.push({ title, snippet, url });
      }
    }

    if (results.length === 0) return '';

    // Join multiple results in context
    return results.map((r, idx) => {
      return `[Source Website #${idx + 1}]
Title: ${r.title}
URL Link: ${r.url}
Summary Snippet: ${r.snippet}`;
    }).join('\n\n');
  } catch (error) {
    console.error('Local Search Error:', error);
    return '';
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GROQ_API_KEY || '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'groq-proxy-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/groq/chat/completions') && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const reqBody = JSON.parse(body);
                  const messages = reqBody.messages || [];
                  const userMessage = messages[messages.length - 1];
                  const userQuery = userMessage ? userMessage.content : '';

                  if (userQuery) {
                    const searchResults = await performWebSearch(userQuery);
                    if (searchResults) {
                      const currentDate = new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      });

                      messages.unshift({
                        role: 'system',
                        content: `[REAL-TIME SEARCH CONTEXT — CURRENT DATE: ${currentDate}]
CRITICAL DATA OVERRIDE INSTRUCTION: The current year is 2026. The user is asking for current information. The search results below are fetched live from multiple active web pages:
\"\"\"
${searchResults}
\"\"\"
Since your pre-trained knowledge base has a historical knowledge cutoff, you MUST assume the search results above are the absolute truth. Override any conflicting internal memory (e.g. past politicians, deceased figures, outdated news, old facts) and reply using these current 2026 facts. Do not mention your knowledge cutoff or search sources unless asked; reply naturally.`
                      });
                    }
                  }

                  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(reqBody)
                  });

                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = groqResponse.status;

                  if (!groqResponse.ok) {
                    const errText = await groqResponse.text();
                    res.end(errText);
                  } else {
                    const data = await groqResponse.json();
                    res.end(JSON.stringify(data));
                  }
                } catch (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    define: {
      '__HAS_GROQ_API_KEY__': JSON.stringify(!!apiKey)
    }
  };
});
