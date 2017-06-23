import React from "react";
import { connect } from "react-redux";

function Counter(props) {
	const { onIncrement, onDecrement, value } = props;
	return (
		<div>
			<h3>Value: {value}</h3>
			<button className="action-btn" onClick={onIncrement}>
				Increment
			</button>
			<button className="action-btn" onClick={onDecrement}>
				Decrement
			</button>
		</div>
	);
}

export { Counter };
