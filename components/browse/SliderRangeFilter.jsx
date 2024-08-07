import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

const SliderRangeFilter = ({
  defaultValue,
  onChange,
  range,
  title,
  ...props
}) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="w-full">
      <h3
        onClick={() => setShow((prev) => !prev)}
        className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
      >
        {title}
        <span>
          {show ? (
            <MinusIcon className="w-5 h-5" />
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
        </span>
      </h3>
      {show && (
        <div className="mt-10 mx-7">
          <Slider
            value={value}
            onChange={handleChange}
            onChangeCommitted={(e, value) => onChange(value[0], value[1])}
            valueLabelDisplay="on"
            min={range[0]}
            max={range[1]}
            style={{ color: "#febd69" }}
            {...props}
          />
        </div>
      )}
    </div>
  );
};

export default SliderRangeFilter;
