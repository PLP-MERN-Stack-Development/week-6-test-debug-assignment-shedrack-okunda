import React from "react";
import PropTypes from "prop-types";

const Button = ({
	children,
	onClick,
	type = "button",
	disabled = false,
	variant = "primary",
	size = "md",
	className = "",
	...props
}) => {
	const variantClasses = {
		primary: "bg-blue-600 hover:bg-blue-700 text-white",
		secondary: "bg-gray-500 hover:bg-gray-600 text-white",
	};

	const sizeClasses = {
		sm: "px-2 py-1 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const baseClasses = "rounded disabled:opacity-50";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			data-testid="button"
			className={`${baseClasses} ${variantClasses[variant]} ${
				sizeClasses[size]
			} ${
				disabled ? "btn-disabled" : ""
			} btn-${variant} btn-${size} ${className}`}
			{...props}>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	variant: PropTypes.oneOf(["primary", "secondary"]),
	size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Button;
