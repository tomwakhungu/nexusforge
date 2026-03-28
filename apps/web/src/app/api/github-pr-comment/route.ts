import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || !body.owner || !body.repo || !body.pullNumber || !body.comment) {
    return NextResponse.json({ error: 'invalid_request', message: 'owner, repo, pullNumber, comment required' }, { status: 400 })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'server_config', message: 'GitHub token not configured' }, { status: 500 })
  }

  const response = await fetch(`https://api.github.com/repos/${body.owner}/${body.repo}/issues/${body.pullNumber}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ body: body.comment }),
  })

  if (!response.ok) {
    const error = await response.text()
    return NextResponse.json({ error: 'github_api_error', message: error }, { status: response.status })
  }

  const comment = await response.json()
  return NextResponse.json({ ok: true, comment })
}

