import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [dummyMeals,setDummyMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState();

  const fectchMeal = async () => {
    const response = await fetch("https://react-guide-105d0-default-rtdb.asia-southeast1.firebasedatabase.app/meal.json",{
      method:'GET',
      headers:{
        "Content-Type": 'application/json'
      }
    });

    if(!response.ok){
      throw new Error("Something is wrong");
    }

    const data = await response.json();
    setDummyMeals([...data.filter(data=>data)]);
    setIsLoading(false);
    
  };

  useEffect(() => {
      fectchMeal().catch((e) => {
        console.log(e);
        setIsLoading(false);
        setHttpError(e.message);
      });
  },[])

  if(isLoading){
    return <section className={classes.loading}>
      <p>Loading</p>
    </section>
  }

  if(httpError){
    return <section className={classes.error}>
    <p>{httpError}</p>
  </section>
  }

  const mealsList = dummyMeals.map(ele => {
      return <MealItem key={ele.id} id={ele.id} name={ele.name} price={ele.price} description={ele.description} />;
  });

    return  <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>

};

export default AvailableMeals;