// GitHub ကနေ data များရယူဖို့
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // GitHub Pages မှ data ယူမယ်
  const response = await fetch('https://smartburme.github.io/burme-ai.io/data.json');
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
