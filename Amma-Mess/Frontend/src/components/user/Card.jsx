import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from '../../assets/breakfast.png';
import img2 from '../../assets/lunch.jpeg';
import img3 from '../../assets/dinner.jpeg';

const Card = () => {
  const [menu, setMenu] = useState({ breakfast: '', lunch: '', dinner: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/menu/today')
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error('Error fetching today\'s menu:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', margin: 100, justifyContent: 'space-between' }}>
      <div className="card" style={{ width: '18rem' }}>
        <img src={img1} className="card-img-top" alt="..." style={{ height: '100px', width: '206px', paddingLeft: '57px' }} />
        <div className="card-body" style={{ marginTop: '35px' }}>
          <h5 className="card-title">Breakfast</h5>
          <p className="card-text">{menu.breakfast}</p>
          <h6>Rs.40</h6>
          <a href="#" className="btn btn-primary">Select</a>
          <a href="#" className="btn btn-primary">Cancel</a>
        </div>
      </div>

      <div className="card" style={{ width: '18rem' }}>
        <img src={img2} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Lunch</h5>
          <p className="card-text">{menu.lunch}</p>
          <h6>Rs.70</h6>
          <a href="#" className="btn btn-primary">Select</a>
          <a href="#" className="btn btn-primary">Cancel</a>
        </div>
      </div>

      <div className="card" style={{ width: '18rem' }}>
        <img src={img3} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Dinner</h5>
          <p className="card-text">{menu.dinner}</p>
          <h6>Rs.40</h6>
          <a href="#" className="btn btn-primary">Select</a>
          <a href="#" className="btn btn-primary">Cancel</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
