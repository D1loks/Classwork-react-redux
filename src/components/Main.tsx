import axios from "axios";
import useLocalStorage from "../effects/useLocalStorage";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setDogs, setLoading, setError } from "../store/dogsSlice";

const Main = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const [showForm, setShowForm] = useState(false); // Стан для відображення форми
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    color: "",
    image: "",
  }); // Стан для даних форми
  const dispatch = useDispatch();
  const { dogs, loading, error } = useSelector((state: any) => state.dogs);

  const logout = () => {
    setToken("");
  };

  const getDogs = () => {
    if (!token) {
      return;
    }
    dispatch(setLoading(true));
    axios
      .get(`https://dogs.kobernyk.com/api/v1/dogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setDogs(response.data));
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    axios
      .post(
        `https://dogs.kobernyk.com/api/v1/dogs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setShowForm(false);
        getDogs(); // Оновити список собак після додавання
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(getDogs, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        Ви авторизовані
        <br />
        <button onClick={logout}>Вийти</button>
        <br />
        {/* Кнопка для відкриття форми */}
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Повернутися до списку" : "Створити нову собаку"}
        </button>
        <br />
      </div>

      {/* Відображення форми або списку собак */}
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Ім'я:
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Порода:
            <input
              type="text"
              value={formData.breed}
              onChange={(e) =>
                setFormData({ ...formData, breed: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Колір:
            <input
              type="text"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Посилання на зображення:
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </label>
          <br />
          <button type="submit">Зберегти</button>
        </form>
      ) : (
        dogs.map((dog: any) => (
          <Card sx={{ maxWidth: 345 }} key={dog._id}>
            <CardMedia
              sx={{ height: 140 }}
              image={dog.image}
              title={dog.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dog.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Колір: {dog.color}
                <br />
                Порода: {dog.breed}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Деталі</Button>
            </CardActions>
          </Card>
        ))
      )}
    </>
  );
};

export default Main;
