import fs from 'fs';
import https from 'https';
import path from 'path';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', (err) => { reject(err); });
  });
}

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 1. Read local static events
  let localEvents = [];
  try {
    const localPath = path.join(process.cwd(), 'public/data/events.json');
    const localData = fs.readFileSync(localPath, 'utf8');
    localEvents = JSON.parse(localData);
  } catch (err) {
    console.error("Error reading local events in API:", err);
  }

  // 2. Fetch and parse IndiaBioscience events
  const liveEvents = [];
  try {
    const html = await fetchHtml('https://indiabioscience.org/events');
    const articles = [];
    const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
    let match;
    while ((match = articleRegex.exec(html)) !== null) {
      articles.push(match[1]);
    }

    articles.forEach((art, index) => {
      const titleLinkMatch = /<h3[^>]*>\s*<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/i.exec(art);
      if (!titleLinkMatch) return;

      const regLink = titleLinkMatch[1].trim();
      let title = titleLinkMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

      // Skip historical events or duplicate events already in local if any
      const categoryMatch = /href="https:\/\/indiabioscience\.org\/events\/like:([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(art);
      let categoryRaw = categoryMatch ? categoryMatch[1].trim() : 'other';
      
      let category = 'workshops';
      if (categoryRaw.toLowerCase().includes('conference') || categoryRaw.toLowerCase().includes('symposium') || categoryRaw.toLowerCase().includes('meeting') || categoryRaw.toLowerCase().includes('seminar')) {
        category = 'symposiums';
      } else if (categoryRaw.toLowerCase().includes('hackathon') || categoryRaw.toLowerCase().includes('competition')) {
        category = 'hackathons';
      } else {
        category = 'workshops';
      }

      const venueMatch = /itemprop="addressRegion"[^>]*>([\s\S]*?)<\/span>/i.exec(art) || /itemprop="address"[^>]*>([\s\S]*?)<\/a>/i.exec(art);
      let venue = venueMatch ? venueMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'India';

      // Advanced host extraction
      let host = 'IndiaBioscience Partner';
      const hostMatch = /Organised by\s*(?:<a[^>]*>)?([^<]+)/i.exec(art);
      if (hostMatch) {
        host = hostMatch[1].replace(/\[|\]/g, '').replace(/\s+/g, ' ').trim();
      } else if (title.includes('EMBO')) {
        host = 'EMBO / IndiaBioscience';
      } else if (title.includes('BioWISE')) {
        host = 'BESTKC / IndiaBioscience';
      } else if (title.includes('IUBMB')) {
        host = 'IUBMB / NCBS';
      } else if (title.includes('Genomics India')) {
        host = 'Genomics India';
      }

      if (host.startsWith('and ')) {
        host = host.slice(4).trim();
      }

      const startDateMatch = /itemprop="startDate"\s+datetime="([^"]+)"/i.exec(art);
      const endDateMatch = /itemprop="endDate"\s+datetime="([^"]+)"/i.exec(art);

      let eventDate = '';
      if (startDateMatch) {
        const startDt = new Date(startDateMatch[1]);
        const startStr = startDt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (endDateMatch) {
          const endDt = new Date(endDateMatch[1]);
          const endStr = endDt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          eventDate = `${startStr} – ${endStr}`;
        } else {
          eventDate = startStr;
        }
      } else {
        eventDate = "Upcoming 2026/2027";
      }

      const deadlineMatch = /Registration\s+deadline\s+([\s\S]*?)(?:$|\n|<)/i.exec(art);
      let deadline = deadlineMatch ? deadlineMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
      let rewards = "Certificate & Professional Development";
      if (deadline) {
        rewards += ` (Reg Deadline: ${deadline})`;
      }

      const tags = [categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1)];
      if (venue.toLowerCase().includes('online')) {
        tags.push('Online');
      } else {
        tags.push('In-Person');
      }
      tags.push('BioSciences');

      liveEvents.push({
        id: index + 100, // keep IDs safe
        host,
        title,
        venue,
        rewards,
        tags,
        category,
        eventDate,
        regLink,
        teamLink: "https://www.linkedin.com/company/bioedge-india/"
      });
    });
  } catch (err) {
    console.error("Error fetching live events from IndiaBioscience in API:", err);
  }

  // Combine and respond
  const allEvents = [...localEvents, ...liveEvents];
  res.status(200).json(allEvents);
}
