import { Button, Input } from "antd";

export const renderArrayInput = (values: any[] = [], setValues: (newValue: any[]) => void) => {
  return (
    <div>
      {values.map((value: any, index: number) => (
        <div key={index}>
          <Input
            value={value}
            onChange={(e) => {
              const newValues = [...values];
              newValues[index] = e.target.value;
              setValues(newValues);
            }}
          />
          {index > 0 && (
            <Button
              onClick={() => {
                const newValues = [...values];
                newValues.splice(index, 1);
                setValues(newValues);
              }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button
        type="primary"
        onClick={() => {
          setValues([...values, ""]);
        }}
      >
        Add
      </Button>
    </div>
  );
};
