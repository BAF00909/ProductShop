import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './store/slices/appslice';

function App() {
  const { value } = useSelector(state => state.appReducer);
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(increment())
  }
  return (
    <div className="App">
      {value}
      <button onClick={onClickHandler}>+</button>
    </div>
  );
}

export default App;
