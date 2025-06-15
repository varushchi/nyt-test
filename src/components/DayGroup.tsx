import { Article } from '@/types'
import React from 'react'
import ArticleCard from './ArticleCard'

export default function DayGroup({articles, date}: {articles: Article[], date: string}) {
  return (
    <div className='flex flex-col px-[20px] divide-y divide-[#EDEDED]'>
      <h1 className='text-[18px] font-[700] border-b-0'>News for {date}</h1>
      {articles.map(article => (
        <ArticleCard article={article} key={article._id}/>
      ))}
    </div>
  )
}
