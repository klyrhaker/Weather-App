interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

function Button({ onClick, children, ...rest }: ButtonProps) {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
