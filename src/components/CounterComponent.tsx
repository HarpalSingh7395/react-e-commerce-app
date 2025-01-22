import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import { increment } from '@/redux/features/couter';
import { AppDispatch, RootState } from '@/redux/store';

export default function CounterComponent() {
    const count = useSelector<RootState>(state => state.counter.value ?? 0)
    const dispatch = useDispatch<AppDispatch>();
  return (
    <>
    <div>{count}</div>
    <Button onClick={() => dispatch(increment())}>
        Increment
    </Button>
    </>
  )
}
