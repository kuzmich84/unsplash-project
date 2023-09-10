import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useGlobalContext } from '../context'

const YOUR_ACCESS_KEY = import.meta.env.VITE_API_KEY
const query = 'cat'

const url = `https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}`

const Gallery = () => {

    const { searchTerm } = useGlobalContext()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['images', searchTerm],
        queryFn: async () => {
            const resp = await axios.get(`${url}&query=${searchTerm}`)
            return resp.data
        }
    })





    if (isLoading) {
        return (
            <section className="image-container">
                <h4>Loading....</h4>
            </section>)
    }

    if (isError) {
        return (
            <section className="image-container">
                <h4>There was an error...</h4>
            </section>)
    }


    if (data.results.length < 1) {
        return (
            <section className="image-container">
                <h4>No results find...</h4>
            </section>
        )

    }

    return (
        <section className="image-container">
            {data.results.map((item) => {
                return (
                    <img className='img' src={item?.urls?.regular} key={item.id} alt={item.alt_description} />
                )
            })}
        </section>
    )
}

export default Gallery