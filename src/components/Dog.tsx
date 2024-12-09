import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setDog, setLoading, setError } from "../store/dogsSlice";
import { fetchDogById } from "../store/api";
import useLocalStorage from "../effects/useLocalStorage";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const Dog = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const { dogId } = useParams<{ dogId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dog = useSelector((state: RootState) =>
    state.dogs.dogs.find((dog: any) => dog._id === dogId)
  );
  const loading = useSelector((state: RootState) => state.dogs.loading);
  const error = useSelector((state: RootState) => state.dogs.error);

  const logout = () => setToken("");

  const getDog = async () => {
    if (!dogId || !token) return;
    try {
      dispatch(setLoading(true));
      const data = await fetchDogById(token, dogId);
      dispatch(setDog(data)); // Додаємо собаку в store
    } catch (err) {
      dispatch(setError("Не вдалося отримати дані собаки"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!dog) {
      getDog(); 
    }
  }, [dogId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dog) return <div>Собаку не знайдено</div>;

  return (
    <>
      Ви авторизовані <br />
      <button onClick={logout}>Вийти</button>
      <br />
      <Link to="/">На головну</Link>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={dog.image} title={dog.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dog.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Колір: {dog.color} <br />
            Порода: {dog.breed}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Деталі</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Dog;
