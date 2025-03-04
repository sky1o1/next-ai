import { Button } from 'antd';


type TButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "danger" | "info" | "ghost";
  onClick: () => void;
};

export const ButtonAnt: React.FC<TButtonProps> = ({
  title,
  variant = "primary",
  onClick,
}) => {
  function ButtonFxn(variant: "primary" | "danger" | "info" | "ghost") {
    switch (variant) {
      case "primary":
        return (
          <Button  type="primary"  
            onClick={onClick}
          >
            {title}
          </Button>
        );
      case "danger":
        return (
          <Button  type="primary" danger
            onClick={onClick}
          >
            {title}
          </Button>
        );
      default:
        return (
          <Button type='primary' 
            onClick={onClick}
          >
            {title}
          </Button>
        );
    }
  }
  return ButtonFxn(variant);
};
 
