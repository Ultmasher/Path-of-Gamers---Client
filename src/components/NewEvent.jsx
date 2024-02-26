//import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';
import '../styles/NewEvent.css';
const NewEvent = () => {

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
    <div className='eventContainer'>
    <img className='eventImg' src='https://cdn.discordapp.com/attachments/1208068435725262938/1208070511322603551/POGLogo.png?ex=65eb2cd6&is=65d8b7d6&hm=fc26c274366064190fcbc3ffb82ef1538b3a7bfe73e4f71e3609aa83f7d96a3e&' alt='POG Logo' />

    <div className='eventContainer'>
    <form onSubmit={handleSubmit(onSubmit)}>

<div className='eventInput'>
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
    <button className='eventButton' onClick={handleNewEventClick}>Create Event</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default NewEvent;