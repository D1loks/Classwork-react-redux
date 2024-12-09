import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setField, resetForm } from "../store/createDogSlice";
import axios from "axios";

const CreateDogForm = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.createDog);

  const handleChange = (field: keyof typeof formState, value: string) => {
    dispatch(setField({ field, value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://dogs.kobernyk.com/api/v1/dogs", formState);
      alert("Собаку успішно створено!");
      dispatch(resetForm()); 
    } catch (error) {
      alert("Помилка при створенні собаки. Спробуйте ще раз.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Ім'я:
          <input
            type="text"
            value={formState.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Порода:
          <input
            type="text"
            value={formState.breed}
            onChange={(e) => handleChange("breed", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Колір:
          <input
            type="text"
            value={formState.color}
            onChange={(e) => handleChange("color", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Зображення (URL):
          <input
            type="text"
            value={formState.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Створити собаку</button>
    </form>
  );
};

export default CreateDogForm;
