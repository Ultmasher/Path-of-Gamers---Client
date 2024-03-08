//import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';
import '../styles/NewEvent.css';
import LandingHeader from './LandingHeader';
import Modal from './Modal';
import { useState } from 'react';


const NewEvent = () => {
  const [isOpen, setIsOpen] = useState(false);


    const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm();
  const watchStartDate = watch('startDate', new Date());
  const watchEndDate = watch('endDate', new Date());

  const onSubmit = data => {
    console.log(data);
    // Here you would typically send the data to your server
  };

  const handleNewEventClick = (path) => {
    console.log(path);
    navigate('/newevent');
};

  return (
    <>
    
    <div className='eventContainer'>
    <form onSubmit={handleSubmit(onSubmit)}>

<div className='eventInputsWrapper'>
        Game:
        <label>
        <select {...register("chosenGame", { required: true })}>
          <option value="">Select...</option>
          <option value="game1">Leage Of Legends</option>
          <option value="game2">Fortnite</option>
          <option value="game2">FIFA 24</option>
          {/* Add more options as needed */}
        </select>
        </label>
      <label>
        Role Type:
        <select {...register("chosenRole", { required: true })}>
          <option value="">Select...</option>
          <option value="game1">Solo Player</option>
          <option value="game2">Team Player</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <label>
        Event Title:
        <input type="text" {...register("title", { required: true })} />
      </label>
      <label>
        Description:
        <textarea {...register("description", { required: true })} />
      </label>
      <label>
        Start Date:
        <DatePicker selected={watchStartDate} onChange={date => register('startDate').onChange(date)} />
      </label>
      <label>
        End Date:
        <DatePicker selected={watchEndDate} onChange={date => register('endDate').onChange(date)} />
      </label>
      </div>

    <div className='eventButtonsWrapper'>
    <button className='changeAvatarButton'onClick={() => setIsOpen(true)}>Post Event</button>
    <Modal className= 'Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
        Your event has been posted!
    </Modal>
      </div>
    </form>
    </div>
    </>
  );
};

export default NewEvent;