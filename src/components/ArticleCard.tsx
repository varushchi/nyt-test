import { Article } from '@/types'
import Image from 'next/image'
import React from 'react'

function formatDate(isoString: string) {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
  .replace(',', '')
  .replace(/(\d+):(\d+)/, '$1.$2')
}

// Usage:
const isoDate = "2023-02-26T16:32:00Z";
console.log(formatDate(isoDate)); // "Feb 26 2023, 4.32 PM"

export default function ArticleCard({article}: {article: Article}) {
  return (
    <a className='flex gap-[20px] py-[20px] text-inherit' href={article.web_url} target='_blank'>
      <Image
        src={`https://static01.nyt.com/${article.multimedia[0]?.url}`}
        alt='news img'
        height={74}
        width={99}
        className='pt-[30px]'
      />
      <div className='flex flex-col gap-[10px]'>
        <p className='text-[#096FFA] text-[14px] font-bold'>{article.source}</p>
        <p className='overflow-hidden text-ellipsis text-[16px] text-justify'>{article.abstract}</p>
        <p className='text-[#6D787A]'>{formatDate(article.pub_date)}</p>
      </div>
    </a>
  )
}
