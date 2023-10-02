import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setfoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-caption z-50">
            <div className="d-flex justify-content-center">
              <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />

            </div>

          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/1400x400/?pastry" className="d-block w-100  opacity-50" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/1400x400/?burgur" className="d-block w-100 opacity-50" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/1400x400/?pizza" className="d-block w-100 opacity-50" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className="container">
        {foodCat.length !== 0 ? foodCat.map((data) => {
          return (<div >
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              { foodItem.length !== 0 ?
                foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.Name.toLowerCase().includes(search.toLowerCase())))// for search bar
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItem ={filterItems}
                          imgsrc={filterItems.img}
                          desc={filterItems.description}
                          options={filterItems.options[0]} />
                      </div>
                    )
                  })
                : <div>No such data found</div>}
            </div>
          </div>
          )
        }) : ""}

      </div>
      <div><Footer /></div>
    </div>
  )
}

export default Home;




