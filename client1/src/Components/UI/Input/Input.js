import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
    return (
      <div className={classes.input}>
        <label htmlFor={props.input.id}>Amount</label>
        <input ref={ref} {...props.input} onChange={props.onChange} />
      </div>
    );
});

export default Input;