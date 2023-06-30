import React, { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "../Layout/HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [btnHighlighted, setbtnHighlighted] = useState(false);
  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnHighlighted(true);

    
    const timer = setTimeout(() => {
      setbtnHighlighted(false);
    }, 200);

    return () => {
      clearTimeout(timer);
    };

  }, [items]);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
