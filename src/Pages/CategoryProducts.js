import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helper/productCategory'
import SummaryApi from '../common'
import VerticalCard from '../Components/VerticalCard'

const CategoryProducts = () => {
  const location = useLocation()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  /* Getting search params of categories selected in url */
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray = urlSearch.getAll("category")
  
  const urlCategoryListObject = {}
  
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true
  })
  
  
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  
  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.filterProducts.url, {
      method: SummaryApi.filterProducts.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })
    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
    setLoading(false)
    console.log("data", data)
  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])


  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }



  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)
    setFilterCategoryList(arrayOfCategory)
    /* Fromat for url change when check the checkBox */
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory])

/* handling sort by */
  const handleOnchangeSortBy = (e)=>{
    const {value} = e.target

    setSortBy(value)

    if(value==="asc"){
      setData(preve=>preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }

    if(value==="dsc"){
      setData(preve=>preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }
 useEffect(()=>{
 },[sortBy])

  return (
    <div className='container mx-auto p-4'>
      {/* Desktop Version */}
      <div className=' lg:grid grid-cols-[200px,1fr] '>
        {/* Left Side */}
        <div className='bg-white p-2 min-h-[calc(100dvh-120px)] overflow-y-scroll scrollbar-none'>


          {/* Sort By */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By</h3>

            <form action="" className='text-md flex flex-col gap-2 py-2'>

              <div className='flex items-center gap-3'>
                <input checked={sortBy==="asc"} type="radio" name="sortBy" value={"asc"} id="" onChange={handleOnchangeSortBy} />
                <label htmlFor="">Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input checked={sortBy==="dsc"} type="radio" name="sortBy" value={"dsc"} id="" onChange={handleOnchangeSortBy} />
                <label htmlFor="">Price - High to Low</label>
              </div>

            </form>

          </div>

          {/* Filter By */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

            <form action="" className='text-md flex flex-col gap-2 py-2'>
              {
                productCategory?.map((categoryName, index) => {
                  return (
                    <div key={"category" + index} className='flex items-center gap-3'>
                      <input type="checkbox" name={"category"} id={categoryName?.value} value={categoryName?.value} checked={selectCategory[categoryName?.value]} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
          {
          }
        </div>

        {/* right side (product) */}
        <div className='px-4'>
          <p className='text-slate-800 font-medium text-lg my-2'>Search Result :{data?.length}</p>
          <div className='h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none'>
            {
              data?.length !== 0 && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>


      </div>
    </div>
  )
}

export default CategoryProducts
