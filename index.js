addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const params = new URL(request.url).searchParams

  const size = params.get('size') || params.get('s')
  const stroke = params.get('stroke')
  const fill = params.get('fill') || params.get('f') || (stroke ? 'transparent' : '')
  const height = size ? size : (params.get('height') || params.get('h'))
  const width = size ? size : (params.get('width') || params.get('w'))
  const scale = params.get('scale') === '' || !!params.get('scale')

  let svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'

  if (!scale) {
    svg += ` width="${ width }"`
    svg += ` height="${ height }"`
  }

  svg += ` viewBox="0 0 ${ width } ${ height }"`
  svg += '>'

  if (fill || stroke) {
    svg += `<rect width="${ width }" height="${height}"`

    if (fill) svg += ` fill="${ fill }"`
    if (stroke) svg += ` stroke="${ stroke }"`
    svg += '/>'
  }

  svg += '</svg>'

  if (url.pathname === '/' || url.pathname === '') {
    return new Response(svg, {
      headers: { 'content-type': 'image/svg+xml' }
    })
  }

  return new Response('Not found', { status: 404 })
}