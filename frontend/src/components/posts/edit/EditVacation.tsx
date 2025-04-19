import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelectors } from '../../../redux/hooks';
import useService from '../../../hooks/useService';
import VacationService from '../../../services/auth-aware/Vacation';
import VacationDraft from '../../models/vacations/VacationDraft';
import './EditVacation.css';
import VacationModel from '../../models/vacations/VacationModel';

export default function EditVacation(): JSX.Element {
  const { id } = useParams<'id'>();
  const { handleSubmit, register, formState, reset } = useForm<VacationDraft>();
  const navigate = useNavigate();
  const vacation = useAppSelectors(state =>
    state.vacations.vacations.find((v: VacationModel) => v.id === id)
  );

  const vacationService = useService(VacationService);

  useEffect(() => {
    if (id && vacation) {
      const { destination, description, startDate, endDate, price } = vacation;
      reset({ destination, description, startDate, endDate, price, imageFile: {} as FileList });
    }
  }, []);

  async function submit(draft: VacationDraft) {
    try {
      if (id) {
        const formData = new FormData();
        formData.append("destination", draft.destination);
        formData.append("description", draft.description);
        formData.append("startDate", draft.startDate);
        formData.append("endDate", draft.endDate);
        formData.append("price", draft.price.toString());

        if (draft.imageFile && draft.imageFile.length > 0) {
          formData.append("imageFile", draft.imageFile[0]);
        }

        await vacationService.update(id, formData);
        navigate('/vacations');
      }
    } catch (e) {
      alert('Failed to update vacation: ' + e);
    }
  }

  return (
    <div className='EditVacation'>
      <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
        <input
          placeholder='Destination'
          {...register('destination', {
            required: 'Destination is required',
            minLength: { value: 3, message: 'Destination must be at least 3 characters' }
          })}
        />
        <span className='error'>{formState.errors.destination?.message}</span>

        <textarea
          placeholder='Description'
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters' }
          })}
        />
        <span className='error'>{formState.errors.description?.message}</span>

        <input
          type="date"
          placeholder='Start Date'
          {...register('startDate', {
            required: 'Start Date is required'
          })}
        />
        <span className='error'>{formState.errors.startDate?.message}</span>

        <input
          type="date"
          placeholder='End Date'
          {...register('endDate', {
            required: 'End Date is required'
          })}
        />
        <span className='error'>{formState.errors.endDate?.message}</span>

        <input
          type="number"
          placeholder='Price'
          {...register('price', {
            required: 'Price is required',
            min: { value: 0, message: 'Price must be positive' },
            max: { value: 10000, message: 'Price cannot exceed 10,000' }
          })}
        />
        <span className='error'>{formState.errors.price?.message}</span>

        <input
          type="file"
          accept="image/*"
          {...register("imageFile")}
        />

        <button>Update Vacation</button>
      </form>
    </div>
  );
}