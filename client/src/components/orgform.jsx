import React from 'react';
import { useForm, Controller } from 'react-hook-form';


export default function OrgForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Send the form data to your database or perform any other actions.
 
    console.log(data);

    // Sends data to an API
    try {
      const response = await fetch('/api/orgs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Organization Name</label>
        <Controller
          name="org_name"
          control={control}
          rules={{
            required: 'Organization Name is required',
            maxLength: {
              value: 50,
              message: 'Organization Name must not exceed 50 characters',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
        {errors.org_name && <span>{errors.org_name.message}</span>}
      </div>
      <div>
        <label>Headquarters</label>
        <Controller
          name="headquarters"
          control={control}
          rules={{
            required: 'Headquarters is required',
            maxLength: {
              value: 100,
              message: 'Headquarters must not exceed 100 characters',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
        {errors.headquarters && <span>{errors.headquarters.message}</span>}
      </div>
      <div>
        <label>Phone</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Phone must be a valid number',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>
      <div>
        <label>Admin Email</label>
        <Controller
          name="admin_email"
          control={control}
          rules={{
            required: 'Admin Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => <input {...field} />}
        />
        {errors.admin_email && <span>{errors.admin_email.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
