import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, onClick, type = "button", disabled = false }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
			data-testid="button">
			{label}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Button;
