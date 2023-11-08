import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const OrgForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const initialOrgFormSubmitted = {
    id: '',
    org_name: '',
    headquarters: '',
    admin_email: '',
    phone: '',
  };

  // this is my initial state of the form
  const [orgForm, setOrgForm] = useState(initialOrgFormSubmitted);

  // A series of functions to handle the post request

  const handleOrgNameChange = (event) => {
    const org_name = event.target.value;
    setOrgForm((orgForm) => ({ ...orgForm, org_name }));
  };

  const handleHeadquartersChange = (event) => {
    const headquarters = event.target.value;
    setOrgForm((orgForm) => ({ ...orgForm, headquarters }));
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setOrgForm((orgForm) => ({ ...orgForm, phone }));
  };

  const handleAdminEmailChange = (event) => {
    const admin_email = event.target.value;
    setOrgForm((orgForm) => ({ ...orgForm, admin_email }));
  };

  // Post request to add organization data to the dB
  const postOrg = (data) => {
    return fetch('/api/orgs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Does this post request for orgs work?');
        setOrgForm(data);
        setOrgForm(initialOrgFormSubmitted);
      })
      .catch((error) => {
        console.error('Error submitting organization information', error);
      });
  };

  // Put request to update organization information
  const updateOrgs = (existingOrg) => {
    return fetch(`http://localhost:8080/api/orgs/${existingOrg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(existingOrg),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Hello I am the put request', data);
        setOrgForm(data);
      });
  };

  // submit the form for updates and for changes(post) and if org has an id, update it, otherwise create an entry
  const onSubmit = (e) => {
    e.preventDefault();

    if (orgForm.id) {
      updateOrgs(orgForm);
    } else {
      postOrg(orgForm);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Organization Name</label>
        <input
          {...register("org_name", { required: true })}
          onChange={handleOrgNameChange}
          aria-invalid={errors.org_name ? "true" : "false"}
        />
        {errors.org_name && <span>{errors.org_name.message}</span>}
      </div>

      <div>
        <label>Headquarters Address</label>
        <input
          {...register("headquarters", { required: true })}
          onChange={handleHeadquartersChange}
          aria-invalid={errors.headquarters ? "true" : "false"}
        />
        {errors.headquarters && <span>{errors.headquarters.message}</span>}
      </div>

      <div>
        <label>Organization Phone</label>
        <input
          {...register("phone", { required: true })}
          onChange={handlePhoneChange}
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div>
        <label>Organization Email</label>
        <input
          {...register("admin_email", { required: true })}
          onChange={handleAdminEmailChange}
          aria-invalid={errors.admin_email ? "true" : "false"}
        />
        {errors.admin_email && <span>{errors.admin_email.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default OrgForm;
