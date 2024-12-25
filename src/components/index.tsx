import { Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../actions/counter";
import { useEffect } from "react";
import { axiosPrivate } from "../config/privateAxios";

const SampleComponent = () => {
  const dispatch = useDispatch();
  const { count = 0 } = useSelector((state: any) => state?.counter);

  useEffect(() => {
    axiosPrivate("https://jsonplaceholder.typicode.com/todos/1");
  }, []);

  return (
    <>
      <h2>Count : {count}</h2>
      <Space>
        <Button type="primary" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button type="primary" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button onClick={() => dispatch(reset())}>Reset</Button>
      </Space>
    </>
  );
};

export default SampleComponent;
