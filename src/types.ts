export type Response = {
  Body: Body
}

type Body = {
  copyright: string
  response: {
    meta: {
      hits: number
    }
    docs: Article[]
  }
}

type Multimedia = {
  url: string
  height: number
  width: number
}

export type Article = {
  _id: string
  web_url: string
  abstract: string
  source: string
  pub_date: string
  multimedia: Multimedia[]
  snippet: string
}