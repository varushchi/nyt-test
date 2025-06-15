'use client'
import DayGroup from "@/components/DayGroup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Article, Response } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';

interface dateInterface {
  day: string
  month: string
  year: string
}

export default function Home() {

  const [articles, setArticles] = useState<{
    date: dateInterface, artiles: Article[]
  }[]>([])
  const [dateState, setDateState] = useState<dateInterface>({
    day: '1',
    month: '5',
    year: '2025'
  })
  const [loading, setLoading] = useState(false)
  const [showNavs, setShowNavs] = useState(false)

  function setToPreviousDay () {
    const currentDate = new Date(
      parseInt(dateState.year),
      parseInt(dateState.month) - 1,
      parseInt(dateState.day)
    )
    currentDate.setDate(currentDate.getDate() - 1);

    setDateState({
      day: currentDate.getDate().toString(),
      month: (currentDate.getMonth() + 1).toString(),
      year: currentDate.getFullYear().toString()
    })
  }


  useEffect(() => {
    async function getArticles(year: string, month: string) {
      setLoading(true)
      try {
        const res = await axios.get<Response>(`/api?year=${year}&month=${month}`)
        if (res.status === 200) {
          const serverArticles = res.data.Body.response.docs
          const filterMonth = parseInt(dateState.month) > 9 ? dateState.month : `0${dateState.month}`
          const filterDay = parseInt(dateState.day) > 9 ? dateState.day : `0${dateState.day}`
          const dateFilter = `${dateState.year}-${filterMonth}-${filterDay}`
          const filterArticles = serverArticles.filter(article => (
            article.pub_date.includes(dateFilter)
          )).slice(0, 5)
          if (filterArticles.length === 0){
            // setToPreviousDay()
          } else {
            setArticles(prev => [...prev, {date: dateState, artiles: filterArticles}])
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    getArticles(dateState.year, dateState.month)
  },[dateState])

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      setToPreviousDay()
    }
  }, [inView]);
  if (!showNavs) {

  
    return (
      <div className="w-[80%] max-w-[400px] min-w-[450px] mx-auto flex flex-col justify-center items-center gap-[20px]">
        <Header hanleClick={() => setShowNavs(true)}/>
        {articles.map((article, i) => (
          <DayGroup
            articles={article.artiles}
            date={`${article.date.day}.${article.date.month}.${article.date.year}`}
            key={i}
          />
        ))}
        <div ref={ref}></div>
        {loading ? <Image src='/loading.svg' alt="loading" width={36} height={36} className="animate-[spin_1s_ease_infinite]"/> : null}
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="w-[80%] max-w-[400px] min-w-[450px] mx-auto relative min-h-screen">
        <div className="absolute right-15 top-12">
          <button className='cursor-pointer border-0' onClick={() => setShowNavs(false)}>
            <Image
              src="/closebtn.svg"
              alt="menu"
              width={20}
              height={16}
            />
          </button>
        </div>
        <div className="flex flex-col justify-center h-screen gap-[20px] text-[24px] font-[700] tracking-[0.1em] mt-[-20px]">
          <h1>SCIENCE</h1>
          <h1>GENERAL</h1>
          <h1>ENTERTAINMENT</h1>
          <h1>TECHNOLOGY</h1>
          <h1>BUSINESS</h1>
          <h1>HEALTH</h1>
          <h1>SPORTS</h1>
        </div>
      </div>
    )
  }
}
