import React, { useState } from 'react';
import { Flame, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

const UserExerciseCard = ({ exercise }) => {

  const [isEditing,setisEditing] = useState(false);
  const navigate = useNavigate();

  const handleUpdateExercise = ()=>{
    navigate("/user/updatexercisepage",{
      state:{ exercise:exercise}
    })
  }

  return (
    <div className="exercise-card">
      <style>{`
        .exercise-card {
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

        .exercise-card-image-container {
           height: 220px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .exercise-card-image {
            width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .exercise-card-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          text-align: center;
          gap: 1rem;
        }

        .exercise-card-buttons {
          text-decoration:none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

          .exercise-card-buttons a {
  text-decoration: none; /* Removes underline from links */
}


        .exercise-card-button {
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

        .exercise-card-button:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="exercise-card-image-container">
        <img
          src={`data:${exercise.imageType};base64,${exercise.imageData}`}
          alt={exercise.exerciseType}
          className="exercise-card-image"
        />
      </div>

      <div className="exercise-card-content">
        <div>
          <h3 className="exercise-card-title">{exercise.exerciseType}</h3>
          <div style={{ height: '1px', width: '80%', background: '#ccc', margin: '0.5rem auto' }}></div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Flame size={20} color="#ff7e5f" />
              <span><strong>{exercise.calorieBurn}</strong> calories burned</span>
            </li>
            
          </ul>
        </div>

        <div className="exercise-card-buttons">
          <button
            className="exercise-card-button"
            onClick={() => handleUpdateExercise()}
          >
            Update Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserExerciseCard;
