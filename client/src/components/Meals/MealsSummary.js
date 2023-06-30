import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>

      <p>
        Whether you're a busy professional seeking a hassle-free meal or a food enthusiast looking to explore new flavors, Delicious Food, Delivered To You is your go-to destination.
      </p>
    </section>
  );
};

export default MealsSummary;
