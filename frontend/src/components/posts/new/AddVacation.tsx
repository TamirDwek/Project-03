import useService from "../../../hooks/useService";
import VacationsService from "../../../services/auth-aware/Vacation";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../../../assets/images/200w.gif";
import { useForm } from "react-hook-form";

interface AddVacationForm {
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageFile: FileList;
}

export default function AddVacation() {
  const { register, handleSubmit, formState, reset } = useForm<AddVacationForm>();
  const vacationService = useService(VacationsService);
  const navigate = useNavigate();

  async function submit(data: AddVacationForm) {
    try {
      const formData = new FormData();
      formData.append("destination", data.destination);
      formData.append("description", data.description);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("price", data.price.toString());
      
      if (data.imageFile && data.imageFile[0]) {
        formData.append("imageFile", data.imageFile[0]);
      }

      await vacationService.create(formData);
      reset();
      navigate("/vacations");
    } catch (e) {
      alert("Error: " + e);
    }
  }

  return (
    <div className="AddVacation">
      <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
        <input
          placeholder="Destination"
          {...register("destination", { required: "Destination is required" })}
        />
        <span className="error">{formState.errors.destination?.message}</span>

        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        <span className="error">{formState.errors.description?.message}</span>

        <input type="date" {...register("startDate", { required: "Start date is required" })} />
        <span className="error">{formState.errors.startDate?.message}</span>

        <input type="date" {...register("endDate", { required: "End date is required" })} />
        <span className="error">{formState.errors.endDate?.message}</span>

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          {...register("price", { required: "Price is required" })}
        />
        <span className="error">{formState.errors.price?.message}</span>

        <input
          type="file"
          accept="image/*"
          {...register("imageFile", { required: "Image is required" })}
        />
        <span className="error">{formState.errors.imageFile?.message}</span>

        {!formState.isSubmitting && <button>Add Vacation</button>}
        {formState.isSubmitting && <p>Uploading... <img src={LoadingGif} /></p>}
      </form>
    </div>
  );
}
