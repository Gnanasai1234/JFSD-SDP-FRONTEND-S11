import axios from "axios";
import { Trash2, Edit2, Flame, Utensils, Star } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserFoodCard = ({ food }) => {
  const [isEditing,setisEditing] = useState(false);
  const navigate = useNavigate();

  const handleUpdateDiet = ()=>{
    navigate("/user/updatedietpage",{
      state:{ food:food}
    })
  }

  
  return (
    <div className="food-card">
      <style>{`
        .food-card {
          width: 220px;
          height: 520px;
          background: linear-gradient(145deg, #ffffff, #f3f3f3);
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          margin: 12px;
          overflow: hidden;
        }

        .food-card-image-container {
          height: 220px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .food-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .food-card-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          text-align: center;
          gap: 1rem;
        }

        .food-card-buttons {
        text-decoration:none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .food-card-buttons a {
  text-decoration: none; /* Removes underline from links */
}


        .food-card-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 24px;
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
          color: white;
          cursor: pointer;
          transition: transform 0.3s ease;
          width: 100%;
        }

        .food-card-button:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="food-card-image-container">
        <img
          src={`data:${food.imageType};base64,${food.imageData}`}
          alt={food.name}
          className="food-card-image"
        />
      </div>

      <div className="food-card-content">
        <div>
          <h3 className="food-card-title">{food.name} (100g)</h3>
          <div style={{height: '1px', width: '80%', background: '#ccc', margin: '0.5rem auto'}}></div>
          <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Flame size={20} color="#ff7e5f" />
              <span><strong>{food.calories}</strong> calories</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Utensils size={20} color="#feb47b" />
              <span><strong>{food.protein}</strong> g protein</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Star size={20} color="#4a90e2" />
              <span><strong>{food.fat}</strong> g fat</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Utensils size={20} color="#4caf50" />
              <span><strong>{food.carbohydrates}</strong> g carbs</span>
            </li>
          </ul>
        </div>

        <div className="food-card-buttons">
        <div className="food-card-buttons">

    <button
      className="food-card-button"
      onClick={() => handleUpdateDiet()}
    >

      <Edit2 size={18} />
      Update Diet
     
    </button>
 

</div>


          
        </div>
      </div>
    </div>
  );
};

export default UserFoodCard;