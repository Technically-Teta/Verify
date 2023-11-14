
import React, { useState } from 'react';


function VolunteerOrgForm({ onSubmit }) {
  // Variable to hold the initial org + Volunteer info with empty fields for input assigned to props
  const initialInfo = {
    vol_id: '',
    volunteering_type: '',
    volunteering_description: '',
    start_date: '',
    end_date: '',
    org_name: '',
    headquarters: '',
    phone: '',
    admin_email: '',
  };

  const [volOrgForm, setVolOrgForm] = useState(initialInfo);

  console.log(initialInfo);



  const handleVolunteeringTypeChange = (event) => {
    const volunteering_type = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, volunteering_type }));
  };

  const handleDescriptionChange = (event) => {
    const volunteering_description = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, volunteering_description }));
  };

  const handleStartDateChange = (event) => {
    const start_date = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, start_date }));
  };

  const handleEndDateChange = (event) => {
    const end_date = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, end_date }));
  };

  const handleOrgNameChange = (event) => {
    const org_name = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, org_name }));
  };

  const handleHeadquartersChange = (event) => {
    const headquarters = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, headquarters }));
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, phone }));
  };

  const handleAdminEmailChange = (event) => {
    const admin_email = event.target.value;
    setVolOrgForm((volOrgForm) => ({ ...volOrgForm, admin_email }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the onSubmit function passed from the parent component and pass the form data
    onSubmit(volOrgForm);
  };

// A function that handles the post request
// const postvolOrg = (volOrgForm) => {
//   return fetch('/api/users', {













  return (
    <form className='formprofile' onSubmit={handleFormSubmit}>
      <label>What type of Volunteering is this?</label>
      <input
        type='text'
        id='type'
        placeholder='Enter info'
        required
        value={volOrgForm.volunteering_type}
        onChange={handleVolunteeringTypeChange}
      />

<label>Describe the volunteering activity</label>
      <input
        type='text'
        id='description'
        placeholder='Enter info'
        required
        value={volOrgForm.volunteering_description}
        onChange={handleDescriptionChange}
      />




      <label>Start Date</label>
      <input
        type='text'
        id='start_date'
        placeholder='Start date'
        required
        value={volOrgForm.start_date}
        onChange={handleStartDateChange}
      />

      <label>End Date</label>
      <input
        type='text'
        id='end_date'
        placeholder='Enter end date'
        required
        value={volOrgForm.end_date}
        onChange={handleEndDateChange}
      />

      <label>Organization Name</label>
      <input
        type='text'
        id='org_name'
        placeholder='Enter organization name'
        required
        value={volOrgForm.org_name}
        onChange={handleOrgNameChange}
      />

      <label>Headquarters</label>
      <input
        type='text'
        id='headquarters'
        placeholder='Enter headquarters'
        required
        value={volOrgForm.headquarters}
        onChange={handleHeadquartersChange}
      />

      <label>Organization's Phone</label>
      <input
        type='text'
        id='phone'
        placeholder='Enter phone number'
        required
        value={volOrgForm.phone}
        onChange={handlePhoneChange}
      />

      <label>Organization's Email</label>
      <input
        type='email'
        id='email'
        placeholder='Enter info'
        required
        value={volOrgForm.admin_email}
        onChange={handleAdminEmailChange}
      />
      
      <button className='volformbtn'   type='submit'  >Submit  </button>   


       

    </form>







  );
}

export default VolunteerOrgForm;
